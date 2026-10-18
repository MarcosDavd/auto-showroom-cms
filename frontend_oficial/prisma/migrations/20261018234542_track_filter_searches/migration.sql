-- CreateTable
CREATE TABLE "busquedas_filtros" (
    "id" SERIAL NOT NULL,
    "marca" TEXT,
    "modelo" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "busquedas_filtros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "busquedas_filtros_fecha_idx" ON "busquedas_filtros"("fecha");
