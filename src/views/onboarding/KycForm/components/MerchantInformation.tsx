import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import DatePicker from '@/components/ui/DatePicker'
import Select from '@/components/ui/Select'
import { FormContainer } from '@/components/ui/Form'
import { typeOfOrganizationSelection } from '../constant/typeOfOrganization.selection'
import type { MerchantInformation as MerchantInformationType } from '../store'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { RiCloseCircleLine } from 'react-icons/ri'
import { useState } from 'react'
import { FcImageFile } from 'react-icons/fc'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    maxFutureDate,
    maxPastDate,
} from '../config/dateSelectionForCertificate.config'
import { Upload } from '@/components/ui'
import { beforeUploadNationalTax } from '../config/upload/nationalTaxUplaod'
import { beforeUploadMerchantLogo } from '../config/upload/merchantLogoUpload'
import Checkbox from '@/components/ui/Checkbox/Checkbox'
import { generateMerchantInfoSchema } from '../../validation/merchantInformationSchema'
import formatCNIC from '@/utils/formatCNIC'
import { apiOnboardingStepOne } from '@/services/onBoarding/onBoardingServices'
import ShowToast from '@/components/ui/Notification/ShowToast'
import { ConfirmDialog } from '@/components/shared'
import ConfirmToProceed from '../../Dialog/ConfirmToProcced'

type FormModel = MerchantInformationType

type MerchantInformationProps = {
    data: MerchantInformationType
    onNextChange?: (values: FormModel, formName: string) => void
    currentStepStatus?: string
}

