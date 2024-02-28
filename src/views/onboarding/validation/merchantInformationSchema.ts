import * as yup from 'yup';
import { Director, MerchantInfo } from '../interface/onBoardingFormInterface';

export const generateMerchantInfoSchema = (directorsCheckBox:boolean,saleCheckBox:boolean) => {
    let baseSchema = yup.object({
        legalName: yup.string().required("Legal Name is Required"),
        merchantBrandName: yup.string(),
        incorporationOrNtn: yup.string().required(" Incorporation/NTN Number is Required"),
        nationalTaxNumber: yup.string().required("National Tax Number (NTN) is Required"),
        incorporationRegulatoryAuthorityName: yup.string().required("Regulatory Authority Name is Required"),
        ceoName: yup.string().required("Ceo Name Is Required"),
        ceoCNIC: yup.string().required("CNIC is Required")
        .matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/, "Invalid CNIC format. It should be in the format XXXXX-XXXXXXX-X"),
        CeoMobile:  yup.string().required("Mobile number is Required")
        .min(10, "Mobile number must be at least 10 characters")
        .max(50, "Mobile number must not exceed 50 characters"),  
        ceoEmail: yup.string().email("Invalid Email"),
        ceoAddress: yup.string().required("Ceo Address is Required"),
        ceoState: yup.string().required("Ceo State is Required"),
        ceoCity: yup.string().required("Ceo City Is required"),
    });

    if (directorsCheckBox) {
      baseSchema = baseSchema.shape({
        directors: yup.array().of(yup.object({
            name: yup.string().required("Director Name is Required"),
            cnic: yup.string().required("CNIC is Required")
            .matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/, "Invalid CNIC format. It should be in the format XXXXX-XXXXXXX-X"),            
            mobile: yup.string().required("Mobile number is Required")
            .min(10, "Mobile number must be at least 10 characters")
            .max(50, "Mobile number must not exceed 50 characters"),         
            email: yup.string().email("Invalid Email"),
            address: yup.string().required("Address is Required"),
            state: yup.string().required("State is Required"),
            city: yup.string().required("City is Required"),
          })).required(),
      });
    }

    // Conditionally apply validation for salesTaxRegistration
  if (saleCheckBox) {
    baseSchema = baseSchema.shape({
        saleTaxRegulatoryAuthorityName: yup.string().required("Regulatory Authority Name is Required"),
        salesTaxRegistration: yup.string().required(),
    });
  }
  
    return baseSchema;
  };
  
  // Example usage
//   const directorsCheckBoxValue = true; // Replace this with the actual value of directorsCheckBox
//   const merchantInfoSchema = generateMerchantInfoSchema(directorsCheckBoxValue);
  