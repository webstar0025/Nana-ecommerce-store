import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Modal, ProductCard, ProductsTable } from '../components';
import { productsService } from '../services';

const Container = styled.div`
  width: 80%;
  margin: auto;
  padding-top: 50px;
`;


// page for a customer
export const CustomerView = () => {
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

  const handleView = async (productId) => {
    const product = await productsService.getProduct(productId);
    setModalContent(<ProductCard product={product} type='view' />);
    handleOpenModal();
  }

  return (
    <Container>
      <ProductsTable
        products={products}
        userType="customer"
        handleView={handleView}
      />
      <Modal showModal={showModal} handleCloseModal={handleCloseModal}>
        {modalContent}
      </Modal>
    </Container>
  );
};