const MerchantInformation = ({
    data,
    onNextChange,
    currentStepStatus,
}: MerchantInformationProps) => {
    const onNext = (values: FormModel) => {
        onNextChange?.(values, 'merchantInformation')
    }

    // ******************************* Declaration ****************************************//
    const [avatarImg, setAvatarImg] = useState<string | null>(null)
    const [saleCheckbox, setSaleCheckBox] = useState<boolean | false>(false)
    const [directorsCheckBox, setDirectorCheckBox] = useState<boolean | false>(
        false
    )
    const [cnic, setCNIC] = useState<string>('')
    const [loading, setLoading] = useState<boolean | false>(false)
    const [dialogIsOpen, setIsOpen] = useState(false)

    const {
        control,
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm<any>({
        resolver: yupResolver(
            generateMerchantInfoSchema(directorsCheckBox, saleCheckbox)
        ),
        defaultValues: {
            legalName: data.legalName,
            merchantBrandName: data.merchantBrandName,
            incorporationRegulatoryAuthorityName:
                data.incorporationRegulatoryAuthorityName,
            saleTaxRegulatoryAuthorityName: data.saleTaxRegulatoryAuthorityName,
            salesTaxRegistration: data.salesTaxRegistration,
            incorporationOrNtn: data.incorporationOrNtn,
            nationalTaxNumber: data.nationalTaxNumber,
            ceoName: data.ceoName,
            ceoCNIC: data.ceoCNIC,
            CeoMobile: data.CeoMobile,
            ceoEmail: data.ceoEmail,
            ceoAddress: data.legalName,
            ceoState: data.ceoState,
            ceoCity: data.ceoCity,
        },
    })
    const { fields, append, remove } = useFieldArray({
        control, // pass the control from useForm
        name: 'directors', // the name of the field array
    })

    const onFileUpload = (files: File[]) => {
        if (files.length > 0) {
            const uploadedFile = files[0] // Get the first file from the array
            const fileNameWithExtension = uploadedFile.name // Get the file name with its extension
            setAvatarImg(fileNameWithExtension) // Set the filename with extension to the state variable
        }
    }
    const onSubmit = (data: any) => {
        setLoading(true)
        apiOnboardingStepOne(data)
            .then((res) => {
                onNext(data)
                ShowToast('success', 'Merchant Information Success fully saved')
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleCNICChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value
        const formattedInput = formatCNIC(input)
        setCNIC(formattedInput)
    }

    return (
        <>
            <ConfirmToProceed
                dialogIsOpen={dialogIsOpen}
                setIsOpen={setIsOpen}
            />
            <div className="mb-8">
                <h3 className="mb-2">Merchant Information</h3>
                <p>Basic information for an account opening</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Main DIV Inside the Form For Input */}
                <FormContainer>
                    {/* <AddressField namePrefix='test' register={register} errors={{city:'t'}}/> */}
                    {/* Legal Name Input */}
                    <div className="mb-4">
                        <label className="form-label mb-2">
                            Legal Name:<span className="text-red-600">*</span>
                        </label>
                        <Input
                            {...register('legalName')}
                            type="text"
                            placeholder="Enter Your Legal Name"
                            invalid={!!errors.legalName}
                        />
                        <p className="text-red-600">
                            {errors.legalName?.message?.toString()}
                        </p>
                    </div>
                    {/*  Type of organization Selection */}
                    <div className="mb-4">
                        <label className="form-label mb-2">
                            Type of organization:{' '}
                            <span className="text-red-600">*</span>
                        </label>
                        <Select
                            //  {...register("typeOfOrganization")}
                            isSearchable
                            options={typeOfOrganizationSelection}
                        />
                        {/* <p className="text-red-600">
                            {errors.legalName?.message?.toString()}
                        </p> */}
                    </div>

                    {/* Merchant Brand Name Input */}
                    <div className="mb-4">
                        <label className="form-label mb-2">
                            Merchant Brand Name:
                        </label>
                        <Input
                            {...register('merchantBrandName')}
                            type="text"
                            placeholder="E.g Model public School"
                            invalid={!!errors.merchantBrandName}
                        />
                        <p className="text-red-600">
                            {errors.merchantBrandName?.message?.toString()}
                        </p>
                    </div>

                    {/* <div>
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
                    </div> */}

                    {/* ------------------------------------- Certificate of Incorporation / NTN ------------------------------------------- */}
                    {/* Heading For Certificate of Incorporation / NTN */}
                    <div className="bg-gray-200 h-8 rounded-md font-bold ps-4 pt-1.5 text-md mb-2">
                        Certificate of Incorporation / NTN
                    </div>
                    <div className="md:grid grid-cols-2 gap-4">
                        {/* NTN Number Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Incorporation/NTN #:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                                {...register('incorporationOrNtn')}
                                placeholder="Enter Your Incorporation/NTN #"
                                invalid={!!errors.incorporationOrNtn}
                            />
                            <p className="text-red-600">
                                {errors.incorporationOrNtn?.message?.toString()}
                            </p>
                        </div>

                        {/* Date For NTN Issue */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Incorporation/NTN Issue Date:
                                <span className="text-red-600">*</span>
                            </label>
                            <DatePicker
                                minDate={maxPastDate}
                                maxDate={maxFutureDate}
                                placeholder="Select Your Incorporation/NTN Date"
                            />
                        </div>
                    </div>
                    {/*  Regulatory Authority Name Input */}
                    <div className="mb-4">
                        <label className="form-label mb-2">
                            Regulatory Authority Name:
                            <span className="text-red-600">*</span>
                        </label>
                        <Input
                            {...register(
                                'incorporationRegulatoryAuthorityName'
                            )}
                            placeholder="Enter Your Regulatory Authority Name"
                            invalid={
                                !!errors.incorporationRegulatoryAuthorityName
                            }
                        />
                        <p className="text-red-600">
                            {errors.incorporationRegulatoryAuthorityName?.message?.toString()}
                        </p>
                    </div>

                    {/* <div>
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
                    </div> */}

                    <Checkbox
                        className="py-4"
                        onChange={() => setSaleCheckBox(!saleCheckbox)}
                    >
                        Add Sales Tax Registration
                    </Checkbox>

                    {saleCheckbox && (
                        <div>
                            <div className="bg-gray-200 h-8 rounded-md font-bold ps-4 pt-1.5 text-md mb-2">
                                Sales Tax Registration
                            </div>
                            <div className="md:grid grid-cols-2 gap-4">
                                {/*  Sales Tax Registration Number Input */}
                                <div className="mb-4">
                                    <label className="form-label mb-2">
                                        Sales Tax Registration #:
                                        <span className="text-red-600">*</span>
                                    </label>
                                    <Input
                                        {...register('salesTaxRegistration')}
                                        placeholder="Enter Sales Tax Registration #"
                                        invalid={!!errors.salesTaxRegistration}
                                    />
                                    <p className="text-red-600">
                                        {errors.salesTaxRegistration?.message?.toString()}
                                    </p>
                                </div>

                                {/* Date For Sales Tax Registration Issue */}
                                <div className="mb-4">
                                    <label className="form-label mb-2">
                                        Sales Tax Registration Issue Date:
                                        <span className="text-red-600">*</span>
                                    </label>
                                    <DatePicker
                                        minDate={maxPastDate}
                                        maxDate={maxFutureDate}
                                        placeholder="Select Your Sales Tax Registration Date"
                                    />
                                </div>
                            </div>
                            {/* Regulatory Authority Name Input */}
                            <div className="mb-4">
                                <label className="form-label mb-2">
                                    Regulatory Authority Name:
                                    <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    {...register(
                                        'saleTaxRegulatoryAuthorityName'
                                    )}
                                    placeholder="Enter Your Regulatory Authority Name"
                                    invalid={
                                        !!errors.saleTaxRegulatoryAuthorityName
                                    }
                                />
                                <p className="text-red-600">
                                    {errors.saleTaxRegulatoryAuthorityName?.message?.toString()}
                                </p>
                            </div>

                            {/* <div>
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
                            </div> */}
                        </div>
                    )}
                    {/* Heading National Tax Number */}
                    <div className="bg-gray-200 h-8 rounded-md font-bold ps-4 pt-1.5 text-md mb-2">
                        National Tax Number
                    </div>
                    {/* National Tax Number Input */}
                    <div className="mb-4">
                        <label className="form-label mb-2">
                            National Tax # / (NTN):
                            <span className="text-red-600">*</span>
                        </label>
                        <Input
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            type="number"
                            {...register('nationalTaxNumber')}
                            placeholder="Enter  National Tax #"
                            invalid={!!errors.nationalTaxNumber}
                        />
                        <p className="text-red-600">
                            {errors.nationalTaxNumber?.message?.toString()}
                        </p>
                    </div>
                    {/* <div>
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
                    </div> */}
                    {/* ------------------------------------- CEO/Owner/MD------------------------------------------- */}
                    {/* Heading For  CEO/Owner/MD */}
                    <div className="bg-gray-200 h-8 rounded-md font-bold ps-4 pt-1.5 text-md mb-2">
                        CEO/Owner/MD
                    </div>
                    <div className="md:grid grid-cols-2 gap-4">
                        {/* CEO/Owner/MD Name Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Name:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('ceoName')}
                                placeholder="Enter Full Name"
                                invalid={!!errors.ceoName}
                            />
                            <p className="text-red-600">
                                {errors.ceoName?.message?.toString()}
                            </p>
                        </div>
                        {/* CEO/Owner/MD CNIC # Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                CNIC #:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('ceoCNIC')}
                                value={cnic}
                                placeholder="e.g 31234-123456-7"
                                invalid={!!errors.ceoCNIC}
                                onChange={handleCNICChange}
                            />
                            <p className="text-red-600">
                                {errors.ceoCNIC?.message?.toString()}
                            </p>
                        </div>
                    </div>
                    <div className="md:grid grid-cols-2 gap-4">
                        {/* CEO/Owner/MD Mobile Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Mobile #:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                                {...register('CeoMobile')}
                                placeholder="e.g 0300-4568978"
                                maxlength="12"
                                invalid={!!errors.CeoMobile}
                            />
                            <p className="text-red-600">
                                {errors.CeoMobile?.message?.toString()}
                            </p>
                        </div>
                        {/* CEO/Owner/MD CNIC # Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">Email:</label>
                            <Input
                                {...register('ceoEmail')}
                                placeholder="e.g Fahad@gmail.com"
                                invalid={!!errors.ceoEmail}
                            />
                            <p className="text-red-600">
                                {errors.ceoEmail?.message?.toString()}
                            </p>
                        </div>
                    </div>
                    {/* Address Input */}
                    <div className="mb-4">
                        <label className="form-label mb-2">
                            Address:
                            <span className="text-red-600">*</span>
                        </label>
                        <Input
                            {...register('ceoAddress')}
                            placeholder="Enter Your Street Address"
                            invalid={!!errors.ceoAddress}
                        />
                        <p className="text-red-600">
                            {errors.ceoAddress?.message?.toString()}
                        </p>
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        {/* CEO/Owner/MD Province/State Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                Province/State:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('ceoState')}
                                placeholder="e.g Punjab"
                                invalid={!!errors.ceoState}
                            />
                            <p className="text-red-600">
                                {errors.ceoState?.message?.toString()}
                            </p>
                        </div>
                        {/* CEO/Owner/MD City # Input */}
                        <div className="mb-4">
                            <label className="form-label mb-2">
                                City:
                                <span className="text-red-600">*</span>
                            </label>
                            <Input
                                {...register('ceoCity')}
                                placeholder="e.g Lahore"
                                invalid={!!errors.ceoCity}
                            />
                            <p className="text-red-600">
                                {errors.ceoCity?.message?.toString()}
                            </p>
                        </div>
                    </div>
                    {/* ---------- Directors CheckBox -------------- */}
                    <Checkbox
                        className="py-4"
                        onChange={() => {
                            setDirectorCheckBox(!directorsCheckBox)
                            if (fields.length < 1) {
                                append({
                                    name: '',
                                    cnic: '',
                                    mobile: '',
                                    email: '',
                                    address: '',
                                    state: '',
                                    city: '',
                                })
                            }
                        }}
                    >
                        Add Directors
                    </Checkbox>
                    {directorsCheckBox && (
                        <div>
                            {/* -------------------------------------Director(s)------------------------------------------- */}
                            <div className="bg-gray-200 h-8 rounded-md font-bold ps-4 pt-1.5 text-md mb-4">
                                Director(s)
                            </div>

                            {/*___________________________________  Dynamic to Add Directors ___________________________________*/}
                            {fields.map((item, index) => (
                                <div key={item.id} className="mb-4">
                                    <div className="bg-blue-50 h-8 rounded-md font-bold ps-4 pt-1.5 text-md mb-2 mt-2 ">
                                        Director {index + 1}
                                    </div>
                                    <div className="md:grid grid-cols-2 gap-4">
                                        {/* ........ Director Full Name Input ........ */}
                                        <div className="mb-4">
                                            <label className="form-label mb-2">
                                                Full Name:
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </label>
                                            <Input
                                                {...register(
                                                    `directors[${index}].name`
                                                )}
                                                placeholder="Enter Full Name"
                                                invalid={
                                                    !!(
                                                        errors?.directors as any
                                                    )?.[index]?.name
                                                }
                                            />
                                            <p className="text-red-600">
                                                {
                                                    (
                                                        errors?.directors as any
                                                    )?.[index]?.name?.message
                                                }
                                            </p>
                                        </div>
                                        {/* ........ Director CNIC # Input ........ */}
                                        <div className="mb-4">
                                            <label className="form-label mb-2">
                                                CNIC #:
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </label>
                                            <Input
                                                {...register(
                                                    `directors[${index}].cnic`
                                                )}
                                                placeholder="e.g 31234-123456-7"
                                                invalid={
                                                    !!(
                                                        errors?.directors as any
                                                    )?.[index]?.cnic
                                                }
                                            />
                                            <p className="text-red-600">
                                                {
                                                    (
                                                        errors?.directors as any
                                                    )?.[index]?.cnic?.message
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="md:grid grid-cols-2 gap-4">
                                        {/* ........ Director Mobile Input ........ */}
                                        <div className="mb-4">
                                            <label className="form-label mb-2">
                                                Mobile #:
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </label>
                                            <Input
                                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                type="number"
                                                {...register(
                                                    `directors[${index}].mobile`
                                                )}
                                                placeholder="e.g 0300-4568978"
                                                invalid={
                                                    !!(
                                                        errors?.directors as any
                                                    )?.[index]?.mobile
                                                }
                                            />
                                            <p className="text-red-600">
                                                {
                                                    (
                                                        errors?.directors as any
                                                    )?.[index]?.mobile?.message
                                                }
                                            </p>
                                        </div>
                                        {/* ........ Director Email Input ........ */}
                                        <div className="mb-4">
                                            <label className="form-label mb-2">
                                                Email:
                                            </label>
                                            <Input
                                                {...register(
                                                    `directors[${index}].email`
                                                )}
                                                placeholder="e.g Fahad@gmail.com"
                                                invalid={
                                                    !!(
                                                        errors?.directors as any
                                                    )?.[index]?.email
                                                }
                                            />
                                            <p className="text-red-600">
                                                {
                                                    (
                                                        errors?.directors as any
                                                    )?.[index]?.email?.message
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    {/* ........ Director Address Input ........ */}
                                    <div className="mb-4">
                                        <label className="form-label mb-2">
                                            Address:
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            {...register(
                                                `directors[${index}].address`
                                            )}
                                            placeholder="Enter Your Street Address"
                                            invalid={
                                                !!(errors?.directors as any)?.[
                                                    index
                                                ]?.address
                                            }
                                        />
                                        <p className="text-red-600">
                                            {
                                                (errors?.directors as any)?.[
                                                    index
                                                ]?.address?.message
                                            }
                                        </p>
                                    </div>

                                    <div className="md:grid grid-cols-2 gap-4">
                                        {/* ........ Director Province/State Input ........ */}
                                        <div className="mb-4">
                                            <label className="form-label mb-2">
                                                Province/State:
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </label>
                                            <Input
                                                {...register(
                                                    `directors[${index}].state`
                                                )}
                                                placeholder="e.g Punjab"
                                                invalid={
                                                    !!(
                                                        errors?.directors as any
                                                    )?.[index]?.state
                                                }
                                            />
                                            <p className="text-red-600">
                                                {
                                                    (
                                                        errors?.directors as any
                                                    )?.[index]?.state?.message
                                                }
                                            </p>
                                        </div>
                                        {/* ........ Province/State City Input ........*/}
                                        <div className="mb-4">
                                            <label className="form-label mb-2">
                                                City:
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </label>
                                            <Input
                                                {...register(
                                                    `directors[${index}].city`
                                                )}
                                                placeholder="e.g Lahore"
                                                invalid={
                                                    !!(
                                                        errors?.directors as any
                                                    )?.[index]?.city
                                                }
                                            />
                                            <p className="text-red-600">
                                                {
                                                    (
                                                        errors?.directors as any
                                                    )?.[index]?.city?.message
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button
                                            shape="circle"
                                            size="xs"
                                            type="button"
                                            variant="plain"
                                            color="red-600"
                                            icon={
                                                <RiCloseCircleLine
                                                    size="sm"
                                                    className="text-red-600"
                                                />
                                            }
                                            onClick={() => remove(index)}
                                        />
                                    </div>
                                </div>
                            ))}
                            <Button
                                type="button"
                                onClick={() =>
                                    append({
                                        name: '',
                                        cnic: '',
                                        mobile: '',
                                        email: '',
                                        address: '',
                                        state: '',
                                        city: '',
                                    })
                                }
                            >
                                Add Director
                            </Button>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end gap-2">
                        <Button loading={loading} variant="solid" type="submit">
                            {currentStepStatus === 'complete' ? 'Save' : 'Next'}
                        </Button>
                    </div>
                </FormContainer>
            </form>
        </>
    )
}

export default MerchantInformation
