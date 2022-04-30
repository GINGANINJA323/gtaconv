import * as React from 'react';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  display: grid;
  width: 100%;
  min-height: 100vh;
  grid-template-columns: 10% auto auto 10%;
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
  grid-column: 2 / span 2;
  flex-direction: column;
`;

const FooterRow = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  grid-column: 2 / span 2;
  grid-row: auto;
`;

const Content = styled.div`
  grid-row: 2;
  grid-column: ${props => props.col};
`;

const App = (): JSX.Element => {
  const [breadPrice, setBreadPrice] = React.useState(2.10);
  const [exchangeRate, setExchangeRate] = React.useState(91161.4);
  const [intConvValue, setIntConvValue] = React.useState(100);
  const [result, setResult] = React.useState(intConvValue * exchangeRate);
  const baseUrl = window.location.origin;

  const getConvValue = (pounds) => {
    return pounds * exchangeRate;
  }

  const getBreadPrice = async() => {
    await fetch(`${baseUrl}/api/bread`)
      .then((response) => response.json())
      .then((data) => {
        setBreadPrice(Number(data))
      })
      .catch(() => console.log('Error getting bread price'));
  }

  return (
    <ContainerDiv>
      <HeaderRow>
        <h1>
          {'GTA$ Converter'}
        </h1>
      </HeaderRow>
      <Content col={2}>
        <h2>{`The exchange rate of GTA$ is: $${exchangeRate}/£1.`}</h2>
        <p>{`At this rate, the price of bread (£2.10) is: $${breadPrice * exchangeRate} GTA$.`}</p>
        <p>{`The cost of a car at £13,000 is ${13000 * exchangeRate} GTA$.`}</p>
      </Content>
      <Content col={3}>
        <h2>{`Interactive Converter:`}</h2>
        <input
          type={'number'}
          value={intConvValue}
          onChange={e => setIntConvValue(Number(e.target.value))}
          min={0}
        />
        <p>{`...is ${getConvValue(intConvValue)} GTA$.`}</p>
      </Content>
      <FooterRow>
        <p>Created using <a target="_blank" rel="noopener noreferrer" href="https://reactjs.org/">ReactJS</a> and <a target="_blank" rel="noopener noreferrer" href="https://www.typescriptlang.org/">TypeScript</a>.</p>
        <p>Wanna see the code? Here's my <a target="_blank" rel="noopener noreferrer" href="https://github.com/GINGANINJA323/gtaconv">repo</a>.</p>
      </FooterRow>
    </ContainerDiv>
  );
};

export default App;