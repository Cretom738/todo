import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1711201483675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "first_name" character varying,
                "last_name" character varying,
                "email" character varying,
                "country" character varying,
                "residence" character varying,
                "address" character varying,
                "amount" character varying,
                "income" character varying,
                "source_of_funds" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_f6e2c6bc04c92a0bd2bbb43a897" PRIMARY KEY ("id"))`
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`)
    }

}
