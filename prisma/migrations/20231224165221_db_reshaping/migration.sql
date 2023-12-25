/*
  Warnings:

  - Added the required column `guildGuildId` to the `GuildMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildGuildId` to the `GuildModules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GuildMember" ADD COLUMN     "guildGuildId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GuildModules" ADD COLUMN     "guildGuildId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Guild" (
    "guildId" TEXT NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("guildId")
);

-- CreateTable
CREATE TABLE "Channel" (
    "channelId" TEXT NOT NULL,
    "markov" BOOLEAN NOT NULL,
    "guildGuildId" TEXT NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("channelId")
);

-- AddForeignKey
ALTER TABLE "GuildModules" ADD CONSTRAINT "GuildModules_guildGuildId_fkey" FOREIGN KEY ("guildGuildId") REFERENCES "Guild"("guildId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildMember" ADD CONSTRAINT "GuildMember_guildGuildId_fkey" FOREIGN KEY ("guildGuildId") REFERENCES "Guild"("guildId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_guildGuildId_fkey" FOREIGN KEY ("guildGuildId") REFERENCES "Guild"("guildId") ON DELETE RESTRICT ON UPDATE CASCADE;
