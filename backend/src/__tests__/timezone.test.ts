import { formatInTimeZone } from "date-fns-tz";
import { parseISO } from "date-fns";
import { convertToUtcDate } from "../helpers/dateHelper";

describe("TimeZone Test", () => {
  it("Test that date/time from frontend is converted correctly to backend", () => {
    const dateParameters = {
      date: "2024-11-01",
      //   tzIdentifier: "Asia/Kathmandu",
      tzIdentifier: "Asia/Calcutta",
      time: "04:00:00",
    };
    const dateTimeString = `${dateParameters.date}T${dateParameters.time}`;

    const actual = convertToUtcDate(
      dateParameters.date,
      dateParameters.time,
      dateParameters.tzIdentifier
    ).toISOString();
    const expected = "2024-10-31T22:00:00.000Z";

    expect(actual).toEqual(expected);
  });

  it("Test that date/time saved in database is correctly shown in user's timezone", () => {
    const dateInUTC = "2024-10-31T22:15:00Z";
    const userTimeZone = "Asia/Kathmandu";
    const utcDate = parseISO(dateInUTC);
    const actual = formatInTimeZone(
      utcDate,
      userTimeZone,
      "yyyy-MM-dd'T'HH:mm:ssXXX"
    );
    const expected = "2024-11-01T04:00:00+05:45";

    expect(actual).toEqual(expected);
  });
});
