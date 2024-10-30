import knex from "../db";
import { EventRequestModel } from "../models/eventModels";

export async function getAllEvents() {
  return knex.raw(`SELECT * FROM events;`).then((res) => res.rows);
}

export async function createEvent(event: EventRequestModel) {
  return knex
    .raw(
      `INSERT INTO events (title, description, start_time, end_time, time_zone, location, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW()) RETURNING *`,
      [
        event.title,
        event.description,
        event.start_time,
        event.end_time,
        event.time_zone,
        event.location,
      ]
    )
    .then((result) => {
      return result.rows[0];
    });
}
