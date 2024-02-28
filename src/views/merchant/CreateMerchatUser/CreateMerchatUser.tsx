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
import { apiAddNewMerchantUser } from '@/services/merchant/merchantUser'
import ShowToast from '@/components/ui/Notification/ShowToast'

const MerchantUser = () => {
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
        navigate('/merchantUser')
    }

    const onFormSubmit: SubmitHandler<any> = async (data) => {
        setLoading(true)
        apiAddNewMerchantUser(data)
            .then((res) => {
                setLoading(false)
                ShowToast('success', 'Success fully User Added')
                reset()
                console.log("Muser", data)
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
                    <h3>Create Merchant User</h3>
                    <p>You can create  Merchant User</p>
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
                                    First Name:<span className="text-red-600">*</span>
                                </label>
                                <Input
                                    {...register('firstName')}
                                    invalid={!!errors.firstName}
                                    placeholder="Enter Your  Merchant User First Name"
                                    type="text"
                                />
                                <p className="text-red-600">
                                    {errors.firstName?.message?.toString()}
                                </p>
                            </div>
                            {/* Amount Input */}
                            <div className="mb-4">
                                <label className="form-label mb-2">
                                    Last Name:
                                    <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    {...register('lastName')}
                                    invalid={!!errors.lastName}
                                    placeholder="Enter Your  Merchant User Last Name"
                                    type="text"
                                />
                                <p className="text-red-600">
                                    {errors.lastName?.message?.toString()}
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
                                    {...register('number')}
                                    invalid={!!errors.number}
                                    placeholder="Enter Your Customer Mobile #"
                                    type="number"
                                />
                                <p className="text-red-600">
                                    {errors.number?.message?.toString()}
                                </p>
                            </div>
                            {/* Customer Address Input */}
                            <div className="mb-4">
                                <label className="form-label mb-2">
                                    Address: (optional)
                                </label>
                                <Input
                                    {...register('address')}
                                    invalid={!!errors.address}
                                    placeholder="Enter Your Customer Address"
                                    type="text"
                                />
                                <p className="text-red-600">
                                    {errors.address?.message?.toString()}
                                </p>
                            </div>
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

export default MerchantUser
