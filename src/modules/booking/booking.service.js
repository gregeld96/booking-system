const {
    PrismaClient
} = require('@prisma/client');
const RoomService = require('../room/room.service');
const prisma = new PrismaClient();


class BookingService {
    static async getList(request) {
        const {
            userId,
            authority
        } = request.classified;

        try {
            const data = authority.toLowerCase() === "admin" ? await this.getBookingListAdmin() : await this.getBookingListBasedOnUser(Number(userId));

            let bookings = data.map((booking) => {
                delete booking.userId;
                delete booking.roomId;

                let start = new Date(booking.startDate);
                let end = new Date(booking.endDate);

                return {
                    ...booking,
                    startDate: `${start.toISOString().substring(0, 10)}T${start.toLocaleTimeString()}`,
                    endDate: `${end.toISOString().substring(0, 10)}T${end.toLocaleTimeString()}`,
                    room: booking.room.name,
                    user: booking.user.name,
                }
            })

            return {
                bookings
            }
        } catch (error) {
            throw (error);
        }
    }

    static async getSpecificBooking(request) {
        const {
            id
        } = request.params;

        try {
            const data = await this.findOne(Number(id));

            let booking = {
                ...data,
                room: booking.room.name,
                user: booking.user.name,
            }

            return {
                booking
            }
        } catch (error) {
            throw (error);
        }
    }

    static async create(request) {
        const {
            topic,
            startDate,
            endDate,
            roomId
        } = request.body;

        const {
            userId,
        } = request.classified;

        try {
            if (!topic || !startDate || !endDate || !Number(roomId)) throw ({
                status: 400,
                message: "Topic, start time, end time and room are required"
            });

            const {
                room
            } = await RoomService.getSpecificRoom({
                id: Number(roomId)
            });

            const booking = await this.getAvailabilityRoom({
                id: room.id,
                start: new Date(startDate),
                end: new Date(endDate)
            });

            if (booking) throw ({
                status: 400,
                message: "Booking exist on selected time"
            });

            const payload = {
                topic,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                roomId: room.id,
                userId
            }

            await prisma.booking.create({
                data: payload
            });
        } catch (error) {
            throw (error)
        }
    }

    static async update(request) {
        const {
            topic,
            startDate,
            endDate,
            roomId
        } = request.body;

        const {
            id
        } = request.params;

        const {
            userId,
            authority
        } = request.classified;

        try {
            const selectBooking = await this.findOne(Number(id));

            if (Number(selectBooking.userId) !== Number(userId) && authority.toLowerCase() !== "admin") throw ({
                status: 403,
                message: "You are not authorize!"
            });

            if (!topic ||  !startDate || !endDate || !Number(roomId)) throw ({
                status: 400,
                message: "Topic, start time, end time and room are required"
            });

            const {
                room
            } = await RoomService.getSpecificRoom({
                id: Number(roomId)
            });

            const booking = await this.getAvailabilityRoom({
                id: room.id,
                start: new Date(startDate),
                end: new Date(endDate)
            });

            if (booking) throw ({
                status: 400,
                message: "Booking exist on selected time"
            });

            const payload = {
                topic,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                roomId: room.id,
            }

            await prisma.booking.update({
                where: {
                    id: selectBooking.id
                },
                data: payload
            });
        } catch (error) {
            throw (error)
        }
    }

    static async delete(request) {
        const {
            id
        } = request.params;

        try {
            const selectBooking = await this.findOne(Number(id));

            await prisma.booking.delete({
                where: {
                    id: selectBooking.id
                }
            });
        } catch (error) {
            throw (error)
        }
    }

    static async getBookingListBasedOnUser(id) {
        return await prisma.booking.findMany({
            where: {
                userId: id
            },
            include: {
                room: {
                    select: {
                        name: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })
    }

    static async getBookingListAdmin() {
        return await prisma.booking.findMany({
            include: {
                room: {
                    select: {
                        name: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })
    }

    static async findOne(id) {
        return await prisma.booking.findFirstOrThrow({
            where: {
                id
            },
            include: {
                room: {
                    select: {
                        name: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })
    }

    static async getBookingsBasedOnRoom(roomId) {
        try {
            return await prisma.booking.findMany({
                where: {
                    roomId
                },
                include: {
                    room: {
                        select: {
                            name: true
                        }
                    },
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            });
        } catch (error) {
            throw (error)
        }
    }

    static async getAvailabilityRoom({
        id,
        start,
        end
    }) {
        try {
            return await prisma.booking.findFirst({
                where: {
                    OR: [{
                            startDate: {
                                gte: start,
                                lte: end
                            }
                        },
                        {
                            endDate: {
                                gte: start,
                                lte: end
                            }
                        }
                    ],
                    room: {
                        id
                    }
                }
            })
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = BookingService;