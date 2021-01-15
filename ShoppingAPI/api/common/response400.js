module.exports = function response400(res) {
  res.status(400).json({
    error: "Bad Request",
  })
};
