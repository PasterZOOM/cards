import * as Yup from 'yup';

export const validatePackModalForm = Yup.object().shape({
  packName: Yup.string().required('Please enter pack name'),
});
