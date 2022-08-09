import * as Yup from 'yup';

export const validateCreateAndEditPack = Yup.object().shape({
  packName: Yup.string().required('Please enter pack name'),
});
