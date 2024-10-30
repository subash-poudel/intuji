import knex from "../db";

export async function getAllEvents() {
  return knex.raw(`SELECT * FROM events;`).then((res) => res.rows);
}
