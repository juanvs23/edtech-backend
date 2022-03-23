const responseErrors = (res, status, error, msg) => {
  return res.status(status).json({
    status,
    data: {
      error,
      msg,
    },
  });
};
module.exports = responseErrors;
