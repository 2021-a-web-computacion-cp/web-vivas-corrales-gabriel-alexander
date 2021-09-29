-- CreateTable
CREATE TABLE `BANDA_MUSICAL` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `anio_creacion` YEAR NOT NULL,
    `activa` BOOLEAN NOT NULL,
    `num_integrantes` INTEGER NOT NULL,
    `genero` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
