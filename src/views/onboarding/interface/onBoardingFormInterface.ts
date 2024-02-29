export interface Director {
    fullName: string
    cnic: string
    mobile: string
    email: string
    address: string
    state: string
    city: string
    name: string
}

export interface MerchantInfo {
    legalName: string
    merchantBrandName: string
    NTN: string
    regulatoryAuthorityName: string
    salesTaxRegistration: string
    nationalTaxNumber: string
    CeoName: string
    ceoCNIC: string
    CeoMobile: string
    ceoEmail: string
    ceoAddress: string
    ceoState: string
    ceoCity: string
    IncorporateNtnIssueDate: string
    directors: Director[]
}

export interface BusinessDetail {
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

export interface OperationDetail {
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

export interface BankDetail {
    bankName: string
    accountTitle: string
    accountNumber: string
    iban: string
    branchName: string
    branchCode: string
    branchCity: string
}
