import { lazy } from 'react'
import { ONBOARDING_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'


const ADMIN_AUTHORITY: string[] = []
const adminDashboardRoute: Routes = [
    // {
    //     key: 'admin.all-merchants',
    //     path: `/all-merchants`,
    //     component: lazy(() => import('@/views/admin/Customers')),
    //     authority: ADMIN_AUTHORITY,
       
       
    // },
    {
        key: 'admin.nav.merchants',
        path: `/merchants/:status`,
        component: lazy(() => import('@/views/admin/Merchants')),
        authority: ADMIN_AUTHORITY,
       
       
    },
  

   
]

export default adminDashboardRoute
