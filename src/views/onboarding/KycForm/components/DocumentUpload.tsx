import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import type { BankDetails as BankDetailsType } from '../store'
import { DatePicker, Upload } from '@/components/ui'
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
import { beforeUploadMerchantLogo } from '../config/upload/merchantLogoUpload'
import { FcImageFile } from 'react-icons/fc'
import { beforeUploadNationalTax } from '../config/upload/nationalTaxUplaod'

type FormModel = BankDetailsType

type BankDetailsProps = {
    data: BankDetailsType
    onNextChange?: (values: FormModel, formName: string) => void
    onBackChange?: () => void
    currentStepStatus?: string
}

const DocumentUpload = ({
    data,
    onNextChange,
    onBackChange,
    currentStepStatus,
}: BankDetailsProps) => {
    const onNext = (values: FormModel) => {
        onNextChange?.(values, 'documentDetails')
    }

    const onBack = () => {
        onBackChange?.()
    }
    const [loading, setLoading] = useState<boolean | false>(false)
    const [avatarImg, setAvatarImg] = useState<string | null>(null)

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

    const onFileUpload = (files: File[]) => {
        if (files.length > 0) {
            const uploadedFile = files[0] // Get the first file from the array
            const fileNameWithExtension = uploadedFile.name // Get the file name with its extension
            setAvatarImg(fileNameWithExtension) // Set the filename with extension to the state variable
        }
    }
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Document Upload</h3>
                <p>
                    Fill in your financial information to help us speed up the
                    verication process.
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Main DIV Inside the Form For Input */}
                <FormContainer>
                    <div>
                        <label className="form-label mb-2">
                            Merchant Logo:
                        </label>
                        <Upload
                            draggable
                            beforeUpload={beforeUploadMerchantLogo}
                            onChange={onFileUpload}
                        >
                            {avatarImg ? (
                                <p>{avatarImg as string}</p>
                            ) : (
                                <div className="my-2 text-center">
                                    <div className="text-6xl mb-4 flex justify-center">
                                        <FcImageFile />
                                    </div>
                                    <p className="font-semibold">
                                        <span className="text-gray-800 dark:text-white">
                                            Drop your image here, or{' '}
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
                    </div>

                    <div>
                        <label className="form-label mb-2">
                            Incorporation Evidence:
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
                                            Drop your image here, or{' '}
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
                    </div>
                    <div>
                        <label className="form-label mb-2">
                            Incorporation Evidence Certificate:
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
                                            Drop your image here, or{' '}
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
                    </div>

                    <div>
                        <label className="form-label mb-2">
                            National Tax Certificate:
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
                                            Drop your image here, or{' '}
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
                    </div>

                    <div>
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
                    </div>
                    <div>
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
                    </div>


                    <div>
                        <label className="form-label mb-2">
                            CNIC Front Side:
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
                    </div>

                    <div>
                        <label className="form-label mb-2">
                            CNIC Back Side:
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

export default DocumentUpload
