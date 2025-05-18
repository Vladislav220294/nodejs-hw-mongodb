import createHttpError from 'http-errors';

export function notFoundHandler(req, res, next) {
  throw new createHttpError.NotFound("Route not found");
    // res.status(404).json({
    //   status: 404,
    //   message: 'Route not found',
    // });
  }