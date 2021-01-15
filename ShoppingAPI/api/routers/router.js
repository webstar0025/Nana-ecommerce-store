const express = require('express');
const router = express.Router();

const { products } = require('api/controllers');

router.get('/products', products.get);
router.post('/products', products.post);

router.get('/products/:productId', products.get);
router.patch('/products/:productId', products.patch);
router.delete('/products/:productId', products.delete);

module.exports = router;
