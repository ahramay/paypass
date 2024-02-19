import * as yup from 'yup';

const businessDetailsSchema = yup.object().shape({
  mainLineOfBusiness: yup.string().required('Main Line of Business is required'),
  website: yup.string().required('Website is required'),
  mobile: yup.string().required('Mobile is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  address: yup.string().required('Address is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  additionalMobile: yup.string(),
  additionalEmail: yup.string().email('Invalid email format'),
  additionalAddress: yup.string(),
  additionalState: yup.string(),
  additionalCity: yup.string(),
});

export default businessDetailsSchema;
