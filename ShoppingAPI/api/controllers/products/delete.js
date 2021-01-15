const db = require('api/database');

function handler(req, res) {
  const { common } = req.app.locals;
  const { productId } = req.params;

  try {
    const index = db.getIndex('/products', productId);
    if (index < 0) common.response400(res);
    db.delete(`/products[${index}]`)
    return res.json(true);
  } catch (err) {
    return common.response500(res, err);
  }
}

module.exports = function _get(req, res) {
  return handler(req, res);
};
