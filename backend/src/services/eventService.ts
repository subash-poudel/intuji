import knex from "../db";
import { EventRequestModel } from "../models/eventModels";

export async function getAllEvents() {
  // return knex.raw(`SELECT * FROM events;`).then((res) => res.rows);
  const events = await knex("events")
    .join("participants", "events.id", "participants.event_id")
    .select(
      "events.id as event_id",
      "events.title",
      "events.description",
      "events.duration",
      "events.start_time",
      "events.start_date",
      "events.end_date",
      "events.time_zone",
      "events.location",
      "events.recurrence",
      "participants.id as participant_id",
      "participants.name as participant_name",
      "participants.email as participant_email",
      "participants.rsvp_status"
    );

  const structuredResponse = events.reduce((acc, item) => {
    let event = acc.find((e: any) => e.event_id === item.event_id);

    if (!event) {
      event = {
        event_id: item.event_id,
        title: item.title,
        description: item.description,
        duration: item.duration,
        start_time: item.start_time,
        start_date: item.start_date,
        end_date: item.end_date,
        time_zone: item.time_zone,
        location: item.location,
        recurrence: item.recurrence,
        participants: [],
      };
      acc.push(event);
    }
    event.participants.push({
      participant_id: item.participant_id,
      name: item.participant_name,
      email: item.participant_email,
      rsvp_status: item.rsvp_status,
    });

    return acc;
  }, []);

  return structuredResponse;
}

export async function getAllExistingEventsForParticipants(
  participantEmails: string[]
) {
  // TODO sql injection prevention. the sql is vunurable here
  const emails = participantEmails.map((e) => `'${e}'`).join(", ");
  const sql = `select * from events e where e.id in (select distinct p.event_id from participants p where p.email in (${emails}));`;
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
