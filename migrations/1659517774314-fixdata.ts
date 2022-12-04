import {MigrationInterface, QueryRunner} from "typeorm";

export class fixdata1659517774314 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("ALTER TABLE `blogs` ADD shortContent varchar(500)")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("ALTER TABLE `blogs` DROP shortContent varchar(500)")
    }

}
