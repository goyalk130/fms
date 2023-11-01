import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// const client = new PrismaClient();
// const client = globalThis.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

// export default client;
