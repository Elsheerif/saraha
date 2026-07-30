import Joi from "joi";

export const privateNotesSchema = Joi.object({
  notes: Joi.string().trim().max(2000).required(),
});
