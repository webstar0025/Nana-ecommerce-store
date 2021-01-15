module.exports = function common(req, res, next) {
  req.app.locals.common = require('../common');
  next();  
}