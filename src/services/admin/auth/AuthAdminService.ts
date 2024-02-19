import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
} from '@/@types/Form/auth/auth'
import ApiService from '@/services/ApiService'

export async function apiSignInAdmin(data: any) {
    return ApiService.fetchData<any>({
        url: '/admin/auth/login',
        method: 'post',
        data,
    })
}

// export async function apiSignUp(data: SignUpCredential) {
//     return ApiService.fetchData<SignUpResponse>({
//         url: '/auth/register',
//         method: 'post',
//         data,
//     })
// }

// export async function apiSignOut() {
//     return ApiService.fetchData({
//         url: '/sign-out',
//         method: 'post',
//     })
// }

// export async function apiForgotPassword(data: ForgotPassword) {
//     return ApiService.fetchData({
//         url: '/forgot-password',
//         method: 'post',
//         data,
//     })
// }

// export async function apiResetPassword(data: ResetPassword) {
//     return ApiService.fetchData({
//         url: '/reset-password',
//         method: 'post',
//         data,
//     })
// }
