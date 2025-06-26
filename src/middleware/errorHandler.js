import { HttpError } from 'http-errors';
export const errorHandler = (error, req, res, _next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
    });
    return;
  }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: error.message,
  });
};

// {
// 		status: 500,
// 		message: "Something went wrong",
// 		data:

// }
