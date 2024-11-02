import knex from "../db";
import { EventRequestModel } from "../models/eventModels";

export async function getAllEvents() {
  return knex.raw(`SELECT * FROM events;`).then((res) => res.rows);
}

export async function getAllExistingEventsForParticipants(
  participantEmails: string[]
) {
  // TODO sql injection prevention. the sql is vunurable here
  const emails = participantEmails.map((e) => `'${e}'`).join(", ");
  const sql = `select * from events e where e.id in (select distinct p.event_id from participants p where p.email in (${emails}));`;
  console.log("sql", sql);
  return knex.raw(sql).then((res) => res.rows);
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

export async function insertParticipants(participants: any[]) {
  return knex("participants").insert(participants);
}
