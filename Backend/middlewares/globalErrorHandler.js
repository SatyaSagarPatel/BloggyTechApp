const globalErrorHnadler = (error, req, resp, next) => {
  // console.log("Error:", error);
  const status = error?.status ? error.status : "failed";
  const message = error?.message;
  const stack = error?.stack;
  resp.status(500).json({ status, message, stack });
};
const notFound = (req, resp, next) => {
  let error = new Error(
    `Can't find the route for ${req.originalUrl} at the server`,
  );
  next(error);
};
module.exports = { globalErrorHnadler, notFound };
