import * as yup from "yup";

export const createEventValidationSchema = yup.object({
  title: yup.string().max(100).min(2).required(),
  description: yup.string().max(100).min(2).required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
});
