import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Formik} from 'formik';

import {
  FormContainer,
  InputWrapper,
  FieldWrapper,
} from 'components/ContactEditor/ContactEditor.styled';
import { Button } from 'components/common.styled';
// import * as yup from 'yup';

const initValues = {
  name: '',
  number:'',
}

// const schema = yup.object().shape({
//   name: yup
//     .string()
//     .required()
//     .matches(
//       /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
//       "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//     ),
//   number: yup
//     .string()
//     .required()
//     .matches(
//       /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
//       'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
//     ),
// });




const ContactEditor = ({ onSubmit }) => {

   const handleSubmit = (values, actions) => {
     onSubmit(values)
       .then(result => {
         Notify.success(result);
       })
       .catch(({ message }) => Notify.failure(message));
     actions.resetForm();
   };

  return (
    <Formik
      initialValues={initValues}
      // validationSchema={schema}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {/* {({ errors, touched }) => ( */}
      <FormContainer>
        <InputWrapper>
          Name
          <FieldWrapper
            type="text"
            name="name"
            // value={name}
            // onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          {/* {errors.name && Notify.failure(errors.name)} */}
        </InputWrapper>

        <InputWrapper>
          Phone number
          <FieldWrapper
            type="tel"
            name="number"
            // value={number}
            // onChange={this.handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          {/* {errors.number && Notify.failure(errors.number)} */}
        </InputWrapper>

        <Button type="submit">Add contact</Button>
      </FormContainer>
      {/* )} */}
    </Formik>
  );
};



ContactEditor.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default ContactEditor;
