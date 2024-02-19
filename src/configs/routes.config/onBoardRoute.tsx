import { lazy } from 'react'
import { ONBOARDING_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const onBoardingRoute: Routes = [
    {
        key: 'onboarding.welcome',
        path: `${ONBOARDING_PATH}/welcome`,
        component: lazy(() => import('@/views/onboarding/Welcome')),
        authority: ['onboarding'],
        meta: {
            layout: 'blank',
            footer: false,
        },
       
    },
    {
        key: 'onboarding.kycForm',
        path: `${ONBOARDING_PATH}/kyc-form`,
        component: lazy(() => import('@/views/onboarding/KycForm')),
        authority: ['onboarding'],
        meta: {
            layout: 'simple',
            pageContainerType: 'contained',
            footer: false,
        },
       
    },
    {
        key: 'onboarding.accountReview',
        path: `${ONBOARDING_PATH}/account-review`,
        component: lazy(() => import('@/views/onboarding/KycForm/components/AccountReview')),
        authority: ['pending'],
        meta: {
            layout: 'simple',
            pageContainerType: 'contained',
            footer: false,
        },
       
    },
   
]

export default onBoardingRoute
