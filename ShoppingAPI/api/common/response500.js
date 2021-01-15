module.exports = function response500(res, error) {
  res.status(500).json({
    error
  })
};
