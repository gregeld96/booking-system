const {
    PrismaClient
} = require('@prisma/client');
const prisma = new PrismaClient();

class RoomService {
    static async getRoomList(){
        try {
            const rooms = await prisma.room.findMany();

            return {
                rooms
            }
        } catch (error) {
            throw(error)
        }
    }

    static async getSpecificRoom({id}){
        try {
            const room = await prisma.room.findFirstOrThrow({
                where: {
                    id: Number(id)
                }
            });

            return {
                room
            }
        } catch (error) {
            throw(error)
        }
    }

    static async getEventsRoom(request){
        const { id } = request.params;

        try {
            const data = await prisma.room.findFirstOrThrow({
                where: {
                    id: Number(id)
                },
                include: {
                    bookings: {
                        include: {
                            user: {
                                select: {
                                    name: true
                                }
                            },
                        }
                    },
                }
            });

            const room = {
                ...data,
                bookings: data.bookings.map((booking) => {
                    delete booking.roomId;
                    delete booking.userId;
                    
                    return {
                        ...booking,
                        user: booking.user.name
                    }
                })
            }

            return {
                room
            }
        } catch (error) {
            throw(error)
        }
    }
}

module.exports = RoomService;