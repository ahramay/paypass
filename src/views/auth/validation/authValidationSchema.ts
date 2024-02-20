import { ISignUpForm, SignInCredential } from '@/@types/Form/auth/auth'
import * as Yup from 'yup'

export const SignUpValidationSchema: Yup.ObjectSchema<ISignUpForm> =
    Yup.object().shape({
        email: Yup.string()
            .required('Please enter your email')
            .matches(
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Invalid email, should be like testing@gmail.com'
            )
            .email('Invalid email'),
        password: Yup.string()
            .required('Please enter your password')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|;:'",.<>?/\\[\]\-]).{8,}$/,
                'Invalid password, should be like Asfv@123'
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
            .required('Confirm Password is required'),
        fullName: Yup.string().required('Please enter your full name'),
        organizationName: Yup.string().required(
            'Please enter your organization name'
        ),
        cnic: Yup.string()
            .required('Please enter your CNIC')
            .test('no-leading-zero', 'CNIC cannot start with 0', (value) => {
                if (value && value.charAt(0) === '0') {
                    return false
                }
                return true
            })
            .matches(
                /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/,
                'Invalid CNIC format, should be like 12345-1234567-1'
            ),
        countryCode: Yup.string().required('Please select a country'),
        phone: Yup.string()
            .required('Please enter a phone number')
            .matches(/^\d{10}$/, 'Please enter a valid 10-digit phone number')
            .max(10)
            .min(10),
    })

export const SignInValidationSchema: Yup.ObjectSchema<SignInCredential> =
    Yup.object().shape({
        email: Yup.string()
            .required('Please enter your email')
            .matches(
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Invalid email, should be like testing@gmail.com'
            )
            .email('Invalid email'),
        password: Yup.string()
            .required('Please enter your password')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|;:'",.<>?/\\[\]\-]).{8,}$/,
                'Invalid password, should be like asfv@123'
            ),
    })
