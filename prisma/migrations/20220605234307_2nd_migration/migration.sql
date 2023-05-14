/*
  Warnings:

  - You are about to alter the column `nom` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(64)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(128)`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `nom` VARCHAR(64) NOT NULL,
    MODIFY `email` VARCHAR(128) NOT NULL;
