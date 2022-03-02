import {MigrationInterface, QueryRunner} from "typeorm";

export class User1644842883288 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`select 1+1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`select 1+2`);
    }

}
