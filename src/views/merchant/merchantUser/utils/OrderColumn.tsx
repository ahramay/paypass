import { VoucherType } from "@/@types/merchant/Voucher/VoucherList/voucherListTypes"
import useThemeClass from "@/utils/hooks/useThemeClass"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export const OrderColumn = ({ row }: { row: VoucherType }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/app/sales/order-details/${row.voucherId}`)
    }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            onClick={onView}
        >
            {row.voucherId}
        </span>
    )
}