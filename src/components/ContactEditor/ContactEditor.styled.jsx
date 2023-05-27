import styled from '@emotion/styled';
import { Form, Field } from 'formik';

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: 100%;
`;

export const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;

  font-size: 14px;

`;

export const FieldWrapper = styled(Field)`
  
    height: 36px;
    font-size: 24px;

`;
