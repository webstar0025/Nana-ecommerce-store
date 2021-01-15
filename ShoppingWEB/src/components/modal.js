import React from 'react';
import styled from 'styled-components';
import * as ReactModal from 'react-modal';

import { Button } from './button';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    minWidth: '350px',
    minHeight: '250px',
    borderRadius: '8px',
    transform: 'translate(-50%, -50%)'
  }
};

const CloseButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 6px 10px;
  background-color: #0053F0;
  &:hover {
    background-color: #0B7FFF;
  }
`;


// define reusable modal component for a product
export const Modal = ({showModal, handleCloseModal, children }) => {
  return (
    <ReactModal
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <CloseButton onClick={handleCloseModal}>
        X
      </CloseButton>
      {children}
    </ReactModal>
  );
}