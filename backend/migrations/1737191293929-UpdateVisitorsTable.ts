import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateVisitorsTable1737191293929 implements MigrationInterface {
    name = 'UpdateVisitorsTable1737191293929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Visitors\` DROP COLUMN \`visitCount\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Visitors\` ADD \`visitCount\` int NOT NULL DEFAULT '1'`);
    }

}
