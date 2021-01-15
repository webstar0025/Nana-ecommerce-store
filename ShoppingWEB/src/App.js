import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';

import { AdminView, CustomerView } from './pages';
import { Header } from './components';
import { GlobalStyles } from './globalStyles';

const MainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
`;

function App() {

  return (
    <Router>
      <GlobalStyles />
      <Header />
      <MainContainer>
        <Switch>
          <Route path="/customer" component={CustomerView} />
          <Route path="/admin" component={AdminView} />
          <Redirect to="/customer" />
        </Switch>
      </MainContainer>
    </Router>
  );
}

export default App;
