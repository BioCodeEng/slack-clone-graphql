import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';

export const Container = styled.div`
  display: flex;
`;

export const FormContainer = styled.div`
  width: 300px;
  margin: auto;
  display: block;
`;


export const FormControlStyled = styled(FormControl)`
  &&{
    display: block;
    margin: 0 0 20px;
  }
`;
