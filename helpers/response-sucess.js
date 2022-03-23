const responseSuccess = (res, status, data) => {
  return res.status(status).json({
    status,
    data,
  });
};
module.exports = responseSuccess;
