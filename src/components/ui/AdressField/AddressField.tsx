import React from 'react'
import Input from '@/components/ui/Input'

interface AddressFieldProps {
    register?: any
    errors?: Record<string, any>
    namePrefix?:string
}
function toCamelCase(input: string): string {
    return input.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
  }
const AddressField: React.FC<AddressFieldProps> = ({ register,namePrefix='', errors }) => {
    const city = namePrefix != '' ? toCamelCase(`${namePrefix}-city`) : "city"
    const address =namePrefix != '' ? toCamelCase(`${namePrefix}-address`):"address"
    const state =namePrefix != '' ? toCamelCase(`${namePrefix}-state`): "state"

    const isAddressInvalid = errors ? errors[`address`] !== undefined : false
    const isProvinceInvalid = errors ? errors[`province`] !== undefined : false
    const isCityInvalid = errors ? errors[`city`] !== undefined : false

    return (
        <div>
            <div className="mb-4">
                <label className="form-label mb-2">
                    Address:
                    <span className="text-red-600">*</span>
                </label>
                <Input
                    type="text"
                    invalid={isAddressInvalid}
                    className="border rounded px-3 py-2 w-full"
                    placeholder="Enter Your Street Address"
                    {...register ? register(address) : {}} // Use the register function if available
                />
                {isAddressInvalid  && <p className="text-red-600">Address is Required</p>}
            </div>

            <div className="md:grid grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="form-label mb-2">
                        Province/State:
                        <span className="text-red-600">*</span>
                    </label>
                    <Input
                        type="text"
                        invalid={isProvinceInvalid}
                        className="border rounded px-3 py-2 w-full"
                        placeholder="e.g Punjab"
                        {...register ? register(state) : {}} // Use the register function if available
                    />
                    {isProvinceInvalid  && <p className="text-red-600">Province/State is Required</p>}
                </div>
                <div className="mb-4">
                    <label className="form-label mb-2">
                        City:
                        <span className="text-red-600">*</span>
                    </label>
                    <Input
                        type="text"
                        invalid={isCityInvalid}
                        className="border rounded px-3 py-2 w-full"
                        placeholder="e.g Lahore"
                        {...register ? register(city) : {}} // Use the register function if available
                    />

                    {isCityInvalid  && <p className="text-red-600">City is Required</p>}
                </div>
            </div>
        </div>
    )
}

export default AddressField
