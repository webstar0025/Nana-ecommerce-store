import React from 'react';
import styled from 'styled-components';

import { Button } from './button';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  max-height: 700px;
  overflow-y: auto;

  td, th {
    border: 1px solid #ddd;
    padding: 8px 10px;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #2E5AAC;
    color: white;
    text-align: center;
  }

  .control {
    display: flex;
    justify-content: space-around;
  }
`;

const ViewButton = styled(Button)`
  padding: 8px 16px;
  background-color: #0053F0;
  &:hover {
    background-color: #0B7FFF;
  }
`;

const EditButton = styled(Button)`
  padding: 8px 16px;
  background-color: #287D3C;
  &:hover {
    background-color: #5ACA75;
  }
`;

const DeleteButton = styled(Button)`
  padding: 8px 16px;
  background-color: #DA1414;
  &:hover {
    background-color: #E47989;
  }
`;

// this component shows product list, which has several functions for amdin and customer.
export const ProductsTable = ({ products, userType, handleView = null, handleEdit = null, handleDelete = null }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => <tr key={product.id}>
          <td>{product.name}</td>
          <td>{product.category}</td>
          <td>${product.price}</td>
          <td>{product.quantity}</td>
          <td className="control">
            <ViewButton onClick={() => handleView(product.id)}>
              View
            </ViewButton>
            {userType === 'admin' ? <>
                <EditButton onClick={() => handleEdit(product.id)}>
                  Edit
                </EditButton>
                <DeleteButton onClick={() => handleDelete(product.id)}>
                  Delete
                </DeleteButton>
              </> : null}
          </td>
        </tr>)}
      </tbody>
    </Table>
  );
};
