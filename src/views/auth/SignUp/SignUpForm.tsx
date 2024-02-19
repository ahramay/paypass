import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'
import { Select } from '@/components/ui'
import InputGroup from '@/components/ui/InputGroup/InputGroup'
import { countryList } from '@/constants/countries.constant'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import formatCNIC from '@/utils/formatCNIC'
import { yupResolver } from '@hookform/resolvers/yup'
import { ISignUpForm } from '@/@types/Form/auth/auth'
import { apiSignUp } from '@/services/AuthService'
import useQuery from '@/utils/hooks/useQuery'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import appConfig from '@/configs/app.config'
import { useNavigate } from 'react-router-dom'
import ShowToast from '@/components/ui/Notification/ShowToast'
import { SignUpValidationSchema } from '../validation/authValidationSchema'

/*-----------------------------------------------------------*/
// Types and Interface Declaration
interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type Country = {
    label: string
    dialCode: string
    value: string
}
const SignUpForm = (props: SignUpFormProps) => {
    /*-----------------------------------------------------------*/
    // State Variable Declaration
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props
    const [selectedCountryCode, setSelectedCountryCode] =
        useState<Country | null>(null)
    const [cnic, setCNIC] = useState<string>('')
    const [loading, setLoading] = useState(false)

    /*--------------------------------------------------------------------------------*/
    // *****************
    // Hook Declaration
    const { signUp } = useAuth()
    const {
        register,
        setError,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ISignUpForm>({ resolver: yupResolver(SignUpValidationSchema) })
    // { resolver: yupResolver(SignUpValidationSchema) }
    const [message, setMessage] = useTimeOutMessage()
    const query = useQuery()
    const navigate = useNavigate()

    // *****************
    /*--------------------------------------------------------------------------------*/

    const onFormSubmit: SubmitHandler<ISignUpForm> = async (data) => {
        setLoading(true)
        apiSignUp(data)
            .then((res) => {
                setLoading(false)
                ShowToast('success', 'Success fully Registered')
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
            })
            .catch((error) => {
                setLoading(false)

                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    ShowToast('danger', 'Some Field required')
                    // Set the server-side validation errors in the form state
                    const serverErrors = error.response.data.errors
                    for (const field in serverErrors) {
                        setError(field as any, {
                            message: serverErrors[field],
                        })
                    }
                } else if (error.response && error.response.status === 409) {
                    ShowToast('warning', 'Email Already Registered')
                    setMessage('Email Already Register')
                } else {
                    setMessage('something Wrong')
                }
            })
    }
    const formatOptionLabel = ({ value, dialCode }: Country) => (
        <div>
            <span>({dialCode})</span>
        </div>
    )

    const handleCountryChange = (selected: Country | null) => {
        setSelectedCountryCode(selected)
        setValue('countryCode', selected?.dialCode || '')
    }

    const handleCNICChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value
        const formattedInput = formatCNIC(input)
        setCNIC(formattedInput)
    }

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value.slice(0, 10)
        setValue('phone', input)
    }

    return (
        <div className={className}>
            {/* <ToastContainer/> */}
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    {message}
                </Alert>
            )}
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div>
                    <div className="mb-4">
                        <label className="form-label mb-2">Full Name:</label>
                        <Input
                            {...register('fullName')}
                            invalid={!!errors.fullName}
                            placeholder="Enter Your Full Name"
                            type="text"
                        />
                        <p className="text-red-600">
                            {errors.fullName?.message?.toString()}
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="form-label mb-2">
                            Organization Name:
                        </label>
                        <Input
                            {...register('organizationName')}
                            invalid={!!errors.organizationName}
                            placeholder="Enter Your Organization"
                            type="text"
                        />
                        <p className="text-red-600">
                            {errors.organizationName?.message?.toString()}
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="form-label mb-2">CNIC #:</label>
                        <Input
                            {...register('cnic')}
                            value={cnic}
                            placeholder="e.g 31234-123456-7"
                            invalid={!!errors.cnic}
                            type="text"
                            onChange={handleCNICChange}
                        />
                        <p className="text-red-600">
                            {errors.cnic?.message?.toString()}
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="form-label mb-2">Phone #:</label>
                        <InputGroup>
                            <Select
                                isSearchable
                                {...register('countryCode')}
                                className="w-48"
                                options={countryList}
                                value={selectedCountryCode}
                                formatOptionLabel={formatOptionLabel}
                                onChange={handleCountryChange}
                            />
                            <Input
                                {...register('phone')}
                                placeholder="Enter Your Phone"
                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                                onInput={handlePhoneChange}
                            />
                        </InputGroup>
                        {/* {watch('countryCode') &&
                            !watch('countryCode').value && (
                                <span className="text-red-600">
                                    Please select a country
                                </span>
                            )} */}
                        <p className="text-red-600">
                            {errors.phone?.message?.toString() ||
                                errors.countryCode?.message?.toString()}
                        </p>
                    </div>

                    <div className="mb-4">
                        <label className="form-label mb-2">Email:</label>
                        <Input
                            {...register('email')}
                            invalid={!!errors.email}
                            placeholder="e.g example@domain.com"
                            type="email"
                        />
                        <p className="text-red-600">
                            {errors.email?.message?.toString()}
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="form-label mb-2">Password:</label>
                        <Input
                            {...register('password')}
                            invalid={!!errors.password}
                            placeholder="Enter Your Password"
                            type="password"
                        />
                        <p className="text-red-600">
                            {errors.password?.message?.toString()}
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="form-label mb-2">
                            Confirm Password:
                        </label>
                        <Input
                            {...register('confirmPassword')}
                            invalid={!!errors.confirmPassword}
                            placeholder="Enter Your Password Again"
                            type="password"
                        />
                        <p className="text-red-600">
                            {errors.confirmPassword?.message?.toString()}
                        </p>
                    </div>
                </div>
                <Button block loading={loading} variant="solid" type="submit">
                    Create Account
                </Button>
                <div className="mt-4 text-center mb-6">
                    <span>Already have an account? </span>
                    <ActionLink to={signInUrl}>Sign in</ActionLink>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm
