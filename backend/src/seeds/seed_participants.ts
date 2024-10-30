import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("participants").del();

  // Inserts seed entries
  await knex("participants").insert([
    {
      event_id: 1, // Assuming the first event is "Community Picnic"
      name: "John Doe",
      email: "johndoe@example.com",
      rsvp_status: "accepted",
    },
    {
      event_id: 1, // Same event
      name: "Jane Smith",
      email: "janesmith@example.com",
      rsvp_status: "pending",
    },
    {
      event_id: 2, // Assuming the second event is "Tech Conference 2024"
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      rsvp_status: "declined",
    },
  ]);
}
