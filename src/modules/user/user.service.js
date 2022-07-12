const {
    PrismaClient
} = require('@prisma/client');
const prisma = new PrismaClient();
const {
    checkPassword,
    hashPassword
} = require("../../helpers/bcrypt");
const {
    generateToken
} = require("../../helpers/jwt");

class UserService {
    static async signIn(request) {
        const {
            email,
            password
        } = request.body;

        try {
            if (!email || !password) {
                throw ({
                    status: 400,
                    message: "Email and Password required",
                });
            }

            const user = await this.findUserByEmail(email);

            if (!user) throw ({
                status: 400,
                message: "User doesn't exist"
            });

            if (!checkPassword(password, user.password)) {
                throw ({
                    status: 400,
                    message: "Email or Password incorrect!",
                });
            }

            const token = generateToken({
                email: user.email
            });

            await prisma.user.update({
                data: {
                    token
                },
                where: {
                    id: user.id
                }
            });

            return {
                token: token,
            }
        } catch (error) {
            throw (error)
        }
    }

    static async signUp(request) {
        const {
            email,
            password,
            name,
            role,
            nik,
        } = request.body;

        try {
            if (!email || !password || !name || !role || !nik) {
                throw ({
                    status: 400,
                    message: "Email, password, name, nik, and role are required"
                })
            }

            const selectedRole = await prisma.role.findFirstOrThrow({
                where: {
                    name: {
                        equals: role,
                        mode: 'insensitive',
                    }
                }
            });

            // Check email exist
            const user = await this.findUserByEmail(email);

            if (user) throw ({
                status: 400,
                message: "Email already exist"
            });

            const token = generateToken({
                email: email
            });

            let payload = {
                name,
                email,
                nik,
                password: hashPassword(password),
                roleId: selectedRole.id,
                token
            }

            await prisma.user.create({
                data: payload
            });

            return {
                token
            }

        } catch (error) {
            throw (error)
        }
    }

    static async findUserByEmail(email) {
        return await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive',
                }
            }
        })
    }
}

module.exports = UserService;