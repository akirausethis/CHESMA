/*
  Warnings:

  - You are about to drop the `Competition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Voter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Competition" DROP CONSTRAINT "Competition_team1_id_fkey";

-- DropForeignKey
ALTER TABLE "Competition" DROP CONSTRAINT "Competition_team2_id_fkey";

-- DropTable
DROP TABLE "Competition";

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "Voter";

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "amount" INTEGER NOT NULL,
    "unit" VARCHAR(50) NOT NULL,

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuIngredients" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "ingredients_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "MenuIngredients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MenuIngredients" ADD CONSTRAINT "MenuIngredients_ingredients_id_fkey" FOREIGN KEY ("ingredients_id") REFERENCES "Ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuIngredients" ADD CONSTRAINT "MenuIngredients_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
