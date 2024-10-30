import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("participants", (table) => {
    table.increments("id").primary();
    table.integer("event_id").unsigned().notNullable();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.enu("rsvp_status", ["accepted", "declined", "pending"]).notNullable();

    // Add foreign key constraint
    table
      .foreign("event_id")
      .references("id")
      .inTable("events")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("participants");
}
