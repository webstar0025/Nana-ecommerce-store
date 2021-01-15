const db = require('api/database');

function handler(req, res) {
  const { common } = req.app.locals;
  const { productId } = req.params;

  try {
    if (productId) {
      const index = db.getIndex('/products', productId);
      if (index < 0) common.response400(res);
      const product = db.getData(`/products[${index}]`);
      return res.json(product);
    } else {
      const products = db.getData('/products');
      const result = products.map(product => {
        const {id, name, category, price, quantity} = product;
        return {
          id, name, category, price, quantity
        }
        
      });
      return res.json(result);
    }
  } catch (err) {
    return common.response500(res, err);
  }
}

module.exports = function _get(req, res) {
  return handler(req, res);
};
