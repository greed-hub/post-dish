import styled from 'styled-components';

export const Container = styled.div`
  display: block;

`
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

`
export const Col = styled.div`
  display: block;

`

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  margin: 25px;

  @media screen and (max-width: 400px) {
    font-size: 40px;
  }

`
export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  margin-top: 100px;

  @media screen and (max-width: 400px) {
    font-size: 30px;
  }

`

export default styled.div`

  form {
    min-width: 400px;
    background: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  label {
    display: block;
    font-size: 1.5rem;
    line-height: 48px;
    margin-top: 5px;
  }

  span {
    display: block;
    font-size: 1rem;
    line-height: 24px;
    color: red;
  }

  input {
    padding: 10px;
    border: solid 2px;
    border-radius: 5px;
    width: 200px;
    margin: 5px;
    font-size: 16px;
  }


  select {
    padding: 10px;
    border: solid 2px;
    border-radius: 5px;
    width: 225px;
    margin: 5px;
    font-size: 16px;
  }

  button {
    padding: 8px 26px;
    margin-top: 30px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
    font-size: 1rem;
    background: linear-gradient(to left, #8761ED, #F58726);
    border-radius: 3px;
    border: 0;
    color: white;
  }

  button:disabled {
    padding: 8px 26px;
    margin-top: 30px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
    font-size: 1rem;
    background: lightgrey;
  }

  pre {
    min-width: 400px;
    margin: 100px;
    
    @media screen and (max-width: 400px) {
      font-size: 1.2rem;
    }
  }

  a {
    color: #3E2D6E;
    &:hover {
      color: #F58726;
    }
  }

  @media screen and (max-width: 400px) {
    min-width:300px;
    width: 100%;
  }

`