import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apPutCrmCustomer,
} from '@/services/CrmService'
import type { TableQueries } from '@/@types/common'
import { apiGetAllMerchants, apiGetAllMerchantsStatistic } from '@/services/admin/merchantDetail/merchantDetailService'

export type Customer = {
    _id: string
    fullName: string
    email: string
    organizationName: string
    cnic: string
    phone: string
    status: string
    createdAt: string
    updatedAt: string
    // orderHistory: OrderHistory[]
    // paymentMethod: PaymentMethod[]
    // subscription: Subscription[]
}



type CustomerStatistic = {
    totalUsers: number
    active: number
    pending: number
    onboarding: number
    blocked: number
    rejected: number
}

type Filter = {
    status: string
}

type GetCrmCustomersResponse = {
    data: Customer[]
    total: number
}

type GetCrmCustomersStatisticResponse = CustomerStatistic

export type CustomersState = {
    loading: boolean
    statisticLoading: boolean
    customerList: Customer[]
    statisticData: Partial<CustomerStatistic>
    tableData: TableQueries
    filterData: Filter
    drawerOpen: boolean
    selectedCustomer: Partial<Customer>
}

export const SLICE_NAME = 'crmCustomers'

export const getCustomerStatistic = createAsyncThunk(
    `${SLICE_NAME}/getCustomerStatistic`,
    async () => {
        const response =
            await apiGetAllMerchantsStatistic<GetCrmCustomersStatisticResponse>()
        return response.data
    }
)

export const getCustomers = createAsyncThunk(
    `${SLICE_NAME}/getMerchants`,
    async (data: TableQueries & { filterData?: Filter }) => {
        // console.log("Before Request in Slice")
        // console.log(JSON.stringify(data))
        const response = await apiGetAllMerchants<
            GetCrmCustomersResponse,
            TableQueries
        >(data)
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'crmCustomers/data/putCustomer',
    async (data: Customer) => {
        const response = await apPutCrmCustomer(data)
        return response.data
    }
)

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    status: '',
}

const initialState: CustomersState = {
    loading: false,
    statisticLoading: false,
    customerList: [],
    statisticData: {},
    tableData: initialTableData,
    filterData: initialFilterData,
    drawerOpen: false,
    selectedCustomer: {},
}

const customersSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCustomerList: (state, action) => {
            state.customerList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload
        },
        setDrawerOpen: (state) => {
            state.drawerOpen = true
        },
        setDrawerClose: (state) => {
            state.drawerOpen = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomers.fulfilled, (state, action) => {
                state.customerList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getCustomers.pending, (state) => {
                state.loading = true
            })
            .addCase(getCustomerStatistic.fulfilled, (state, action) => {
                state.statisticData = action.payload
                state.statisticLoading = false
            })
            .addCase(getCustomerStatistic.pending, (state) => {
                state.statisticLoading = true
            })
    },
})

export const {
    setTableData,
    setCustomerList,
    setFilterData,
    setSelectedCustomer,
    setDrawerOpen,
    setDrawerClose,
} = customersSlice.actions

export default customersSlice.reducer
