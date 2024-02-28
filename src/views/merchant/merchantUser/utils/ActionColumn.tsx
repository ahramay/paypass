import { useCallback } from "react"
import { setDeleteMode, setSelectedRow, useAppDispatch } from "../store"
import { MerchatUserType } from "@/@types/merchant/MerchatUser/merchatUserList/merchatUserListTypes"
import useThemeClass from "@/utils/hooks/useThemeClass"
import { useNavigate } from "react-router-dom"
import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi"
import { Tooltip } from "@/components/ui"

export const ActionColumn = ({ row }: { row: MerchatUserType }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onDelete = () => {
        dispatch(setDeleteMode('single'))
        dispatch(setSelectedRow([row.id]))
    }

    const onView = useCallback(() => {
        navigate(`/app/sales/order-details/${row.id}`)
    }, [navigate, row])

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye />
                </span>
            </Tooltip>
            <Tooltip title="Delete">
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onDelete}
                >
                    <HiOutlineTrash />
                </span>
            </Tooltip>
        </div>
    )
}