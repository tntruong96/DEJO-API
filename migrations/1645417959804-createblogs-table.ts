import {MigrationInterface, QueryRunner} from "typeorm";

export class createblogsTable1645417959804 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("CREATE TABLE `blogs` (`id` varchar(100) NOT NULL, `title` varchar(500) NOT NULL, `slug` varchar(50) NOT NULL, `content` text NOT NULL, `status` tinyint NOT NULL, `createdAt` date NOT NULL, `updatedAt` date NOT NULL, `createdBy` int NOT NULL REFERENCES `users`(`id`), `thumbnail` varchar(500) NOT NULL, `categoryId` varchar(100) NOT NULL, PRIMARY KEY (`id`))  ENGINE=InnoDB ")
        queryRunner.query("CREATE TABLE `blog-categories` (`id` varchar(100) NOT NULL, `name` varchar(500) NOT NULL UNIQUE, `status` tinyint NOT NULL, `createdAt` date NOT NULL, `updatedAt` date NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB")
        queryRunner.query("CREATE TABLE `images` (`id` varchar(100) NOT NULL, `path` varchar (500) NOT NULL UNIQUE, `name` varchar(100), `type` varchar(100), `status` tinyint NOT NULL, `createdAt` date NOT NULL, `updatedAt` date NOT NULL, PRIMARY KEY (`id`))")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("DROP TABLE `images`")
        queryRunner.query("DROP TABLE `blogs`")
        queryRunner.query("DROP TABLE `blog-categories`")
    }

}
