const {
    PrismaClient
} = require('@prisma/client');
const prisma = new PrismaClient();

async function adminAuthorization(req, res, next) {
    const {
        userId,
        authority
    } = req.classified;

    try {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                id: Number(userId)
            },
            include: {
                role: {
                    select: {
                        name:true
                    }
                }
            }
        });

        if(authority.toLocaleLowerCase() === 'admin' && user.role.name.toLocaleLowerCase() === 'admin') {
            next()
        } else {
            throw({
                status: 403,
                message: "You are not authorize!"
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    adminAuthorization,
}