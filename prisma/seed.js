const {
    PrismaClient
} = require('@prisma/client');
const {
    hashPassword
} = require('../src/helpers/bcrypt');
const prisma = new PrismaClient();

async function main() {
    const roles = [{
            name: "Karyawan",
        },
        {
            name: "Admin"
        }
    ]

    await prisma.role.createMany({
        data: roles
    })

    const users = [{
            name: "Admin",
            nik: "BS000001",
            email: "admin@booking-system.com",
            password: hashPassword('admin'),
            roleId: 2,
        },
        {
            name: "Karyawan",
            nik: "BS000002",
            email: "karyawan@booking-system.com",
            password: hashPassword('karyawan'),
            roleId: 1,
        }
    ]

    await prisma.user.createMany({
        data: users
    })

    const rooms = [
        {
            name: "Meeting 1"
        },
        {
            name: "Meeting 2"
        },
        {
            name: "Auditorium"
        }
    ]

    await prisma.room.createMany({
        data: rooms
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })