import { HttpError } from 'http-errors';
export const errorHandler = (error, req, res, _next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({
      status: error.status,
      message: error.name,
      data: error,
    });
    return;
  }
  res.json({
    status: 500,
    message: 'Something went wrong',
    error: error.message,
  });
};

// {
// 		status: 500,
// 		message: "Something went wrong",
// 		data:

// }
