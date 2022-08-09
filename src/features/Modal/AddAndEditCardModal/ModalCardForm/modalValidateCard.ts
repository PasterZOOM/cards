import * as Yup from 'yup';

export const validateCreateAndEditCard = Yup.object().shape({
  answer: Yup.string().required('Please enter answer'),
  question: Yup.string().required('Please enter question'),
});
