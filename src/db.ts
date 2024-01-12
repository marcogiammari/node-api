import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

// npx prisma format => auto format
// npx prisma studio => open prisma studio to edit db
