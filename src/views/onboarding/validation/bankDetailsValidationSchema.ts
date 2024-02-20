import * as yup from 'yup'

const bankDetailsSchema = yup.object().shape({
    bankName: yup.string().required('Bank Name is required'),
    accountTitle: yup.string().required('Account Title is required'),
    accountNumber: yup.string().required('Account Number is required'),
    iban: yup
        .string()
        .required('IBAN is required')
        .matches(/^PK\d{2}[A-Za-z]{4}\d{16}$/, 'Invalid Iban Number')
        .max(24, 'Iban Number must be 24 digits long'),
    branchName: yup.string().required('Branch Name is required'),
    branchCode: yup.string().required('Branch Code is required').max(4).min(4),
    branchCity: yup.string().required('Branch City is required'),
    accountOpeningDate: yup.date().required('Account Opening Date is required'),
})

export default bankDetailsSchema
