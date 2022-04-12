import * as React from 'react';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  display: grid;
  width: 100%;
  min-height: 100vh;
  grid-template-columns: 5% auto 5%;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 400;
  background-color: #1A1A1A;
  color: #FFFFFF;

  h1 {
    font-family: 'Titillium Web', sans-serif;
    font-weight: 600;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  text-align: center;
  grid-row: 1;
  grid-column: 2;
  flex-direction: column;
`;

const FooterRow = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  grid-column: 2;
  grid-row: auto;
`;

const App = (): JSX.Element => {
  const [breadPrice, setBreadPrice] = React.useState(0);
  const baseUrl = window.location.origin;

  const getBreadPrice = async() => {
    await fetch(`${baseUrl}/api/bread`)
      .then((response) => response.json())
      .then((data) => {
        setBreadPrice(Number(data))
      })
      .catch(() => console.log('Error getting bread price'));
  }

  console.log(breadPrice);

  return (
    <ContainerDiv>
      <HeaderRow>
        <h1>
          {'GTA$ Conversions'}
        </h1>
      </HeaderRow>
      <div>
        <button onClick={getBreadPrice}>{'Get Bread Price'}</button>
      </div>
      <FooterRow>
        <p>Created using <a target="_blank" rel="noopener noreferrer" href="https://reactjs.org/">ReactJS</a> and <a target="_blank" rel="noopener noreferrer" href="https://www.typescriptlang.org/">TypeScript</a>.</p>
        <p>Wanna see the code? Here's my <a target="_blank" rel="noopener noreferrer" href="https://github.com/GINGANINJA323/gtaconv">repo</a>.</p>
      </FooterRow>
    </ContainerDiv>
  );
};

export default App;