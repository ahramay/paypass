import * as yup from 'yup'

const businessDetailsSchema = yup.object().shape({
    mainLineOfBusiness: yup
        .string()
        .required('Main Line of Business is required'),
    website: yup.string().required('Website is required'),
    mobile: yup.string().required('Mobile is required'),
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    address: yup.string().required('Address is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    additionalMobile: yup
        .string()
        .required('Aditional mobile is required')
        .max(11,"Mobile number should be 11 digits long")
        .min(11,"Mobile number should be 11 digits long"),
    additionalEmail: yup
        .string()
        .required('Aditional email is required')
        .email('Invalid email format'),
    additionalAddress: yup.string().required('Aditional address is required'),
    additionalState: yup.string().required('Aditional state is required'),
    additionalCity: yup.string().required('Aditional city is required'),
})

export default businessDetailsSchema
