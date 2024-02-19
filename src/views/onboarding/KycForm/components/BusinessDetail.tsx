import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import type { BusinessDetails as BusinessDetailsType } from '../store'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { apiOnboardingStepTwo } from '@/services/onBoarding/onBoardingServices'
import ShowToast from '@/components/ui/Notification/ShowToast'
import { yupResolver } from '@hookform/resolvers/yup'
import businessDetailsSchema from '../../validation/businessDetailsValidationSchema'

type FormModel = BusinessDetailsType

type BusinessDetailsProps = {
    data: BusinessDetailsType
    onNextChange?: (values: FormModel, formName: string) => void
    onBackChange?: () => void
    currentStepStatus?: string
}

const BusinessDetail = ({
    data,
    onNextChange,
    onBackChange,
    currentStepStatus,
}: BusinessDetailsProps) => {
    const onNext = (values: FormModel) => {
        onNextChange?.(values, 'businessDetails')
    }

    const { handleSubmit, register,formState:{errors} } = useForm({resolver:yupResolver(businessDetailsSchema),
        defaultValues: {
            mainLineOfBusiness: data.mainLineOfBusiness,
            website: data.website,
            mobile: data.mobile,
            email: data.email,
            address: data.address,
            state: data.state,
            city: data.city,
            additionalMobile: data.additionalMobile,
            additionalEmail: data.additionalEmail,
            additionalAddress: data.additionalAddress,
            additionalState: data.additionalState,
            additionalCity: data.additionalCity,
        },
    })
    const [loading, setLoading] = useState<boolean | false>(false)

    const onBack = () => {
        onBackChange?.()
    }
    const onSubmit = (data: any) => {
        setLoading(true)
        apiOnboardingStepTwo(data)
            .then((res) => {
                onNext(data)
                ShowToast('success', 'Business Details Success fully saved')
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Business Detail</h3>
                <p>Basic information for an account opening</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Main DIV Inside the Form For Input */}
                <FormContainer>
                    {/* Main Line of Business Input */}
                    <div className="mb-4">
                        <label className="form-label mb-">
                            Main Line of Business:
                            <span className="text-red-600">*</span>
                        </label>
                        <Input
                            {...register('mainLineOfBusiness')}
                            placeholder="Enter Main Line of Business"
                            invalid={!!errors.mainLineOfBusiness}
                        />
                         <p className="text-red-600">
                            {errors.mainLineOfBusiness?.message?.toString()}
                        </p>
                    </div>
                    {/* Business Website / App / System Details */}
                    <div className="mb-4">
                        <label className="form-label mb-">
                            Website / App / System Details:
                            <span className="text-red-600">*</span>
                        </label>
                        <Input
                            {...register('website')}
                            placeholder="Website Url e.g www.example.com"
                            invalid={!!errors.website}
                        />
                         <p className="text-red-600">
                            {errors.website?.message?.toString()}
                        </p>
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        {/* Business Mobile Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Mobile #:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('mobile')}
                                placeholder="e.g 0300-4568978"
                                invalid={!!errors.mobile}
                            />
                             <p className="text-red-600">
                            {errors.mobile?.message?.toString()}
                        </p>
                        </div>
                        {/*Business Email Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Email:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('email')}
                                placeholder="e.g Fahad@gmail.com"
                                invalid={!!errors.email}
                            />
                             <p className="text-red-600">
                            {errors.email?.message?.toString()}
                        </p>
                        </div>
                    </div>
                    {/* Business Address Input */}
                    <div className="mb-4">
                        <label className="form-label mb-2">
                            Address:
                            <span className="text-red-600">*</span>
                        </label>
                        <Input
                            {...register('address')}
                            placeholder="Enter Your Street Address"
                            invalid={!!errors.address}
                        />
                         <p className="text-red-600">
                            {errors.address?.message?.toString()}
                        </p>
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        {/* business Province/State Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Province/State:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('state')}
                                placeholder="e.g Punjab"
                                invalid={!!errors.state}
                            />
                             <p className="text-red-600">
                            {errors.state?.message?.toString()}
                        </p>
                        </div>
                        {/* business City Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                City:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('city')}
                                placeholder="e.g Lahore"
                                invalid={!!errors.city}
                            />
                             <p className="text-red-600">
                            {errors.city?.message?.toString()}
                        </p>
                        </div>
                    </div>

                    {/* ------------------------------------- Certificate of Incorporation / NTN ------------------------------------------- */}
                    {/* Heading For Certificate of Incorporation / NTN */}
                    <div className="bg-gray-200 h-8 rounded-md font-bold ps-4 pt-1.5 text-md mb-2">
                        Additional Branches/Offices of Business
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        {/* Additional Branches/Offices Mobile Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Mobile #:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('additionalMobile')}
                                placeholder="e.g 0300-4568978"
                                invalid={!!errors.additionalMobile}
                            />
                             <p className="text-red-600">
                            {errors.additionalMobile?.message?.toString()}
                        </p>
                        </div>
                        {/* Additional Branches/Offices Email Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Email:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('additionalEmail')}
                                placeholder="e.g Fahad@gmail.com"
                                invalid={!!errors.additionalEmail}
                            />
                             <p className="text-red-600">
                            {errors.additionalEmail?.message?.toString()}
                        </p>
                        </div>
                    </div>
                    {/* Additional Branches/Offices Address Input */}
                    <div className="mb-4">
                        <label className="form-label mb-2">
                            Address:
                            <span className="text-red-600">*</span>
                        </label>
                        <Input
                            {...register('additionalAddress')}
                            placeholder="Enter Your Street Address"
                            invalid={!!errors.additionalAddress}
                        />
                         <p className="text-red-600">
                            {errors.additionalAddress?.message?.toString()}
                        </p>
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        {/* Additional Branches/Offices Province/State Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Province/State:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('additionalState')}
                                placeholder="e.g Punjab"
                                invalid={!!errors.additionalState}
                            />
                             <p className="text-red-600">
                            {errors.additionalState?.message?.toString()}
                        </p>
                        </div>
                        {/* Additional Branches/Offices City Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                City:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('additionalCity')}
                                placeholder="e.g Lahore"
                                invalid={!!errors.additionalCity}
                            />
                             <p className="text-red-600">
                            {errors.additionalCity?.message?.toString()}
                        </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-2">
                        <Button type="button" onClick={onBack}>
                            Back
                        </Button>
                        <Button loading={loading} variant="solid" type="submit">
                            {currentStepStatus === 'complete' ? 'Save' : 'Next'}
                        </Button>
                    </div>
                </FormContainer>
            </form>
        </>
    )
}

export default BusinessDetail
