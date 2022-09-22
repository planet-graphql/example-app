-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('New', 'InProgress', 'Done', 'Pending');

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "counterParty" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "status" "TodoStatus" NOT NULL,
    "todaysAction" BOOLEAN NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
