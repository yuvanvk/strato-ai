-- DropForeignKey
ALTER TABLE "public"."message" DROP CONSTRAINT "message_chatId_fkey";

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
