import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 50px;
  background-color: #004AD7;
`;

const LinkItem = styled(Link)`
  margin-left: 20px;
  align-items: center;
  color: #E7E7ED;
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  padding: 10px;

  &:hover {
    background: white;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

/* navigation bar for admin and customer */
export const Header = () => {
  return (
    <Container>
      <LinkItem to="/customer">Customer View</LinkItem>
      <LinkItem to="/admin">Admin View</LinkItem>
    </Container>
  );
};
