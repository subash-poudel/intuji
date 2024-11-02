import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("events").del();

  // Inserts seed entries
  await knex("events").insert([
    {
      title: "Community Picnic",
      description: "A fun-filled picnic for the community.",
      start_time: new Date("2024-11-05T12:00:00Z").toISOString(),
      time_zone: "America/New_York",
      location: "Central Park, NY",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      title: "Tech Conference 2024",
      description: "An annual tech conference featuring industry leaders.",
      start_time: new Date("2024-12-10T09:00:00Z"),
      time_zone: "America/Los_Angeles",
      location: "Convention Center, CA",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);
}
