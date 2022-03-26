import {MigrationInterface, QueryRunner} from "typeorm";

export class createblogsTable1645417959804 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("CREATE TABLE `blogs` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(500) NOT NULL, `slug` varchar(50) NOT NULL, `content` text NOT NULL, `status` tinyint NOT NULL, `createdAt` date NOT NULL, `updatedAt` date NOT NULL, `createdBy` int NOT NULL REFERENCES `users`(`id`), `images` varchar(500) NOT NULL, `categoryId` int NOT NULL, PRIMARY KEY (`id`))  ENGINE=InnoDB ")
        queryRunner.query("CREATE TABLE `blog-categories` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(500) NOT NULL UNIQUE, `status` tinyint NOT NULL, `createdAt` date NOT NULL, `updatedAt` date NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB")
        queryRunner.query("CREATE TABLE `images` (`id` int NOT NULL AUTO_INCREMENT, `path` varchar (500) NOT NULL UNIQUE, `status` tinyint NOT NULL, `createdAt` date NOT NULL, `updatedAt` date NOT NULL, PRIMARY KEY (`id`))")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("DROP TABLE `images`")
        queryRunner.query("DROP TABLE `blogs`")
        queryRunner.query("DROP TABLE `blog-categories`")
    }

}
