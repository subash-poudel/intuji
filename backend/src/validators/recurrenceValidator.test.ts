import { RecurrenceRule } from "../models/eventModels";
import { recurrenceSchema } from "./eventValidator";

describe("Validation Schema", () => {
  it('should pass when freq is "daily" and no other fields are present', () => {
    const data: RecurrenceRule = { freq: "DAILY" };
    const result = recurrenceSchema.validate(data);
    console.log("test", result);
    expect(result.error).toBeUndefined();
  });

  it('should pass when freq is "weekly" and byweekday is provided', () => {
    const data: RecurrenceRule = {
      freq: "WEEKLY",
      byweekday: ["Monday", "Wednesday"],
    };
    const result = recurrenceSchema.validate(data);
    expect(result.error).toBeUndefined();
  });

  it('should fail when freq is "weekly" and byweekday is missing', () => {
    const data: RecurrenceRule = { freq: "WEEKLY" };
    const result = recurrenceSchema.validate(data);
    expect(result.error).toBeDefined();
  });

  it('should pass when freq is "MONTHLY" and bymonthday is provided', () => {
    const data: RecurrenceRule = { freq: "MONTHLY", bymonthday: [1, 15, 31] };
    const result = recurrenceSchema.validate(data);
    expect(result.error).toBeUndefined();
  });

  it('should fail when freq is "MONTHLY" and bymonthday is missing', () => {
    const data: RecurrenceRule = { freq: "MONTHLY" };
    const result = recurrenceSchema.validate(data);
    expect(result.error).toBeDefined();
  });

  it('should fail when freq is "DAILY" and bymonthday or byweekday is present', () => {
    const dataWithBymonthday: RecurrenceRule = {
      freq: "DAILY",
      bymonthday: [1],
    };
    const dataWithByweekday: RecurrenceRule = {
      freq: "DAILY",
      byweekday: ["Monday"],
    };
    const resultWithBymonthday = recurrenceSchema.validate(dataWithBymonthday);
    const resultWithByweekday = recurrenceSchema.validate(dataWithByweekday);
    expect(resultWithBymonthday.error).toBeDefined();
    expect(resultWithByweekday.error).toBeDefined();
  });

  it("should fail when byweekday has invalid day values", () => {
    const data: RecurrenceRule = { freq: "WEEKLY", byweekday: ["Notaday"] };
    const result = recurrenceSchema.validate(data);
    expect(result.error).toBeDefined();
  });

  it("should fail when bymonthday has values out of range", () => {
    const data: RecurrenceRule = { freq: "MONTHLY", bymonthday: [0, 32] };
    const result = recurrenceSchema.validate(data);
    expect(result.error).toBeDefined();
  });
});
