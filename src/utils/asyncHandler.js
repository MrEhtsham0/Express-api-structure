// const asyncHandler = (func) => async (req, res, next) => {
//   try {
//     await func(req, res, next);
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const asyncHandler = (asyncHandlerWrapper) => {
  return (req, res, next) => {
    Promise.resolve(asyncHandlerWrapper(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

export { asyncHandler };
