import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import Alert from '@/components/ui/Alert'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { SignInCredential } from '@/@types/Form/auth/auth'
import { apiSignIn } from '@/services/AuthService'
import ShowToast from '@/components/ui/Notification/ShowToast'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignInValidationSchema } from '../validation/authValidationSchema'
import { setUser, signInSuccess, useAppDispatch } from '@/store'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import appConfig from '@/configs/app.config'
import { useNavigate } from 'react-router-dom'
import useQuery from '@/utils/hooks/useQuery'

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean
    forgotPasswordUrl?: string
    signUpUrl?: string
}

const SignInForm = (props: SignInFormProps) => {
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        signUpUrl = '/sign-up',
    } = props
    /*-----------------------------------------------------------*/
    // State Variable Declaration
    const [loading, setLoading] = useState(false)

    /*--------------------------------------------------------------------------------*/
    // *****************
    // Hook Declaration
    const [message, setMessage] = useTimeOutMessage()
    const { signIn } = useAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const query = useQuery()

    const {
        register,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInCredential>({
        resolver: yupResolver(SignInValidationSchema),
    })

    const onFormSubmit: SubmitHandler<SignInCredential> = (data) => {
        setLoading(true)
        apiSignIn(data)
            .then((resp) => {
                const { token } = resp.data
                // Dispatch Sing In Success with Token
                dispatch(signInSuccess(token))
                // Dispatch User Data To setUser
                dispatch(
                    setUser({
                        authority: resp.data.user?.status
                            ? [resp.data.user.status]
                            : ['onboarding'],
                        user: {
                            name: resp.data.user?.name || '',
                            organizationName:
                                resp.data.user?.organizationName || '',
                            status: resp.data.user?.status || '',
                        },
                        completedSteps: resp.data.completedSteps || [],
                        lastCompletedStep: resp.data.lastCompletedStep || 0,
                        nextStepNumber: resp.data.nextStepNumber || 1,
                        totalSteps: resp.data.totalSteps || 4,
                    })
                )

                const redirectUrl = query.get(REDIRECT_URL_KEY)
                const userStatus = resp.data.user?.status
                let redirectTo = '/onboarding/kyc-form'
                if (userStatus == 'onboarding') {
                    redirectTo = '/onboarding/kyc-form'
                } else if (userStatus == 'pending') {
                    redirectTo = '/onboarding/kyc-form'
                } else if (userStatus == 'merchant') {
                    redirectTo = '/onboarding/kyc-form'
                }

                navigate(redirectUrl ? redirectUrl : redirectTo)
                ShowToast('success', 'Success Fully Sign in')
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    // Set the server-side validation errors in the form state
                    const serverErrors = error.response.data.errors
                    for (const field in serverErrors) {
                        setError(field as any, {
                            message: serverErrors[field],
                        })
                    }
                } else if (error.response && error.response.status === 403) {
                    ShowToast('warning', 'Invalid Email or Password')
                    setMessage('Invalid Email or Password')
                } else {
                    setMessage('something Wrong')
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className={className}>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <>{message}</>
                </Alert>
            )}
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div>
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
                    <div className="flex justify-between mb-6">
                        <Checkbox className="mb-0" name="rememberMe">
                            Remember Me
                        </Checkbox>

                        <ActionLink to={forgotPasswordUrl}>
                            Forgot Password?
                        </ActionLink>
                    </div>
                </div>
                <Button block loading={loading} variant="solid" type="submit">
                    Sign in
                </Button>
                <div className="mt-4 text-center">
                    <span>{`Don't have an account yet?`} </span>
                    <ActionLink to={signUpUrl}>Sign up</ActionLink>
                </div>
            </form>
        </div>
    )
}

export default SignInForm
