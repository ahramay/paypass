import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateSalesProduct } from '@/services/SalesService'
import { FormContainer } from '@/components/ui/Form'
import StickyFooter from '@/components/shared/StickyFooter'
import { Button, Input } from '@/components/ui'
import { AiOutlineSave } from 'react-icons/ai'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { apiAddNewVoucher } from '@/services/merchant/voucher'
import ShowToast from '@/components/ui/Notification/ShowToast'

const CreateVoucher = () => {
    // *********************************************************/
    // State Declaration
    const [loading, setLoading] = useState(false)

    // *********************************************************/
    // Hook Declaration
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm()

    // *********************************************************/
    // Utility Function

    // *********************************************************/
    // Handle Form
    const handleDiscard = () => {
        navigate('/vouchers')
    }

    const onFormSubmit: SubmitHandler<any> = async (data) => {
        setLoading(true)
        apiAddNewVoucher(data)
            .then((res) => {
                setLoading(false)
                ShowToast('success', 'Success fully Voucher Added')
                reset()
            })
            .catch((error) => {
                setLoading(false)

                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    ShowToast('danger', 'Some Field required')
                    // Set the server-side validation errors in the form state
                    const serverErrors = error.response.data.errors
                    for (const field in serverErrors) {
                        setError(field as any, {
                            message: serverErrors[field],
                        })
                    }
                } else {
                    ShowToast('warning', 'Some thing Wrong')
                }
            })
    }

    return (
        <>
            <div>
                <div className="mb-4 lg:mb-10">
                    <h3>Create Voucher</h3>
                    <p>You can create Voucher for your Customer</p>
                </div>
            </div>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                {/* -----------------------------------Section------------------------------------------------ */}
                {/* -----------------------------------Form--------------------------------------------------- */}
                <FormContainer>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2">
                            {/* Customer Name Input */}
                            <div className="mb-4">
                                <label className="form-label mb-2">
                                    Name:<span className="text-red-600">*</span>
                                </label>
                                <Input
                                    {...register('name')}
                                    invalid={!!errors.name}
                                    placeholder="Enter Your Customer Name"
                                    type="text"
                                />
                                <p className="text-red-600">
                                    {errors.name?.message?.toString()}
                                </p>
                            </div>
                            {/* Amount Input */}
                            <div className="mb-4">
                                <label className="form-label mb-2">
                                    Amount (in Rupees):
                                    <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    {...register('amount')}
                                    invalid={!!errors.amount}
                                    placeholder="Enter Your Amount to receive"
                                    type="number"
                                />
                                <p className="text-red-600">
                                    {errors.amount?.message?.toString()}
                                </p>
                            </div>
                            {/* Purpose of Payment */}
                            <div className="mb-4">
                                <label className="form-label mb-2">
                                    Purpose:
                                    <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    {...register('purpose')}
                                    invalid={!!errors.purpose}
                                    placeholder="Enter Your Amount to receive"
                                    type="text"
                                />
                                <p className="text-red-600">
                                    {errors.purpose?.message?.toString()}
                                </p>
                            </div>
                            {/* Customer Email Input */}
                            <div className="mb-4">
                                <label className="form-label mb-2">
                                    Email: (optional)
                                </label>
                                <Input
                                    {...register('email')}
                                    invalid={!!errors.email}
                                    placeholder="e.g example@domain.com"
                                    type="email"
                                />
                                <p className="text-red-600">
                                    {errors.email?.message?.toString()}
                                </p>
                            </div>
                            {/* Customer Phone Input */}
                            <div className="mb-4">
                                <label className="form-label mb-2">
                                    Mobile #: (optional)
                                </label>
                                <Input
                                    {...register('mobile')}
                                    invalid={!!errors.mobile}
                                    placeholder="Enter Your Customer Mobile #"
                                    type="number"
                                />
                                <p className="text-red-600">
                                    {errors.mobile?.message?.toString()}
                                </p>
                            </div>
                            {/* Personal Note */}
                            {/* <div className="mb-4">
                                <label className="form-label mb-2">
                                    Note: (optional)
                                </label>
                                <Input
                                    textArea
                                    {...register('mobile')}
                                    invalid={!!errors.purpose}
                                    placeholder="Enter Your Personal Note"
                                    type="text"
                                />
                                <p className="text-red-600">
                                    {errors.purpose?.message?.toString()}
                                </p>
                            </div> */}
                        </div>
                        <div className="lg:col-span-1"></div>
                    </div>
                    {/* -----------------------------------Section------------------------------------------------ */}
                    {/* -----------------------------------StickyFooter------------------------------------------- */}
                    <StickyFooter
                        className="-mx-8 px-8 flex items-center justify-between py-4"
                        stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    >
                        <div className="md:flex items-center">
                            <Button
                                size="md"
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                // icon={<AiOutlineSave />}
                                onClick={() => handleDiscard?.()}
                            >
                                Discard
                            </Button>
                            <Button
                                size="md"
                                variant="solid"
                                loading={loading}
                                // icon={<AiOutlineSave />}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </StickyFooter>
                </FormContainer>
            </form>
        </>
    )
}

export default CreateVoucher
