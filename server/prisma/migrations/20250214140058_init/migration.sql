-- CreateTable
CREATE TABLE "citizens" (
    "id" SERIAL NOT NULL,
    "nik" VARCHAR(100) NOT NULL,
    "age" SMALLINT NOT NULL,
    "education_level" VARCHAR(10),
    "occupation" VARCHAR(100),
    "relationship" VARCHAR(100),
    "race" VARCHAR(100),
    "sex" VARCHAR(10) NOT NULL,
    "religion" VARCHAR(100),
    "city" VARCHAR(100),
    "province" VARCHAR(100),
    "regency" VARCHAR(100),
    "address" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "citizens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "citizens_nik_key" ON "citizens"("nik");
