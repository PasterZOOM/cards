import * as Yup from 'yup';

export const validateCreateAndEditPack = Yup.object().shape({
  namePack: Yup.string().required('Please enter name pack'),
});
