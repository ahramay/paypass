export interface ISignUpForm {
    email: string
    password: string
    confirmPassword: string
    fullName: string
    organizationName: string
    cnic: string
    countryCode: string
    phone: string
}
export type TSignUpForm = {
    email: string
    password: string
    confirmPassword: string
    fullName: string
    organizationName: string
    cnic: string
    countryCode: string
    phone: string
}
export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    token: string
    authority?: string[];
    user?: {
      name?: string;
      organizationName?: string;
      status?: string;
    };
    completedSteps?: number[];
    lastCompletedStep?: number;
    nextStepNumber?: number;
    totalSteps?: number;
}

export type SignUpResponse = {
    success: boolean
    message: string
}

export type SignUpCredential = TSignUpForm

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
