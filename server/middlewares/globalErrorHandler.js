export const globalErrorHandler = (err, req, res, next) => {
  const stack = err?.stack;
  const message = err?.message;
  const statusCode = err?.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    stack,
    message,
  });
};

// 404 handler
export const notFound = (req, res, next) => {
  const err = new Error(`Not found - ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
};
