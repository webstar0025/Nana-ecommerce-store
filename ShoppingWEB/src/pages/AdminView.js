import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, Modal, ProductCard, ProductsTable } from '../components';
import { productsService } from '../services';

const Container = styled.div`
  width: 80%;
  margin: auto;
  padding-top: 50px;
`;

const AddContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;

  button {
    padding: 16px 24px;
    font-size: 16px;
    background-color: #0053F0;
    &:hover {
      background-color: #0B7FFF;
    }
  },
`;

// page for a admin
export const AdminView = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await productsService.getProducts();
      setProducts(res);
    }

    fetchProducts();
  }, []);

  const handleOpenModal = () =>  {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const createProduct = async (payload) => {
    const newProduct = await productsService.postProducts(payload);
    setProducts([...products, newProduct]);
    handleCloseModal();
  };

  const handleCreate = () => {
    setModalContent(<ProductCard type='add' createProduct={createProduct} />);
    handleOpenModal();
  };

  const handleView = async (productId) => {
    const product = await productsService.getProduct(productId);
    setModalContent(<ProductCard product={product} type='view' />);
    handleOpenModal();
  }

  const editProduct = async (productId, payload) => {
    const product = await productsService.editProduct(productId, payload);
    const temp = products.map(item => {
      if (item.id === productId) {
        return product;
      } else {
        return item;
      }
    });
    setProducts(temp);
    handleCloseModal();
  };

  const handleEdit = async (productId) => {
    const product = await productsService.getProduct(productId);
    setModalContent(<ProductCard product={product} editProduct={editProduct} type='edit' />)
    handleOpenModal();
  }

  const handleDelete = async (productId) => {
    const result = await productsService.deleteProduct(productId);
    if (result) {
      const temp = products.filter(item => item.id !== productId);
      setProducts(temp);
    }
  }

  return (
    <Container>
      <AddContainer>
        <Button onClick={handleCreate}>Create Product</Button>
      </AddContainer>
      <ProductsTable
        products={products}
        userType="admin"
        handleView={handleView}
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
      />
      <Modal showModal={showModal} handleCloseModal={handleCloseModal}>
        {modalContent}
      </Modal>
    </Container>
  );
};