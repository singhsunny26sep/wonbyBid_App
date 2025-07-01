import * as yup from 'yup';

export const craetePrivateContestMultiSchema = yup.object().shape({
  entryfee: yup.number().required("Entry fee is required").typeError('Input must be a number'),
  spots: yup.number().required("Spots is required").typeError('Input must be a number'),
  winners: yup.number().required("Winner is required").typeError('Input must be a number'),
  teammultiplelimit: yup.number().required("Limit is required").typeError('Input must be a number'),
  selectcategory: yup.object().required("category is required"),
  slotdateday: yup.string().required("date is required").typeError('Input must be a number'),
  

})

export const craetePrivateContestSingleSchema = yup.object().shape({
  entryfee: yup.number().required("Entry fee is required").typeError('Input must be a number'),
  spots: yup.number().required("Spots is required").typeError('Input must be a number'),
  winners: yup.number().required("Winner is required").typeError('Input must be a number'),
  selectcategory: yup.object().required("category is required"),
  slotdateday: yup.string().required("date is required").typeError('Input must be a number'),
  

})