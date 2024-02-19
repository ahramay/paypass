import * as yup from 'yup';

const operationsDetailsSchema = yup.object().shape({
  primaryPOCName: yup.string().required('Primary POC Name is required'),
  primaryPOCMobile: yup.string().required('Primary POC Mobile is required').min(10,"Mobile # at least 10 Number Required"),
  primaryPOCEmail: yup.string().email('Invalid email format').required('Primary POC Email is required'),
  primaryPOCCnic: yup.string().matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/, "Invalid CNIC format. It should be in the format XXXXX-XXXXXXX-X").required('Primary POC CNIC is required'),
  primaryPOCDesignation: yup.string().required('Primary POC Designation is required'),
  
  secondaryPOCName: yup.string(),
  secondaryPOCMobile: yup.string().min(10,"Mobile # at least 10 Number Required"),
  secondaryPOCEmail: yup.string().email('Invalid email format'),
  secondaryPOCCnic: yup.string().matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/, "Invalid CNIC format. It should be in the format XXXXX-XXXXXXX-X"),
  secondaryPOCDesignation: yup.string(),

  agreementDetailsNameOfSignee: yup.string().required('Name of Signee for Agreement is required'),
  agreementDetailsCnic: yup.string().required('CNIC for Agreement is required').matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/, "Invalid CNIC format. It should be in the format XXXXX-XXXXXXX-X"),
  agreementDetailsDesignation: yup.string().required('Designation for Agreement is required'),
  agreementDetailsEmail: yup.string().email('Invalid email format').required('Email for Agreement is required'),
  agreementDetailsMobile: yup.string().required('Mobile for Agreement is required').min(10,"Mobile # at least 10 Number Required"),
  agreementDetailsPlaceOfExecution: yup.string().required('Place of Execution for Agreement is required'),

  declarationNameOfSignee: yup.string().required('Name of Signee for Declaration is required'),
  declarationCnic: yup.string().matches(/^\d{5}-\d{7}-\d{1}$/, 'Invalid CNIC format').required('CNIC for Declaration is required'),
  declarationDesignation: yup.string().required('Designation for Declaration is required'),
  declarationEmail: yup.string().email('Invalid email format').required('Email for Declaration is required'),
  declarationMobile: yup.string().required('Mobile for Declaration is required').min(10,"Mobile # at least 10 Number Required"),
  declarationPlaceOfExecution: yup.string().required('Place of Execution for Declaration is required'),
});

export default operationsDetailsSchema;
