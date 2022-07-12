const {
    PrismaClient
} = require('@prisma/client');
const { verifyToken } = require('../helpers/jwt');
const prisma = new PrismaClient();

async function authentification(req, res, next) {
    const {
        access_token
    } = req.headers;

    try {
        const decoded = verifyToken(access_token);

        const user = await prisma.user.findFirstOrThrow({
            where: {
                email: decoded?.email
            },
            include: {
                role: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if (user) {
            req.classified = {
                email: user.email,
                userId: user.id,
                authority: user.role.name
            }
            next()
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    authentification,
}