import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import onBoardingRoute from './onBoardRoute'
import pages from './pages/pagesRoute'
import merchantDashboardRoute from './merchant/dashBoard/merchantDashBoardRoutes'
import adminDashboardRoute from './admin/adminDashboardRoutes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    ...onBoardingRoute,
    ...pages,
    ...merchantDashboardRoute,
    ...adminDashboardRoute,
    {
        key: 'root',
        path: '/',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    /** Example purpose only, please remove */
   
]