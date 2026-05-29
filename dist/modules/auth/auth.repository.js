"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = require("../../lib/prisma");
exports.UserRepository = {
    findByEmail(email) {
        return prisma_1.prisma.user.findUnique({
            where: { email },
        });
    },
    findById(id) {
        return prisma_1.prisma.user.findUnique({
            where: { id },
        });
    },
    create(data) {
        return prisma_1.prisma.user.create({
            data,
        });
    },
};
