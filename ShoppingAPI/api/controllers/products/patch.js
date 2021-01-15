const db = require('api/database');

function handler(req, res) {
  const { common } = req.app.locals;
  const { productId } = req.params;
  
  const { name, category, description, price, quantity} = req.body;
  if (!name && !category && !description && !price && !quantity) {
    return common.response400(res);
  }

  try {
    const index = db.getIndex('/products', productId);
    if (index < 0) common.response400(res);
    const product = db.getData(`/products[${index}]`);
    const newProduct = {
      id: product.id,
      name: name || product.name,
      category: category || product.category,
      description: description || product.description,
      price: price === undefined ? product.price : price,
      quantity: quantity === undefined ? product.quantity : quantity, 
    } 
    db.push(`/products[${index}]`, newProduct);
    return res.json(newProduct);
  } catch (err) {
    return common.response500(res, err);
  }
}

module.exports = function _patch(req, res) {
  return handler(req, res);
};
