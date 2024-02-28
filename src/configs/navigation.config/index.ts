import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'
import { ADMIN_ROLE, USER_ROLE } from '@/constants/roles.constant'

const ADMIN_AUTHORITY: string[] = []
const MERCHANT_AUTHORITY: string[] = []

const navigationConfig: NavigationTree[] = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    // ***********************************************************************/
    // Merchant navigation Menu

    {
        key: 'merchantMenu',
        path: '',
        title: 'Merchant',
        translateKey: 'nav.merchant.groupMenu',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: MERCHANT_AUTHORITY,
        subMenu: [
            {
                key: 'merchantMenu.add-voucher',
                path: '/add-voucher',
                title: 'Add Voucher',
                translateKey: 'nav.merchant.menu.voucher.add-voucher',
                icon: 'addVoucher',
                type: NAV_ITEM_TYPE_ITEM,
                authority: MERCHANT_AUTHORITY,
                subMenu: [],
            },
            {
                key: 'merchantMenu.vouchers',
                path: '/vouchers',
                title: 'Voucher List',
                translateKey: 'nav.merchant.menu.voucherList.voucherList',
                icon: 'voucherList',
                type: NAV_ITEM_TYPE_ITEM,
                authority: MERCHANT_AUTHORITY,
                subMenu: [],
            },
            {
                key: 'merchantMenu.merchantuser',
                path: '/merchantuser',
                title: 'merchant Client',
                translateKey: 'nav.merchant.menu.merchantUser.merchantUser',
                icon: 'voucherList',
                type: NAV_ITEM_TYPE_ITEM,
                authority: MERCHANT_AUTHORITY,
                subMenu: [],
            },
         
            {
                key: 'merchantMenu.merchantuserlist',
                path: '/merchantuserlist',
                title: 'merchant Client List',
                translateKey: 'nav.merchant.menu.merchantUserlist.merchantUserlist',
                icon: 'voucherList',
                type: NAV_ITEM_TYPE_ITEM,
                authority: MERCHANT_AUTHORITY,
                subMenu: [],
            },
            {
                key: 'merchantMenu.invoices',
                path: '/invoices',
                title: 'Invoices',
                translateKey: 'nav.merchant.menu.invoices.invoices',
                icon: 'invoices',
                type: NAV_ITEM_TYPE_ITEM,
                authority: MERCHANT_AUTHORITY,
                subMenu: [],
            },
            {
                key: 'merchantMenu.reports',
                path: '/reports',
                title: 'Reports',
                translateKey: 'nav.merchant.menu.reports.reports',
                icon: 'reports',
                type: NAV_ITEM_TYPE_ITEM,
                authority: MERCHANT_AUTHORITY,
                subMenu: [],
            },
            {
                key: 'merchant.Account',
                path: '',
                title: 'Account',
                translateKey: 'nav.merchant.menu.account.account',
                icon: 'account',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: MERCHANT_AUTHORITY,
                subMenu: [
                    {
                        key: 'groupMenu.collapse.item1343',
                        path: '/group-collapse-menu-item-view-1',
                        title: 'Menu item 1',
                        translateKey: 'nav.groupMenu.collapse.item1',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: MERCHANT_AUTHORITY,
                        subMenu: [],
                    },
                    {
                        key: 'groupMenu.collapse.item23453445',
                        path: '/group-collapse-menu-item-view-2',
                        title: 'Menu item 2',
                        translateKey: 'nav.groupMenu.collapse.item2',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: MERCHANT_AUTHORITY,
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'merchant.setting',
                path: '',
                title: 'Setting',
                translateKey: 'nav.merchant.menu.setting.setting',
                icon: 'setting',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: MERCHANT_AUTHORITY,
                subMenu: [
                    {
                        key: 'groupMenu.collapse.item1334',
                        path: '/group-collapse-menu-item-view-1',
                        title: 'Menu item 1',
                        translateKey: 'nav.groupMenu.collapse.item1',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: MERCHANT_AUTHORITY,
                        subMenu: [],
                    },
                    {
                        key: 'groupMenu.collapse.item2765',
                        path: '/group-collapse-menu-item-view-2',
                        title: 'Menu item 2',
                        translateKey: 'nav.groupMenu.collapse.item2',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: MERCHANT_AUTHORITY,
                        subMenu: [],
                    },
                ],
            },
        ],
    },

    // ***********************************************************************/
    // Admin navigation Menu
    {
        key: 'adminMenu',
        path: '',
        title: 'Admin Menu',
        translateKey: 'nav.admin.groupMenu',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: ADMIN_AUTHORITY,
        subMenu: [
            // Merchant Detail
            {
                key: 'adminMenu.merchantDetails',
                path: '',
                title: 'Merchant Detail',
                translateKey: 'nav.admin.merchant.merchantDetail',
                icon: 'merchantDetail',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: ADMIN_AUTHORITY,
                subMenu: [
                    {
                        key: 'adminMenu.merchantDetails.all-merchants',
                        path: '/merchants/all',
                        title: 'All Merchants',
                        translateKey: 'nav.groupMenu.collapse.item1',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: ADMIN_AUTHORITY,
                        subMenu: [],
                    },
                    {
                        key: 'adminMenu.merchantDetails.active',
                        path: '/merchants/active',
                        title: 'Active',
                        translateKey: 'nav.groupMenu.collapse.item2',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: ADMIN_AUTHORITY,
                        subMenu: [],
                    },
                    {
                        key: 'groupMenu.collapse.item22313',
                        path: '/merchants/pending',
                        title: 'Approval Pending',
                        translateKey: 'nav.groupMenu.collapse.item2',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: ADMIN_AUTHORITY,
                        subMenu: [],
                    },
                    {
                        key: 'groupMenu.collapse.item223423',
                        path: '/merchants/onboarding',
                        title: 'In Process / Onboarding',
                        translateKey: 'nav.groupMenu.collapse.item2',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: ADMIN_AUTHORITY,
                        subMenu: [],
                    },
                    {
                        key: 'groupMenu.collapse.item234232',
                        path: '/merchants/rejected',
                        title: 'Rejected',
                        translateKey: 'nav.groupMenu.collapse.item2',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: ADMIN_AUTHORITY,
                        subMenu: [],
                    },
                    {
                        key: 'groupMenu.collapse.item23423df2',
                        path: '/merchants/blocked',
                        title: 'Blocked / Inactive',
                        translateKey: 'nav.groupMenu.collapse.item2',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: ADMIN_AUTHORITY,
                        subMenu: [],
                    },
                    {
                        key: 'groupMenu.collapse.deleted',
                        path: '/merchants/deleted',
                        title: 'Deleted',
                        translateKey: 'nav.groupMenu.collapse.item2',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: ADMIN_AUTHORITY,
                        subMenu: [],
                    },
                ],
            },

            // Merchant Voucher

            {
                key: 'adminMenu.44534-Detail',
                path: '',
                title: 'Merchant Vouchers',
                translateKey: 'nav.admin.merchant.merchantDetails',
                icon: 'merchantVoucher',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: ADMIN_AUTHORITY,
                subMenu: [
                    {
                        key: 'groupMenu.collapse.item1346',
                        path: '/group-collapse-menu-item-view-1',
                        title: 'Menu item 1',
                        translateKey: 'nav.groupMenu.collapse.item1',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: ADMIN_AUTHORITY,
                        subMenu: [],
                    },
                    {
                        key: 'groupMenu.collapse.item25345',
                        path: '/group-collapse-menu-item-view-2',
                        title: 'Menu item 2',
                        translateKey: 'nav.groupMenu.collapse.item2',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: ADMIN_AUTHORITY,
                        subMenu: [],
                    },
                ],
            },
            // Reports
            {
                key: 'adminMenu.Merchant3432Detail',
                path: '',
                title: 'Reports',
                translateKey: 'nav.admin.merchant',
                icon: 'reports',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: ADMIN_AUTHORITY,
                subMenu: [
                    {
                        key: 'groupMenu.collapse.item1465',
                        path: '/group-collapse-menu-item-view-1',
                        title: 'Menu item 1',
                        translateKey: 'nav.groupMenu.collapse.item1',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: ADMIN_AUTHORITY,
                        subMenu: [],
                    },
                    {
                        key: 'groupMenu.collapse.item234534',
                        path: '/group-collapse-menu-item-view-2',
                        title: 'Menu item 2',
                        translateKey: 'nav.groupMenu.collapse.item2',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: ADMIN_AUTHORITY,
                        subMenu: [],
                    },
                ],
            },

            {
                key: 'merchantMenu.Monitoring',
                path: '/monitoring',
                title: 'Monitoring and Logs',
                translateKey: 'nav.admin.menu.monitoring',
                icon: 'monitoringAndLogging',
                type: NAV_ITEM_TYPE_ITEM,
                authority: MERCHANT_AUTHORITY,
                subMenu: [],
            },

            {
                key: 'merchantMenu.analytic',
                path: '/analytic',
                title: 'Analytics',
                translateKey: 'nav.admin.menu.analytic',
                icon: 'analytic',
                type: NAV_ITEM_TYPE_ITEM,
                authority: MERCHANT_AUTHORITY,
                subMenu: [],
            },

            // Setting
            {
                key: 'adminMenu.Merchant45334Detail',
                path: '',
                title: 'Setting',
                translateKey: 'nav.admin.merchant',
                icon: 'setting',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: ADMIN_AUTHORITY,
                subMenu: [
                    {
                        key: 'groupMenu.collapse.item13453',
                        path: '/group-collapse-menu-item-view-1',
                        title: 'Menu item 1',
                        translateKey: 'nav.groupMenu.collapse.item1',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: ADMIN_AUTHORITY,
                        subMenu: [],
                    },
                    {
                        key: 'groupMenu.collapse.item5345342',
                        path: '/group-collapse-menu-item-view-2',
                        title: 'Menu item 2',
                        translateKey: 'nav.groupMenu.collapse.item2',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: ADMIN_AUTHORITY,
                        subMenu: [],
                    },
                ],
            },
        ],
    },
]

export default navigationConfig
