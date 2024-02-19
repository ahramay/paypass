import ApiService from "../ApiService";


export async function apiOnboardingStepOne(data: any) {
    return ApiService.fetchData<any>({
        url: '/onboarding/stepOne',
        method: 'put',
        data,
    })
}


export async function apiOnboardingStepTwo(data: any) {
    return ApiService.fetchData<any>({
        url: '/onboarding/stepTwo',
        method: 'put',
        data,
    })
}

export async function apiOnboardingStepThree(data: any) {
    return ApiService.fetchData<any>({
        url: '/onboarding/stepThree',
        method: 'put',
        data,
    })
}


export async function apiOnboardingStepFour(data: any) {
    return ApiService.fetchData<any>({
        url: '/onboarding/stepFour',
        method: 'put',
        data,
    })
}

export async function apiGetMerchantFormData<T>() {
    return ApiService.fetchData<T>({
        url: '/onboarding/merchant/form',
        method: 'get',
    })
}