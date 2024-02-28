import { lazy } from 'react'
import { ONBOARDING_PATH } from '@/constants/route.constant'
// import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const merchantDashboardRoute: Routes = [
    {
        key: 'merchant.add-voucher',
        path: `/add-voucher`,
        component: lazy(() => import('@/views/merchant/CreateVoucher')),
        authority: [],
       
       
    },
    {
        key: 'merchant.voucher',
        path: `/vouchers`,
        component: lazy(() => import('@/views/merchant/Voucher')),
        authority: [],
    },
    {
        key: 'merchant.merchantuser',
        path: `/merchantuser`,
        component: lazy(() => import('@/views/merchant/CreateMerchatUser')),
        authority: [],
       
       
    },
    {
        key: 'merchant.merchantuserlist',
        path: `/merchantuserlist`,
        component: lazy(() => import('@/views/merchant/merchantUser')),
        authority: [],
    },

   
]

export default merchantDashboardRoute
