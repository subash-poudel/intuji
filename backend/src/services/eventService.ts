import knex from "../db";
import { EventRequestModel } from "../models/eventModels";

export async function getAllEvents() {
  return knex.raw(`SELECT * FROM events;`).then((res) => res.rows);
}

export async function createEvent(event: EventRequestModel) {
  return knex
    .raw(
      `INSERT INTO events (title, description, duration, start_time, start_date, end_date, time_zone, location, recurrence, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW()) RETURNING *`,
      [
        event.title,
        event.description,
        event.duration,
        event.start_time,
        event.start_date,
        event.end_date,
        event.time_zone,
        event.location,
        event.recurrence ? JSON.stringify(event.recurrence) : null,
      ]
    )
    .then((result) => {
      return result.rows[0];
    });
}
