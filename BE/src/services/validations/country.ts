import * as Joi from "joi";

export const countryInfoQuerySchema = Joi.object({
  countryCode: Joi.string()
    .length(2)
    .uppercase()
    .required()
    .messages({
      'string.base': '"countryCode" should be a string.',
      'string.empty': '"countryCode" cannot be empty.',
      'string.length': '"countryCode" must be exactly 2 characters.',
      'any.required': '"countryCode" is required.',
    }),

  countryName: Joi.string()
    .min(1)
    .required()
    .messages({
      'string.base': '"countryName" should be a string.',
      'string.empty': '"countryName" cannot be empty.',
      'any.required': '"countryName" is required.',
    }),
});