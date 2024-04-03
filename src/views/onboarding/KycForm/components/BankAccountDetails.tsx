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
import { useState, useEffect } from 'react'
import { apiOnboardingStepFour } from '@/services/onBoarding/onBoardingServices'
import ShowToast from '@/components/ui/Notification/ShowToast'
import { yupResolver } from '@hookform/resolvers/yup'
import bankDetailsSchema from '../../validation/bankDetailsValidationSchema'
import MerchantInformationModal from './MerchantInformationModal'

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
    const [openModal, setOpenModal] = useState<boolean | false>(false)

    const { handleSubmit, register, setValue, getValues, formState } = useForm({
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
    const { errors } = formState

    const disableField = (fieldNames: (keyof FormModel)[]): boolean => {
        return fieldNames.some((fieldName) => !!errors[fieldName]) || loading
    }

    const handleSetValues = (
        field: keyof FormModel,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value.trim()
        setValue(field, value, {
            shouldValidate: true,
        })
    }

    const onSubmit = (data: any) => {
        setLoading(true)
        apiOnboardingStepFour(data)
            .then((res) => {
                handleOpenModal()
                // onNext(data)
                ShowToast('success', 'Bank Details Success fully saved')
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const handleCloseModal = () => {
        setOpenModal(false)
    }
    const handleOpenModal = () => {
        setOpenModal(true)
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
                            onChange={(e) => {
                                handleSetValues('bankName', e)
                            }}
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
                                onChange={(e) => {
                                    handleSetValues('accountTitle', e)
                                }}
                                disabled={
                                    disableField(['bankName']) ||
                                    getValues('bankName') == undefined ||
                                    getValues('bankName')?.length === 0
                                }
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
                                onChange={(e) => {
                                    handleSetValues('accountNumber', e)
                                }}
                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                                placeholder="e.g 3251-555584255-88"
                                invalid={!!errors.accountNumber}
                                disabled={
                                    disableField([
                                        'bankName',
                                        'accountTitle',
                                    ]) || getValues('accountTitle') == undefined
                                }
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
                            onChange={(e) => {
                                handleSetValues('iban', e)
                            }}
                            disabled={
                                disableField([
                                    'bankName',
                                    'accountTitle',
                                    'accountNumber',
                                ]) || getValues('accountNumber') == undefined
                            }
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
                                onChange={(e) => {
                                    handleSetValues('branchName', e)
                                }}
                                placeholder="Enter Your Branch Name"
                                invalid={!!errors.branchName}
                                disabled={
                                    disableField([
                                        'bankName',
                                        'accountTitle',
                                        'accountNumber',
                                        'iban',
                                    ]) || getValues('iban') == undefined
                                }
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
                                onChange={(e) => {
                                    handleSetValues('branchCode', e)
                                }}
                                disabled={
                                    disableField([
                                        'bankName',
                                        'accountTitle',
                                        'accountNumber',
                                        'iban',
                                        'branchName',
                                    ]) || getValues('branchName') == undefined
                                }
                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
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
                                disabled={
                                    disableField([
                                        'bankName',
                                        'accountTitle',
                                        'accountNumber',
                                        'iban',
                                        'branchName',
                                        'branchCode',
                                    ]) || getValues('branchCode') == undefined
                                }
                                placeholder="Enter Your Branch City"
                                invalid={!!errors.branchCity}
                                onChange={(e) => {
                                    handleSetValues('branchCity', e)
                                }}
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
                                disabled={
                                    disableField([
                                        'bankName',
                                        'accountTitle',
                                        'accountNumber',
                                        'iban',
                                        'branchName',
                                        'branchCode',
                                        'branchCity',
                                    ]) || getValues('branchCity') == undefined
                                }
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
            <MerchantInformationModal
                openModal={openModal}
                onRequestClose={handleCloseModal}
                BankDetails={getValues}
                onNextChange={onNextChange}
                // currentStepStatus={currentStepStatus}
            />
        </>
    )
}

export default BankDetails
