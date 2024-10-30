import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("events", (table) => {
    table.increments("id").primary();
    table.string("title", 150).notNullable();
    table.string("description", 500);
    table.timestamp("start_time", { useTz: true }).notNullable();
    table.timestamp("end_time", { useTz: true }).notNullable();
    table.string("time_zone").notNullable();
    table.string("location");
    table.timestamps(true, true); // created_at and updated_at timestamps
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("events");
}
