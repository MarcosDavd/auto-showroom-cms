-- CreateEnum
CREATE TYPE "estado_auto" AS ENUM ('0km', 'usado');

-- AlterTable
ALTER TABLE "autos" ADD COLUMN     "estado" "estado_auto" NOT NULL DEFAULT 'usado';
