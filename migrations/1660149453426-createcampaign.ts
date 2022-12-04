import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createcampaign1660149453426 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `campaign` (`id` varchar(100) NOT NULL, `slug` varchar(100) NOT NULL UNIQUE, `name` varchar(100) NOT NULL UNIQUE,`thumbnail` varchar(500) NOT NULL,`items` varchar(1000), `createdAt` date NOT NULL, `updatedAt` date NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE `campaign`");
  }
}
