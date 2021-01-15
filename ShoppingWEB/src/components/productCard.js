import React, {useState} from 'react';
import styled from 'styled-components';
import { useAlert } from 'react-alert';

import { Button } from './button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 5px 30px;
  
  label {
    font-size: 16px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  textarea, input {
    width: 100%;
    font-size: 14px;
    border: 1px solid #666;
    border-radius: 4px;
    padding: 8px;
  }

  textarea {
    resize: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 30px;
`;

const CreateButton = styled(Button)`
  padding: 8px 16px;
  letter-spacing: 1.5px;
  background-color: #0053F0;
  &:hover {
    background-color: #0B7FFF;
  }
`;

const EditButton = styled(Button)`
  padding: 8px 16px;
  letter-spacing: 1.5px;
  background-color: #287D3C;
  &:hover {
    background-color: #5ACA75;
  }
`;

// this component is used for a product, which shows all the details of a product.
export const ProductCard = ({ product = null, type, createProduct = null, editProduct = null }) => {
  const alert = useAlert();
  const [name, setName] = useState((type !== 'add' && product) ? product.name: '');
  const [category, setCategory] = useState((type !== 'add' && product) ? product.category: '');
  const [description, setDescription] = useState((type !== 'add' && product) ? product.description: '');
  const [price, setPrice] = useState((type !== 'add' && product) ? product.price: '');
  const [quantity, setQuantity] = useState((type !== 'add' && product) ? product.quantity: '');

  const handleCreate = () => {
    if (!name || !category || !description || !price || !quantity) {
      alert.error("Please fill in all the fields!");
      return;
    };
    const payload = {
      name, category, description, price, quantity
    }
    createProduct && createProduct(payload);
  }

  const handleEdit = () => {
    if (!name || !category || !description || !price || !quantity) {
      alert.error("Please fill in all the fields!");
      return;
    };
    const payload = {
      name, category, description, price, quantity
    }
    editProduct && editProduct(product.id, payload);
  }

  return (
    <Container>
      <InputField>
        <label>Name*</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          readOnly={type === 'view'}
          required
        />
      </InputField>
      <InputField>
        <label>Category*</label>
        <input 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          readOnly={type === 'view'}
          required
        />
      </InputField>
      <InputField>
        <label>Price*</label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          readOnly={type === 'view'}
          required
        />
      </InputField>
      <InputField>
        <label>Quantity*</label>
        <input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          readOnly={type === 'view'}
          required
        />
      </InputField>
      <InputField>
        <label>Description*</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          readOnly={type === 'view'}
          required
        />
      </InputField>
      <ButtonContainer>
        {type === 'add' ? <CreateButton onClick={handleCreate}>
            Create
          </CreateButton> : null}
        {type === 'edit' ? <EditButton onClick={handleEdit}>
            Edit
          </EditButton> : null}
      </ButtonContainer>
    </Container>
  );
}