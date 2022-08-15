import * as Yup from 'yup';

export const validateCardModalForm = Yup.object().shape({
  answer: Yup.string().required('Please enter answer'),
  question: Yup.string().required('Please enter question'),
});

export const validateCardModalFormImage = Yup.object().shape({
  /* answerImg: Yup.string().required('required'),
  questionImg: Yup.string().required('required'), */
});
