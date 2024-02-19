import { useState, useEffect, useMemo } from 'react'
import Button from '@/components/ui/Button'
import DataTable from '@/components/shared/DataTable'
import axios from 'axios'
import type { ColumnDef, OnSortParam } from '@/components/shared/DataTable'
import { apiGetMerchantVoucher } from '@/services/merchant/voucher'
import { VoucherType } from '@/@types/merchant/Voucher/VoucherList/voucherListTypes'
import { OrderColumn } from './utils/OrderColumn'
import { NumericFormat } from 'react-number-format'
import dayjs from 'dayjs'
import { PaymentMethodImage } from './utils/PaymentMethodImage'
import { Badge } from '@/components/ui'
import { orderStatusColor } from './utils/orderStatusColor'
import { ActionColumn } from './utils/ActionColumn'
import { AdaptableCard } from '@/components/shared'

const Basic = () => {
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

    const columns: ColumnDef<VoucherType>[] = useMemo(
        () => [
            {
                header: 'Consumer #',
                accessorKey: 'voucherId',
                cell: (props) => <OrderColumn row={props.row.original} />,
            },

            {
                header: 'Name',
                accessorKey: 'name',
            },

            {
                header: 'Amount',
                accessorKey: 'amount',
                cell: (props) => {
                    const { amount } = props.row.original
                    return (
                        <NumericFormat
                            displayType="text"
                            value={(Math.round(amount * 100) / 100).toFixed(2)}
                            prefix={'Rs'}
                            thousandSeparator={true}
                        />
                    )
                },
            },

            {
                header: 'Due Date',
                accessorKey: 'dueDate',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>{dayjs(row.dueDate).format('DD/MM/YYYY')}</span>
                    )
                },
            },

            {
                header: 'Payment Date',
                accessorKey: 'dueDate',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>{dayjs(row.dueDate).format('DD/MM/YYYY')}</span>
                    )
                },
            },

            {
                header: 'Payment Method',
                accessorKey: 'paymentMethod',
                cell: (props) => {
                    const { paymentMethod } = props.row.original
                    return (
                        <span className="flex items-center">
                            <PaymentMethodImage
                                className="max-h-[20px]"
                                paymentMethod={paymentMethod}
                            />
                        </span>
                    )
                },
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
            const response = await apiGetMerchantVoucher()
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
                <h3 className="mb-4 lg:mb-8">Voucher List</h3>
                {/* <OrdersTableTools /> */}
            </div>
            <DataTable<VoucherType>
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

export default Basic
