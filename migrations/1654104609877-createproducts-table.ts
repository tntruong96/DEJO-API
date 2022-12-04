import {MigrationInterface, QueryRunner} from "typeorm";

export class product1654104609877 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE  `product-categories` (`id` varchar(100) NOT NULL, `name` varchar(500) NOT NULL UNIQUE, `slug` varchar(500) NOT NULL, `status` boolean  NOT NULL, `createdAt` date NOT NULL, `updatedAt` date NOT NULL, PRIMARY KEY (`id`))  ENGINE=InnoDB ");
        await queryRunner.query("CREATE TABLE `product` (`id` varchar(100) NOT NULL, `name` varchar(500) NOT NULL UNIQUE, `discount` int,`detail` text, `slug` varchar(500) NOT NULL, `status` boolean  NOT NULL, `createdAt` date NOT NULL, `updatedAt` date NOT NULL, `price` decimal NOT NULL, `description` text, `sizes` varchar(500) NOT NULL, `colors` varchar(500) NOT NULL, `thumbnail` varchar(500) NOT NULL, `images` varchar(500) NOT NULL,`categoryId` varchar(100) NOT NULL REFERENCES `product-categories`(`id`)  , PRIMARY KEY (`id`) ) ENGINE=InnoDB")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `product`");
        await queryRunner.query("DROP TABLE `product-categories`")
    }

}
