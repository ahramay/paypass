import ApiService from "@/services/ApiService"




export async function apiGetAllMerchants<T, U extends Record<string, unknown>>(
    data: U
) {
    console.log("in Service")
    console.log(data)
    return ApiService.fetchData<T>({
        url: '/admin/user/all-user',
        method: 'post',
        data,
    })
}

export async function apiGetAllMerchantsStatistic<T>() {
    return ApiService.fetchData<T>({
        url: '/admin/user/user-statistic-by-status',
        method: 'get',
    })
}
