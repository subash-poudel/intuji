import { Knex } from "knex";
import { getRandomItem } from "../helpers/utils";

export async function seed(knex: Knex): Promise<void> {
  await knex("participants").del();

  const eventIds: number[] = await knex("events").then((result) => {
    return result.map((r) => r.id);
  });

  await knex("participants").insert([
    {
      event_id: getRandomItem(eventIds),
      name: "John Doe",
      email: "johndoe@example.com",
      rsvp_status: "accepted",
    },
    {
      event_id: getRandomItem(eventIds),
      name: "Jane Smith",
      email: "janesmith@example.com",
      rsvp_status: "pending",
    },
    {
      event_id: getRandomItem(eventIds),
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      rsvp_status: "declined",
    },
  ]);
}
