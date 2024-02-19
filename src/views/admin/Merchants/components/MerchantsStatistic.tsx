import { useEffect } from 'react'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import GrowShrinkTag from '@/components/shared/GrowShrinkTag'
import MediaSkeleton from '@/components/shared/loaders/MediaSkeleton'
import Loading from '@/components/shared/Loading'
import { getCustomerStatistic, useAppDispatch, useAppSelector } from '../store'
import {
    HiOutlineUserGroup,
    HiOutlineUserAdd,
    HiOutlineUsers,
} from 'react-icons/hi'
import { NumericFormat } from 'react-number-format'
import type { ReactNode } from 'react'
import { useParams } from 'react-router-dom'

type StatisticCardProps = {
    icon: ReactNode
    avatarClass: string
    label: string
    value?: number
    growthRate?: number
    loading: boolean
}

const StatisticCard = (props: StatisticCardProps) => {
    const { icon, avatarClass, label, value, growthRate, loading } = props

    const avatarSize = 55

    return (
        <Card bordered>
            <Loading
                loading={loading}
                customLoader={
                    <MediaSkeleton
                        avatarProps={{
                            className: 'rounded',
                            width: avatarSize,
                            height: avatarSize,
                        }}
                    />
                }
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar
                            className={avatarClass}
                            size={avatarSize}
                            icon={icon}
                        />
                        <div>
                            <span>{label}</span>
                            <h3>
                                <NumericFormat
                                    thousandSeparator
                                    displayType="text"
                                    value={value}
                                />
                            </h3>
                        </div>
                    </div>
                    <GrowShrinkTag value={growthRate} suffix="%" />
                </div>
            </Loading>
        </Card>
    )
}

const CustomerStatistic = () => {
    const dispatch = useAppDispatch()
    const { status } = useParams()

    const statisticData = useAppSelector(
        (state) => state.crmCustomers.data.statisticData
    )
    const loading = useAppSelector(
        (state) => state.crmCustomers.data.statisticLoading
    )

    useEffect(() => {
        dispatch(getCustomerStatistic())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            {status == 'all' && (
                <StatisticCard
                    icon={<HiOutlineUserGroup />}
                    avatarClass="!bg-indigo-600"
                    label="Total Merchants"
                    value={statisticData?.totalUsers}
                    // growthRate={statisticData?.totalCustomers?.growShrink}
                    loading={loading}
                />
            )}
            {status == 'all' || status == 'active' ? (
                <StatisticCard
                    icon={<HiOutlineUsers />}
                    avatarClass="!bg-blue-500"
                    label="Active Merchants"
                    value={statisticData?.active}
                    // growthRate={statisticData?.activeCustomers?.growShrink}
                    loading={loading}
                />
            ) : (
                <></>
            )}

            {status == 'all' || status == 'pending' ? (
                <StatisticCard
                    icon={<HiOutlineUserAdd />}
                    avatarClass="!bg-emerald-500"
                    label="Approval Pending"
                    value={statisticData?.pending}
                    // growthRate={statisticData?.newCustomers?.growShrink}
                    loading={loading}
                />
            ) : (
                <></>
            )}

            {status == 'all' || status == 'onboarding' ? (
                <StatisticCard
                    icon={<HiOutlineUserAdd />}
                    avatarClass="!bg-yellow-500"
                    label="In Process"
                    value={statisticData?.onboarding}
                    // growthRate={statisticData?.newCustomers?.growShrink}
                    loading={loading}
                />
            ) : (
                <></>
            )}

            {status == 'all' || status == 'rejected' ? (
                <StatisticCard
                    icon={<HiOutlineUserGroup />}
                    avatarClass="!bg-orange-600"
                    label="Rejected Merchants"
                    value={statisticData?.rejected}
                    // growthRate={statisticData?.totalCustomers?.growShrink}
                    loading={loading}
                />
            ) : (
                <></>
            )}

            {status == 'all' || status == 'blocked' ? (
                <StatisticCard
                    icon={<HiOutlineUsers />}
                    avatarClass="!bg-red-500"
                    label="Blocked/Inactive Merchants"
                    value={statisticData?.blocked}
                    // growthRate={statisticData?.activeCustomers?.growShrink}
                    loading={loading}
                />
            ) : (
                <></>
            )}
        </div>
    )
}

export default CustomerStatistic
