import ApiService from '@/services/ApiService'

// This api service to get all merchant vouchers
export async function apiGetMerchantVoucher() {
    return ApiService.fetchData<any>({
        url: '/voucher/merchant-vouchers',
        method: 'get',
    })
}

export async function apiAddNewVoucher(data: any) {
    return ApiService.fetchData<any>({
        url: '/voucher',
        method: 'post',
        data,
    })
}

export async function apiDeleteMerchantVoucher<T>(voucherId: any) {
    return ApiService.fetchData<T>({
        url: `/voucher/${voucherId}`,
        method: 'delete',
    })
}
