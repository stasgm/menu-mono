/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_number_key" ON "Order"("number");
