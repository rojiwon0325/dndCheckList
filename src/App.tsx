import React from 'react';
import { RecoilRoot } from 'recoil';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import ToDoScreen from './ToDoScreen';

function App() {
  return (
    <RecoilRoot>
      <Layout>
        <GlobalStyle />
        <ToDoScreen />
      </Layout>
    </RecoilRoot>
  );
}

export default App;

const Layout = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
`;

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
    font-size: 14px;
    padding: 0;
    margin: 0;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
  button, input{
    border: none;
    outline: 0;
    cursor: pointer;
    padding: 0;
    margin: 0;
    background-color: inherit;
  }
  img{
    -webkit-user-drag: none;
    user-select: none;
  }
`;