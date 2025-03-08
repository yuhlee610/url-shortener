import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1737182909526 implements MigrationInterface {
    name = 'CreateTables1737182909526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'user', \`password\` varchar(255) NOT NULL, \`refreshToken\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Advertisements\` (\`id\` int NOT NULL AUTO_INCREMENT, \`image\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdById\` int NULL, \`updatedById\` int NULL, \`deletedById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`URLs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sourceUrl\` varchar(255) NOT NULL, \`destinationUrl\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`advertisementId\` int NULL, \`createdById\` int NULL, \`updatedById\` int NULL, \`deletedById\` int NULL, UNIQUE INDEX \`IDX_d993758a69426edfdf22d28a66\` (\`destinationUrl\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Visitors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ipAddress\` varchar(255) NOT NULL, \`visitCount\` int NOT NULL DEFAULT '1', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`urlId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Advertisements\` ADD CONSTRAINT \`FK_ca160c25150375729cf1b8b3287\` FOREIGN KEY (\`createdById\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Advertisements\` ADD CONSTRAINT \`FK_93aac13294a91f30bc793169783\` FOREIGN KEY (\`updatedById\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Advertisements\` ADD CONSTRAINT \`FK_11c3ffc52928c7f7cef2503a771\` FOREIGN KEY (\`deletedById\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`URLs\` ADD CONSTRAINT \`FK_ee1b0582fc0f371d5904d717fdf\` FOREIGN KEY (\`advertisementId\`) REFERENCES \`Advertisements\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`URLs\` ADD CONSTRAINT \`FK_8d8b616d233e4c53d160d9d8cec\` FOREIGN KEY (\`createdById\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`URLs\` ADD CONSTRAINT \`FK_b800e78fc895527136f17a201f9\` FOREIGN KEY (\`updatedById\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`URLs\` ADD CONSTRAINT \`FK_98a982351f75c7dad58a1e74c82\` FOREIGN KEY (\`deletedById\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Visitors\` ADD CONSTRAINT \`FK_6fba363390b656084ab8719ce0a\` FOREIGN KEY (\`urlId\`) REFERENCES \`URLs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Visitors\` DROP FOREIGN KEY \`FK_6fba363390b656084ab8719ce0a\``);
        await queryRunner.query(`ALTER TABLE \`URLs\` DROP FOREIGN KEY \`FK_98a982351f75c7dad58a1e74c82\``);
        await queryRunner.query(`ALTER TABLE \`URLs\` DROP FOREIGN KEY \`FK_b800e78fc895527136f17a201f9\``);
        await queryRunner.query(`ALTER TABLE \`URLs\` DROP FOREIGN KEY \`FK_8d8b616d233e4c53d160d9d8cec\``);
        await queryRunner.query(`ALTER TABLE \`URLs\` DROP FOREIGN KEY \`FK_ee1b0582fc0f371d5904d717fdf\``);
        await queryRunner.query(`ALTER TABLE \`Advertisements\` DROP FOREIGN KEY \`FK_11c3ffc52928c7f7cef2503a771\``);
        await queryRunner.query(`ALTER TABLE \`Advertisements\` DROP FOREIGN KEY \`FK_93aac13294a91f30bc793169783\``);
        await queryRunner.query(`ALTER TABLE \`Advertisements\` DROP FOREIGN KEY \`FK_ca160c25150375729cf1b8b3287\``);
        await queryRunner.query(`DROP TABLE \`Visitors\``);
        await queryRunner.query(`DROP INDEX \`IDX_d993758a69426edfdf22d28a66\` ON \`URLs\``);
        await queryRunner.query(`DROP TABLE \`URLs\``);
        await queryRunner.query(`DROP TABLE \`Advertisements\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` ON \`Users\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
    }

}
