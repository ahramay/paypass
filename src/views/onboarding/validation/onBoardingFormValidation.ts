import * as yup from 'yup';
import { BankDetail, BusinessDetail, Director, MerchantInfo, OperationDetail } from '../interface/onBoardingFormInterface';

// Define types for your data structures


// Merchant Information Schema
export const merchantInfoSchema = yup.object<MerchantInfo>({
  legalName: yup.string().required("Legal Name is Required"),
  merchantBrandName: yup.string().required(),
  NTN: yup.string().required(),
  ntnRegulatoryAuthorityName: yup.string().required("Regulatory Authority Name is Required"),
  saleTaxRegulatoryAuthorityName: yup.string().required("Regulatory Authority Name is Required"),
  salesTaxRegistration: yup.string().required(),
  nationalTaxNumber: yup.string().required(),
  CeoName: yup.string().required(),
  ceoCNIC: yup.string().matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/).required("CNIC must be in the format XXXXX-XXXXXXX-X"),
  CeoMobile: yup.string().matches(/^[0-9]{11}$/).required("Mobile number must be 11 digits"),
  ceoEmail: yup.string().email().required(),
  ceoAddress: yup.string().required(),
  ceoState: yup.string().required(),
  ceoCity: yup.string().required(),
  directors: yup.array().of(yup.object<Director>({
    fullName: yup.string().required("Director Name is Required"),
    cnic: yup.string().matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/).required("CNIC must be in the format XXXXX-XXXXXXX-X"),
    mobile: yup.string().matches(/^[0-9]{11}$/).required("Mobile number must be 11 digits"),
    email: yup.string().email().required("Email is Required"),
    address: yup.string().required("Address is Required"),
    state: yup.string().required("State is Required"),
    city: yup.string().required("City is Required"),
    name: yup.string().required("Name Is "),
  })).required(),
});

// Business Detail Schema
export const businessDetailSchema = yup.object<BusinessDetail>({
  mainLineOfBusiness: yup.string().required(),
  website: yup.string().url().required(),
  mobile: yup.string().matches(/^[0-9]{11}$/).required("Mobile number must be 11 digits"),
  email: yup.string().email().required(),
  address: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  additionalMobile: yup.string().matches(/^[0-9]{11}$/).required("Mobile number must be 11 digits"),
  additionalEmail: yup.string().email().required(),
  additionalAddress: yup.string().required(),
  additionalState: yup.string().required(),
  additionalCity: yup.string().required(),
});

// Operation Detail Schema
export const operationDetailSchema = yup.object<any>({
  primaryPOCName: yup.string().required(),
  primaryPOCMobile: yup.string().matches(/^[0-9]{11}$/).required("Mobile number must be 11 digits"),
  primaryPOCEmail: yup.string().email().required(),
  primaryPOCCnic: yup.string().matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/).required("CNIC must be in the format XXXXX-XXXXXXX-X"),
  primaryPOCDesignation: yup.string().required(),
  secondaryPOCName: yup.string().required(),
  secondaryPOCMobile: yup.string().matches(/^[0-9]{11}$/).required("Mobile number must be 11 digits"),
  secondaryPOCEmail: yup.string().email().required(),
  secondaryPOCCnic: yup.string().matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/).required("CNIC must be in the format XXXXX-XXXXXXX-X"),
  secondaryPOCDesignation: yup.string().required(),
  agreementDetailsNameOfSignee: yup.string().required(),
  agreementDetailsCnic: yup.string().matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/).required("CNIC must be in the format XXXXX-XXXXXXX-X"),
  agreementDetailsDesignation: yup.string().required(),
  agreementDetailsEmail: yup.string().email().required(),
  agreementDetailsMobile: yup.string().matches(/^[0-9]{11}$/).required("Mobile number must be 11 digits"),
  agreementDetailsPlaceOfExecution: yup.string().required(),
  declarationNameOfSignee: yup.string().required(),
  declarationCnic: yup.string().matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/).required("CNIC must be in the format XXXXX-XXXXXXX-X"),
  declarationDesignation: yup.string().required(),
  declarationEmail: yup.string().email().required(),
  declarationMobile: yup.string().matches(/^[0-9]{11}$/).required("Mobile number must be 11 digits"),
  declarationPlaceOfExecution: yup.string().required(),
});

// Bank Detail Schema
export const bankDetailSchema = yup.object<BankDetail>({
  bankName: yup.string().required(),
  accountTitle: yup.string().required(),
  accountNumber: yup.string().required(),
  iban: yup.string().required(),
  branchName: yup.string().required(),
  branchCode: yup.string().required(),
  branchCity: yup.string().required(),
});

