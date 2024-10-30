import { ObjectSchema } from "joi";
import isEmpty from "lodash.isempty";

/**
 * Utility helper for Joi validation.
 */
function validate(data: any, schema: ObjectSchema) {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (!isEmpty(error)) {
    return Promise.reject(error);
  }

  return Promise.resolve(value);
}

export default validate;
