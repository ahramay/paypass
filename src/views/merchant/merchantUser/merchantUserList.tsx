import { useState, useEffect, useMemo } from 'react'
import Button from '@/components/ui/Button'
import DataTable from '@/components/shared/DataTable'
import axios from 'axios'
import type { ColumnDef, OnSortParam } from '@/components/shared/DataTable'
import { apiGetMerchanttUser } from '@/services/merchant/merchantUser'
import { MerchatUserType } from '@/@types/merchant/merchatUserList/merchatUserListTypes'
import { OrderColumn } from './utils/OrderColumn'
import { NumericFormat } from 'react-number-format'
import dayjs from 'dayjs'
import { PaymentMethodImage } from './utils/PaymentMethodImage'
import { Badge } from '@/components/ui'
import { orderStatusColor } from './utils/orderStatusColor'
import { ActionColumn } from './utils/ActionColumn'
import { AdaptableCard } from '@/components/shared'

const MerchantUser = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [tableData, setTableData] = useState<{
        pageIndex: number
        pageSize: number
        sort: {
            order: '' | 'asc' | 'desc'
            key: string | number
        }
        query: string
        total: number
    }>({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: {
            order: '',
            key: '',
        },
    })

    // console.log(id)
    const columns: ColumnDef<MerchatUserType>[] = useMemo(
        () => [
            {
                header: 'UserId',
                accessorKey: '_id',
            },
            {
                header: 'First Name',
                accessorKey: 'firstName',
            },
            {
                header: 'Last Name',
                accessorKey: 'lastName',
            },
            {
                header: 'email',
                accessorKey: 'email',
            },
            {
                header: 'number',
                accessorKey: 'number',
            },
            {
                header: 'address',
                accessorKey: 'address',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const { status } = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${
                                    status == 'unpaid'
                                        ? 'bg-amber-500'
                                        : status == 'paid'
                                        ? 'bg-emerald-500'
                                        : status == 'expired'
                                        ? 'bg-red-500'
                                        : ''
                                }`}
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${
                                    status == 'unpaid'
                                        ? 'text-amber-500'
                                        : status == 'paid'
                                        ? 'text-emerald-500'
                                        : status == 'expired'
                                        ? 'text-red-500'
                                        : ''
                                }`}
                            >
                                {status == 'unpaid'
                                    ? 'unpaid'
                                    : status == 'paid'
                                    ? 'paid'
                                    : status == 'expired'
                                    ? 'expired'
                                    : ''}
                            </span>
                        </div>
                    )
                },
            },

            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const handlePaginationChange = (pageIndex: number) => {
        setTableData((prevData) => ({ ...prevData, ...{ pageIndex } }))
    }

    const handleSelectChange = (pageSize: number) => {
        setTableData((prevData) => ({ ...prevData, ...{ pageSize } }))
    }

    const handleSort = ({ order, key }: OnSortParam) => {
        setTableData((prevData) => ({
            ...prevData,
            sort: { order, key },
        }))
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response = await apiGetMerchanttUser()
            console.log('Response------=----------=')
            console.log(response)
            if (response.data) {
                setData(response.data)
                setLoading(false)
                setTableData((prevData) => ({
                    ...prevData,
                    ...{ total: (response.data).length },
                }))
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableData.pageIndex, tableData.sort, tableData.pageSize])

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-8">Merchant Client List</h3>
                {/* <OrdersTableTools /> */}
            </div>
            <DataTable<MerchatUserType>
                columns={columns}
                data={data}
                loading={loading}
                pagingData={{
                    total: tableData.total,
                    pageIndex: tableData.pageIndex,
                    pageSize: tableData.pageSize,
                }}
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
            />
            {/* <OrderDeleteConfirmation /> */}
        </AdaptableCard>
    )
}

export default MerchantUser
