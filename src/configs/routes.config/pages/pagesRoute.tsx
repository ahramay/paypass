import { lazy } from 'react'
import { ONBOARDING_PATH } from '@/constants/route.constant'
// import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const pages: Routes = [
    {
        key: 'pages.accessDenied',
        path: `${ONBOARDING_PATH}/welcome`,
        component: lazy(() => import('@/views/onboarding/Welcome')),
        authority: ['onboarding'],
        meta: {
            layout: 'blank',
            footer: false,
        },
    },
]

export default pages
