import Joi from 'joi';

export const createValidationContact = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
});

export const updateValidationContact = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
}).or('name', 'phoneNumber');
