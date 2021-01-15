import {get, post, patch, del} from '../utils/api';

// define all api integrations for a product

// fetch all products list
const getProducts = () => {
  return get({
    path: 'products'
  });
};

// create a product
const postProducts = (payload) => {
  return post({
    path: 'products',
    body: payload
  });
};

// fetch a product with a given productId
const getProduct = (productId) => {
  return get({
    path: `products/${productId}`
  });
};

// update a product with a given productId
const editProduct = (productId, payload) => {
  return patch({
    path: `products/${productId}`,
    body: payload,
  });
};

// delete a product with a given productId
const deleteProduct = (productId) => {
  return del({
    path: `products/${productId}`
  });
};

export const productsService = {
  getProducts,
  postProducts,
  getProduct,
  editProduct,
  deleteProduct,
};
