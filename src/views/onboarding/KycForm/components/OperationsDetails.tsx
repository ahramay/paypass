import { useCallback, useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import * as Yup from 'yup'
import type { OperationsDetails } from '../store'
import { DatePicker, Upload } from '@/components/ui'
import { useForm } from 'react-hook-form'

import {
    maxFutureDate,
    maxPastDate,
} from '../config/dateSelectionForCertificate.config'
import { beforeUploadNationalTax } from '../config/upload/nationalTaxUplaod'
import { apiOnboardingStepThree } from '@/services/onBoarding/onBoardingServices'
import ShowToast from '@/components/ui/Notification/ShowToast'
import { yupResolver } from '@hookform/resolvers/yup'
import operationsDetailsSchema from '../../validation/operationDetailsValidationSchema'
import formatCNIC from '@/utils/formatCNIC'

type FormModel = OperationsDetails

type OperationsDetailsProps = {
    data: OperationsDetails
    onNextChange?: (values: FormModel, formName: string) => void
    onBackChange?: () => void
    currentStepStatus?: string
}

const OperationsDetails = ({
    data,
    onNextChange,
    onBackChange,
    currentStepStatus,
}: OperationsDetailsProps) => {
    const [avatarImg, setAvatarImg] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean | false>(false)
    const [primaryPOCCnic, setPrimaryPOCCnic] = useState<string>('')
    const [secondaryPOCCnic, setSecondaryPOCCnic] = useState<string>('')
    const [agreementDetailsCnic, setAgreementDetailsCnic] = useState<string>('')
    const [declarationCnic, setDeclarationCnic] = useState<string>('')

    const onNext = (values: FormModel) => {
        onNextChange?.(values, 'operationsDetails')
    }

    const onBack = () => {
        onBackChange?.()
    }

    const onFileUpload = (files: File[]) => {
        if (files.length > 0) {
            const uploadedFile = files[0] // Get the first file from the array
            const fileNameWithExtension = uploadedFile.name // Get the file name with its extension
            setAvatarImg(fileNameWithExtension) // Set the filename with extension to the state variable
        }
    }

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(operationsDetailsSchema),
        defaultValues: {
            primaryPOCName: data.primaryPOCName,
            primaryPOCMobile: data.primaryPOCMobile,
            primaryPOCEmail: data.primaryPOCEmail,
            primaryPOCCnic: data.primaryPOCCnic,
            primaryPOCDesignation: data.primaryPOCDesignation,
            secondaryPOCName: data.secondaryPOCName,
            secondaryPOCMobile: data.secondaryPOCMobile,
            secondaryPOCEmail: data.secondaryPOCEmail,
            secondaryPOCCnic: data.secondaryPOCCnic,
            secondaryPOCDesignation: data.secondaryPOCDesignation,
            agreementDetailsNameOfSignee: data.agreementDetailsNameOfSignee,
            agreementDetailsCnic: data.agreementDetailsCnic,
            agreementDetailsDesignation: data.agreementDetailsDesignation,
            agreementDetailsEmail: data.agreementDetailsEmail,
            agreementDetailsMobile: data.agreementDetailsMobile,
            agreementDetailsPlaceOfExecution:
                data.agreementDetailsPlaceOfExecution,
            declarationNameOfSignee: data.declarationNameOfSignee,
            declarationCnic: data.declarationCnic,
            declarationDesignation: data.declarationDesignation,
            declarationEmail: data.declarationEmail,
            declarationMobile: data.declarationMobile,
            declarationPlaceOfExecution: data.declarationPlaceOfExecution,
        },
    })

    const onSubmit = (data: any) => {
        setLoading(true)
        apiOnboardingStepThree(data)
            .then((res) => {
                onNext(data)
                ShowToast('success', 'Operation Details Success fully saved')
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
                <h3 className="mb-2">Operations Details</h3>
                <p>
                    Enter your Operations Details help us to speed up the
                    verification process.
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Main DIV Inside the Form For Input */}
                <FormContainer>
                    {/* ------------------------------------- Primary POC ------------------------------------------- */}
                    {/* Heading For Primary POC */}
                    <div className="bg-blue-100 h-8 rounded-md font-bold ps-4 pt-1.5 text-md mb-2">
                        Primary POC
                    </div>
                    {/* Primary POC Name Input */}
                    <div className="mb-4">
                        <label className="form-label mb-">
                            Name:
                            <span className="text-red-600">*</span>
                        </label>
                        <Input
                            {...register('primaryPOCName')}
                            placeholder="Enter Your Primary POC Name"
                            invalid={!!errors.primaryPOCName}
                        />
                        <p className="text-red-600">
                            {errors.primaryPOCName?.message?.toString()}
                        </p>
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        {/* Primary POC Mobile Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Mobile #:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                                {...register('primaryPOCMobile')}
                                placeholder="e.g 0300-4568978"
                                invalid={!!errors.primaryPOCMobile}
                            />
                            <p className="text-red-600">
                                {errors.primaryPOCMobile?.message?.toString()}
                            </p>
                        </div>
                        {/* Primary POC Email # Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Email:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('primaryPOCEmail')}
                                placeholder="e.g email@domain.com"
                                invalid={!!errors.primaryPOCEmail}
                            />
                            <p className="text-red-600">
                                {errors.primaryPOCEmail?.message?.toString()}
                            </p>
                        </div>
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        {/* Primary POC CNIC Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                CNIC #:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                value={primaryPOCCnic}
                                {...register('primaryPOCCnic')}
                                placeholder="e.g 31234-123456-7"
                                invalid={!!errors.primaryPOCCnic}
                                onChange={(e) =>
                                    setPrimaryPOCCnic(
                                        formatCNIC(e.target.value)
                                    )
                                }
                            />
                            <p className="text-red-600">
                                {errors.primaryPOCCnic?.message?.toString()}
                            </p>
                        </div>
                        {/* Primary POC Designation Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Designation:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('primaryPOCDesignation')}
                                placeholder="Enter Your Primary POC Designation"
                                invalid={!!errors.primaryPOCDesignation}
                            />
                            <p className="text-red-600">
                                {errors.primaryPOCDesignation?.message?.toString()}
                            </p>
                        </div>
                    </div>

                    {/* ------------------------------------- Secondary POC ------------------------------------------- */}
                    {/* Heading For Secondary POC */}
                    <div className="bg-blue-100 h-8 rounded-md font-bold ps-4 pt-1.5 text-md mb-2">
                        Secondary POC
                    </div>

                    {/* Secondary POC Name Input */}
                    <div className="mb-4">
                        <label className="form-label mb-">
                            Name:
                            <span className="text-red-600">*</span>
                        </label>
                        <Input
                            {...register('secondaryPOCName')}
                            placeholder="Enter Your Secondary POC Name"
                            invalid={!!errors.secondaryPOCName}
                        />
                        <p className="text-red-600">
                            {errors.secondaryPOCName?.message?.toString()}
                        </p>
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        {/* Secondary POC Mobile Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Mobile #:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                                {...register('secondaryPOCMobile')}
                                placeholder="e.g 0300-4568978"
                                invalid={!!errors.secondaryPOCMobile}
                            />
                            <p className="text-red-600">
                                {errors.secondaryPOCMobile?.message?.toString()}
                            </p>
                        </div>
                        {/* Secondary POC Email # Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Email:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('secondaryPOCEmail')}
                                placeholder="e.g email@domain.com"
                                invalid={!!errors.secondaryPOCEmail}
                            />
                            <p className="text-red-600">
                                {errors.secondaryPOCEmail?.message?.toString()}
                            </p>
                        </div>
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        {/* Secondary POC CNIC Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                CNIC #:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                value={secondaryPOCCnic}
                                {...register('secondaryPOCCnic')}
                                placeholder="e.g 31234-123456-7"
                                invalid={!!errors.secondaryPOCCnic}
                                onChange={(e) =>
                                    setSecondaryPOCCnic(
                                        formatCNIC(e.target.value)
                                    )
                                }
                            />
                            <p className="text-red-600">
                                {errors.secondaryPOCCnic?.message?.toString()}
                            </p>
                        </div>
                        {/* Secondary POC Designation Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Designation:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('secondaryPOCDesignation')}
                                placeholder="Enter Your Secondary POC Designation"
                                invalid={!!errors.secondaryPOCDesignation}
                            />
                            <p className="text-red-600">
                                {errors.secondaryPOCDesignation?.message?.toString()}
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-200 h-8 rounded-md font-bold ps-4 pt-1.5 text-md mb-2">
                        Agreement Details
                    </div>
                    {/* Agreement Details  Name of the Signee Input */}
                    <div className="mb-4">
                        <label className="form-label mb-">
                            Name of the Signee:
                            <span className="text-red-600">*</span>
                        </label>
                        <Input
                            {...register('agreementDetailsNameOfSignee')}
                            placeholder="Enter Name of the Signee"
                            invalid={!!errors.agreementDetailsNameOfSignee}
                        />
                        <p className="text-red-600">
                            {errors.agreementDetailsNameOfSignee?.message?.toString()}
                        </p>
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        {/* Agreement Details CNIC Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                CNIC #:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                value={agreementDetailsCnic}
                                {...register('agreementDetailsCnic')}
                                placeholder="e.g 31234-123456-7"
                                invalid={!!errors.agreementDetailsCnic}
                                onChange={(e) =>
                                    setAgreementDetailsCnic(
                                        formatCNIC(e.target.value)
                                    )
                                }
                            />
                            <p className="text-red-600">
                                {errors.agreementDetailsCnic?.message?.toString()}
                            </p>
                        </div>
                        {/* Agreement Details Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Designation:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('agreementDetailsDesignation')}
                                placeholder="Enter Designation For Agreement"
                                invalid={!!errors.agreementDetailsDesignation}
                            />
                            <p className="text-red-600">
                                {errors.agreementDetailsDesignation?.message?.toString()}
                            </p>
                        </div>
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        {/* Agreement Details Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Email #:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('agreementDetailsEmail')}
                                placeholder="e.g email@domain.com"
                                invalid={!!errors.agreementDetailsEmail}
                            />
                            <p className="text-red-600">
                                {errors.agreementDetailsEmail?.message?.toString()}
                            </p>
                        </div>
                        {/* Agreement Details Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Mobile:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                                {...register('agreementDetailsMobile')}
                                placeholder="e.g 0300-12345678"
                                invalid={!!errors.agreementDetailsMobile}
                            />
                            <p className="text-red-600">
                                {errors.agreementDetailsMobile?.message?.toString()}
                            </p>
                        </div>
                    </div>
                    <div className="md:grid grid-cols-2 gap-4">
                        {/* Agreement Details Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Dated:
                                <span className="text-red-600">*</span>
                            </label>
                            <DatePicker
                                minDate={maxPastDate}
                                maxDate={maxFutureDate}
                                placeholder="Select Your  Date"
                            />
                        </div>
                        {/* Agreement Details Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Place of execution (City Name):
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register(
                                    'agreementDetailsPlaceOfExecution'
                                )}
                                placeholder="Enter Place of Execution for Agreement"
                                invalid={
                                    !!errors.agreementDetailsPlaceOfExecution
                                }
                            />
                            <p className="text-red-600">
                                {errors.agreementDetailsPlaceOfExecution?.message?.toString()}
                            </p>
                        </div>
                    </div>
                    {/* <div>
                        <label className="form-label mb-2">
                            Agreement Evidence:
                            <span className="text-red-600">*</span>
                        </label>
                        <Upload
                            draggable
                            beforeUpload={beforeUploadNationalTax}
                            onChange={onFileUpload}
                        >
                            {avatarImg ? (
                                <p>{avatarImg as string}</p>
                            ) : (
                                <div className="my-2 text-center">
                                    <p className="font-semibold">
                                        <span className="text-gray-800 dark:text-white">
                                            Drop your File here, or{' '}
                                        </span>
                                        <span className="text-blue-500">
                                            browse
                                        </span>
                                    </p>
                                    <p className="mt-1 opacity-60 dark:text-white">
                                        Support: jpeg, png, pdf
                                    </p>
                                </div>
                            )}
                        </Upload>
                    </div> */}

                    <div className="bg-gray-200 h-8 rounded-md font-bold ps-4 pt-1.5 text-md mb-2">
                        Declaration
                    </div>
                    {/* Declaration Input */}
                    <div className="mb-4">
                        <label className="form-label mb-">
                            Name of the Signee:
                            <span className="text-red-600">*</span>
                        </label>
                        <Input
                            {...register('declarationNameOfSignee')}
                            placeholder="Enter Name of Signee for Declaration"
                            invalid={!!errors.declarationNameOfSignee}
                        />
                        <p className="text-red-600">
                            {errors.declarationNameOfSignee?.message?.toString()}
                        </p>
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        {/* Declaration Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                CNIC #:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                value={declarationCnic}
                                {...register('declarationCnic')}
                                placeholder="e.g  34225-1234567-8"
                                invalid={!!errors.declarationCnic}
                                onChange={(e) =>
                                    setDeclarationCnic(
                                        formatCNIC(e.target.value)
                                    )
                                }
                            />
                            <p className="text-red-600">
                                {errors.declarationCnic?.message?.toString()}
                            </p>
                        </div>
                        {/* Declaration Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Designation:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('declarationDesignation')}
                                placeholder="Enter Designation for Declaration"
                                invalid={!!errors.declarationDesignation}
                            />
                            <p className="text-red-600">
                                {errors.declarationDesignation?.message?.toString()}
                            </p>
                        </div>
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        {/* Declaration Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Email #:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('declarationEmail')}
                                placeholder="e.g email@domain.com"
                                invalid={!!errors.declarationEmail}
                            />
                            <p className="text-red-600">
                                {errors.declarationEmail?.message?.toString()}
                            </p>
                        </div>
                        {/* Declaration Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Mobile:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                                {...register('declarationMobile')}
                                placeholder="e.g 030012345678"
                                invalid={!!errors.declarationMobile}
                            />
                            <p className="text-red-600">
                                {errors.declarationMobile?.message?.toString()}
                            </p>
                        </div>
                    </div>
                    <div className="md:grid grid-cols-2 gap-4">
                        {/* Declaration Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Dated:
                                <span className="text-red-600">*</span>
                            </label>
                            <DatePicker
                                minDate={maxPastDate}
                                maxDate={maxFutureDate}
                                placeholder="Select Your NTN Date"
                            />
                        </div>
                        {/* Declaration Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Place of execution (City Name):
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('declarationPlaceOfExecution')}
                                placeholder="Enter Place of Execution for Declaration"
                                invalid={!!errors.declarationPlaceOfExecution}
                            />
                            <p className="text-red-600">
                                {errors.declarationPlaceOfExecution?.message?.toString()}
                            </p>
                        </div>
                    </div>
                    {/* <div>
                        <label className="form-label mb-2">
                            Declarations Evidence:
                            <span className="text-red-600">*</span>
                        </label>
                        <Upload
                            draggable
                            beforeUpload={beforeUploadNationalTax}
                            onChange={onFileUpload}
                        >
                            {avatarImg ? (
                                <p>{avatarImg as string}</p>
                            ) : (
                                <div className="my-2 text-center">
                                    <p className="font-semibold">
                                        <span className="text-gray-800 dark:text-white">
                                            Drop your File here, or{' '}
                                        </span>
                                        <span className="text-blue-500">
                                            browse
                                        </span>
                                    </p>
                                    <p className="mt-1 opacity-60 dark:text-white">
                                        Support: jpeg, png, pdf
                                    </p>
                                </div>
                            )}
                        </Upload>
                    </div> */}
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

export default OperationsDetails
