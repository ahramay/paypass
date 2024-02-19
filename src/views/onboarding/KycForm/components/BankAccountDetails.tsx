import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import type { BankDetails as BankDetailsType } from '../store'
import { DatePicker } from '@/components/ui'
import {
    maxFutureDate,
    maxPastDate,
} from '../config/dateSelectionForCertificate.config'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { apiOnboardingStepFour } from '@/services/onBoarding/onBoardingServices'
import ShowToast from '@/components/ui/Notification/ShowToast'
import { yupResolver } from '@hookform/resolvers/yup'
import bankDetailsSchema from '../../validation/bankDetailsValidationSchema'

type FormModel = BankDetailsType

type BankDetailsProps = {
    data: BankDetailsType
    onNextChange?: (values: FormModel, formName: string) => void
    onBackChange?: () => void
    currentStepStatus?: string
}

const BankDetails = ({
    data,
    onNextChange,
    onBackChange,
    currentStepStatus,
}: BankDetailsProps) => {
    const onNext = (values: FormModel) => {
        onNextChange?.(values, 'bankDetails')
    }

    const onBack = () => {
        onBackChange?.()
    }
    const [loading, setLoading] = useState<boolean | false>(false)

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(bankDetailsSchema),
        defaultValues: {
            bankName: data.bankName,
            accountTitle: data.accountTitle,
            accountNumber: data.accountNumber,
            iban: data.iban,
            branchName: data.branchName,
            branchCode: data.branchCode,
            branchCity: data.branchCity,
        },
    })

    const onSubmit = (data: any) => {
        setLoading(true)
        apiOnboardingStepFour(data)
            .then((res) => {
                onNext(data)
                ShowToast('success', 'Bank Details Success fully saved')
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
                <h3 className="mb-2">Bank Account Details</h3>
                <p>
                    Fill in your financial information to help us speed up the
                    verication process.
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Main DIV Inside the Form For Input */}
                <FormContainer>
                    {/* Bank Name: Input */}
                    <div className="mb-4">
                        <label className="form-label mb-">
                            Bank Name:
                            <span className="text-red-600">*</span>
                        </label>
                        <Input
                            {...register('bankName')}
                            placeholder="Enter Your Bank Name"
                            invalid={!!errors.bankName}
                        />
                        <p className="text-red-600">
                            {errors.bankName?.message?.toString()}
                        </p>
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        {/* Account Title Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Account Title:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('accountTitle')}
                                placeholder="Aiza Khan"
                                invalid={!!errors.accountTitle}
                            />
                            <p className="text-red-600">
                                {errors.accountTitle?.message?.toString()}
                            </p>
                        </div>
                        {/* Account Number Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Account Number:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('accountNumber')}
                                placeholder="e.g 3251-555584255-88"
                                invalid={!!errors.accountNumber}
                            />
                            <p className="text-red-600">
                                {errors.accountNumber?.message?.toString()}
                            </p>
                        </div>
                    </div>

                    {/* IBAN Input */}
                    <div className="mb-4">
                        <label className="form-label mb-2">
                            IBAN:
                            <span className="text-red-600">*</span>
                        </label>
                        <Input
                            {...register('iban')}
                            placeholder="Enter your IBAN"
                            invalid={!!errors.iban}
                        />
                        <p className="text-red-600">
                            {errors.iban?.message?.toString()}
                        </p>
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        {/* Branch Name Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Branch Name:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('branchName')}
                                placeholder="Enter Your Branch Name"
                                invalid={!!errors.branchName}
                            />
                            <p className="text-red-600">
                                {errors.branchName?.message?.toString()}
                            </p>
                        </div>
                        {/* Branch Code Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Branch Code:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('branchCode')}
                                placeholder="Enter Your Branch Code"
                                invalid={!!errors.branchCode}
                            />
                            <p className="text-red-600">
                                {errors.branchCode?.message?.toString()}
                            </p>
                        </div>
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        {/* Branch City Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Branch City:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('branchCity')}
                                placeholder="Enter Your Branch City"
                                invalid={!!errors.branchCity}
                            />
                            <p className="text-red-600">
                                {errors.branchCity?.message?.toString()}
                            </p>
                        </div>
                        {/* Account Opening Date Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Account Opening Date:
                                <span className="text-red-600">*</span>
                            </label>
                            <DatePicker
                                minDate={maxPastDate}
                                maxDate={maxFutureDate}
                                inputFormat="DD/MM/YYYY"
                                placeholder="Select Your Account Opening Date"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-2">
                        <Button type="button" onClick={onBack}>
                            Back
                        </Button>
                        <Button loading={false} variant="solid" type="submit">
                            {currentStepStatus === 'complete' ? 'Save' : 'Next'}
                        </Button>
                    </div>
                </FormContainer>
            </form>
        </>
    )
}

export default BankDetails
