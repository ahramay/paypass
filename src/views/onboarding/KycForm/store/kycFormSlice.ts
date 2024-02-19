import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAccountFormData } from '@/services/AccountServices'

export type MerchantInformation = {
    legalName: string
    merchantBrandName: string
    incorporationOrNtn: string
    saleTaxRegulatoryAuthorityName: string
    incorporationRegulatoryAuthorityName: string
    salesTaxRegistration: string
    nationalTaxNumber: string
    ceoName: string
    ceoCNIC: string
    CeoMobile: string
    ceoEmail: string
    ceoAddress: string
    ceoState: string
    ceoCity: string
    directors: {
        fullName: string
        cnic: string
        mobile: string
        email: string
        address: string
        state: string
        city: string
        name: string
    }[]
}

// Update BusinessDetails type
export type BusinessDetails = {
    mainLineOfBusiness: string
    website: string
    mobile: string
    email: string
    address: string
    state: string
    city: string
    additionalMobile: string
    additionalEmail: string
    additionalAddress: string
    additionalState: string
    additionalCity: string
}

// Update OperationsDetails type
export type OperationsDetails = {
    primaryPOCName: string
    primaryPOCMobile: string
    primaryPOCEmail: string
    primaryPOCCnic: string
    primaryPOCDesignation: string
    secondaryPOCName: string
    secondaryPOCMobile: string
    secondaryPOCEmail: string
    secondaryPOCCnic: string
    secondaryPOCDesignation: string
    agreementDetailsNameOfSignee: string
    agreementDetailsCnic: string
    agreementDetailsDesignation: string
    agreementDetailsEmail: string
    agreementDetailsMobile: string
    agreementDetailsPlaceOfExecution: string
    declarationNameOfSignee: string
    declarationCnic: string
    declarationDesignation: string
    declarationEmail: string
    declarationMobile: string
    declarationPlaceOfExecution: string
}

// Update BankDetails type
export type BankDetails = {
    bankName: string
    accountTitle: string
    accountNumber: string
    iban: string
    branchName: string
    branchCode: string
    branchCity: string
}

export type DocumentDetails = {
    bankName: string
    accountTitle: string
    accountNumber: string
    iban: string
    branchName: string
    branchCode: string
    branchCity: string
}

type FormData = {
    merchantInformation: MerchantInformation
    businessDetails: BusinessDetails
    operationsDetails: OperationsDetails
    bankDetails: BankDetails
    documentDetails: DocumentDetails
}

export type StepStatus = Record<number, { status: string }>

type GetAccountFormDataResponse = {
    formData: FormData
    formStatus: StepStatus
}

export type KycFormState = {
    formData: FormData
    stepStatus: StepStatus
    currentStep: number
}

export const SLICE_NAME = 'accountDetailForm'

export const getForm = createAsyncThunk(SLICE_NAME + '/getForm', async () => {
    const response = await apiGetAccountFormData<GetAccountFormDataResponse>()
    return response.data
})

export const initialState: KycFormState = {
    formData: {
        merchantInformation: {
            legalName: '',
            merchantBrandName: '',
            incorporationOrNtn: '',
            saleTaxRegulatoryAuthorityName: '',
            incorporationRegulatoryAuthorityName: '',
            salesTaxRegistration: '',
            nationalTaxNumber: '',
            ceoName: '',
            ceoCNIC: '',
            CeoMobile: '',
            ceoEmail: '',
            ceoAddress: '',
            ceoState: '',
            ceoCity: '',
            directors: [
                {
                    fullName: '',
                    cnic: '',
                    mobile: '',
                    email: '',
                    address: '',
                    state: '',
                    city: '',
                    name: '',
                },
            ],
        },
        businessDetails: {
            mainLineOfBusiness: '',
            website: '',
            mobile: '',
            email: '',
            address: '',
            state: '',
            city: '',
            additionalMobile: '',
            additionalEmail: '',
            additionalAddress: '',
            additionalState: '',
            additionalCity: '',
        },
        operationsDetails: {
            primaryPOCName: '',
            primaryPOCMobile: '',
            primaryPOCEmail: '',
            primaryPOCCnic: '',
            primaryPOCDesignation: '',
            secondaryPOCName: '',
            secondaryPOCMobile: '',
            secondaryPOCEmail: '',
            secondaryPOCCnic: '',
            secondaryPOCDesignation: '',
            agreementDetailsNameOfSignee: '',
            agreementDetailsCnic: '',
            agreementDetailsDesignation: '',
            agreementDetailsEmail: '',
            agreementDetailsMobile: '',
            agreementDetailsPlaceOfExecution: '',
            declarationNameOfSignee: '',
            declarationCnic: '',
            declarationDesignation: '',
            declarationEmail: '',
            declarationMobile: '',
            declarationPlaceOfExecution: '',
        },
        bankDetails: {
            bankName: '',
            accountTitle: '',
            accountNumber: '',
            iban: '',
            branchName: '',
            branchCode: '',
            branchCity: '',
        },
        documentDetails: {
            bankName: '',
            accountTitle: '',
            accountNumber: '',
            iban: '',
            branchName: '',
            branchCode: '',
            branchCity: '',
        },
    },
    stepStatus: {
        0: { status: 'pending' },
        1: { status: 'pending' },
        2: { status: 'pending' },
        3: { status: 'pending' },
        4: { status: 'pending' },
        5: { status: 'pending' },
    },
    currentStep: 0,
}

const kycFormSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload }
        },
        setStepStatus: (state, action) => {
            state.stepStatus = { ...state.stepStatus, ...action.payload }
        },
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getForm.fulfilled, (state, action) => {
            state.formData = action.payload.formData
            state.stepStatus = action.payload.formStatus
        })
    },
})

export const { setFormData, setStepStatus, setCurrentStep } =
    kycFormSlice.actions

export default kycFormSlice.reducer
