import ApiService from '@/services/ApiService'

// This api service to get all merchant vouchers
export async function apiGetMerchanttUser() {
    return ApiService.fetchData<any>({
        url: '/merchatuser/getmerchantuser',
        method: 'get',
    })
}

export async function apiAddNewMerchantUser(data: any) {
    return ApiService.fetchData<any>({
        url: '/merchatuser',
        method: 'post',
        data,
    })
}

export async function apiDeleteMerchantUser<T>(merchantUserId: any) {
    return ApiService.fetchData<T>({
        url: `/merchatuser/${merchantUserId}`,
        method: 'delete',
    })
}
