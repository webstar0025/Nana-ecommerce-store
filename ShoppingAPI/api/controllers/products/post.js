const uuid = require('uuid');
const db = require('api/database');

function handler(req, res) {
  const { common } = req.app.locals;
  const { name, category, description, price, quantity} = req.body;
  if (!name || !category || !description || !price || !quantity) {
    return common.response400(res);
  }

  try {
    const product = {
      id: uuid.v4(),
      name,
      category,
      description,
      price,
      quantity
    }
    db.push('/products[]', product);
    return res.json(product);
  } catch (err) {
    return common.response500(res, err);
  }
}

module.exports = function _post(req, res) {
  return handler(req, res);
};
