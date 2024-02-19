import * as yup from 'yup';

const bankDetailsSchema = yup.object().shape({
  bankName: yup.string().required('Bank Name is required'),
  accountTitle: yup.string().required('Account Title is required'),
  accountNumber: yup.string().required('Account Number is required'),
  iban: yup.string().required('IBAN is required'),
  branchName: yup.string().required('Branch Name is required'),
  branchCode: yup.string().required('Branch Code is required'),
  branchCity: yup.string().required('Branch City is required'),
});

export default bankDetailsSchema;