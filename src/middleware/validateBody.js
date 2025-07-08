import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    const details = error.details.map((detail) => detail.message).join(', ');
    const err = createHttpError(400, `Validation error: ${details}`);
    next(err);
  }
};
