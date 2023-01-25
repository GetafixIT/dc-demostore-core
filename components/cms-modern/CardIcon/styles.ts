import styled from "@emotion/styled";

export const CardIconWrapper = styled.div`
  box-sizing: border-box;
  max-width: 24%;
  margin: 20px 4px 20px 4px;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 20%), inset 0 0 2px 0 rgb(0 0 0 / 10%);
  
  &:nth-of-type(1){
    margin-left: 0;
  }
  
  &:last-of-type{
    margin-right: 0;
  }
  
  .amp-dc-image{
    width: 56px;
    margin: 0 auto;
  }
  
  h2{
    color: #092a5e;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    font-family: 'Montserrat',sans-serif;
    margin-top: 15px;
    margin-bottom: 15px;
    text-transform: uppercase;
    line-height: 1.2;
    letter-spacing: -0.00833em;
  }
  
  p{
    text-align: center;
  }

  button{
    background: ${({color}) => color};
    border: 1px solid ${({color}) => color};
    border-radius: 4px;
    padding: 8px;
  }
  
`;
