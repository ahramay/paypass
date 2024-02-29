import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal'
import { IoMdDownload } from 'react-icons/io'
import Button from '@/components/ui/Button'
import { apiOnboardingStepOne } from '@/services/onBoarding/onBoardingServices'
import type { MerchantInformation as MerchantInformationType } from '../store'
import ShowToast from '@/components/ui/Notification/ShowToast'
import DatePicker from '@/components/ui/DatePicker' // Import your DatePicker component

interface MerchantInformationModalProps {
    openModal: boolean
    onRequestClose: () => void
    FormData: () => {
        legalName: string
        merchantBrandName: string
        incorporationOrNtn: string
        ntnIssueDate: string
        incorporationRegulatoryAuthorityName: string
        saleTaxRegulatoryAuthorityName: string
        salesTaxRegistration: string
        nationalTaxNumber: string
        IncorporateNtnIssueDate: string
        typeOfOrganization: string
        ceoName: string
        ceoCNIC: string
        CeoMobile: string
        ceoEmail: string
        ceoAddress: string
        ceoState: string
        ceoCity: string
    }
    onNextChange?: (values: MerchantInformationType, formName: string) => void
    currentStepStatus?: string
}

const MerchantInformationModal: React.FC<MerchantInformationModalProps> = ({
    openModal,
    onRequestClose,
    FormData,
    onNextChange,
    currentStepStatus,
}) => {
    const [loading, setLoading] = useState<boolean | false>(false)
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '20px',
            padding: '30px',
            maxHeight: '90%',
            width: '600px',
        },
    }

    const onNext = (values: MerchantInformationType) => {
        onNextChange?.(values, 'merchantInformation')
    }

    const userData = FormData()

    const submitData = async (data: any) => {
        setLoading(true)
        try {
            await apiOnboardingStepOne(data)
            onNext(data)
            ShowToast('success', 'Merchant Information successfully saved')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <ReactModal style={customStyles} isOpen={openModal}>
            <h1 className="text-center text-indigo-700 mt-3 mb-6 uppercase text-2xl font-bold">
                Merchant Information
            </h1>

            <div className="mb-6">
                <div className="text-lg font-bold mb-3">
                    <p>
                        Legal Name:{' '}
                        <span className="text-base font-medium">
                            {userData?.legalName}
                        </span>
                    </p>
                    <p>
                        Type of organization:{' '}
                        <span className="text-base font-medium">
                            {userData?.typeOfOrganization}
                        </span>
                    </p>
                    <p>
                        Merchant Brand Name:{' '}
                        <span className="text-base font-medium">
                            {userData?.merchantBrandName}
                        </span>
                    </p>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-center text-2xl font-bold mb-3">
                    Certificate of Incorporation / NTN
                </h3>
                <div className="text-lg font-bold">
                    <p>
                        Incorporation/NTN #:{' '}
                        <span className="text-base font-medium">
                            {userData?.incorporationOrNtn}
                        </span>
                    </p>
                    <p>
                        Incorporation/NTN Issue Date:{' '}
                        <span className="text-base font-medium">
                            {userData?.IncorporateNtnIssueDate}
                        </span>
                    </p>
                    <p>
                        Regulatory Authority Name:{' '}
                        <span className="text-base font-medium">
                            {userData?.incorporationRegulatoryAuthorityName}
                        </span>
                    </p>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-center text-2xl font-bold mb-3">
                    Sales Tax Registration
                </h3>
                <div className=" text-lg font-bold">
                    <p>
                        Sales Tax Registration #:{' '}
                        <span className="text-base font-medium">
                            {userData.salesTaxRegistration}
                        </span>
                    </p>
                    <p>
                        Sales Tax Registration Issue Date:{' '}
                        <span className="text-base font-medium">
                            {userData.ntnIssueDate}
                        </span>
                    </p>
                    <p>
                        Regulatory Authority Name:{' '}
                        <span className="text-base font-medium">
                            {userData.saleTaxRegulatoryAuthorityName}
                        </span>
                    </p>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-center text-2xl font-bold mb-3">
                    National Tax Number
                </h3>
                <p className="text-lg font-bold">
                    National Tax # / (NTN):
                    <span className="text-base font-medium">
                        {' '}
                        {userData.nationalTaxNumber}
                    </span>
                </p>
            </div>

            <div className="mb-8">
                <h3 className="text-center text-2xl font-bold mb-3">
                    CEO/Owner/MD
                </h3>
                <div className="text-lg font-bold">
                    <p>
                        Name:{' '}
                        <span className="text-base font-medium">
                            {userData?.ceoName}
                        </span>
                    </p>
                    <p>
                        CNIC:{' '}
                        <span className="text-base font-medium">
                            {userData?.ceoCNIC}
                        </span>
                    </p>
                    <p>
                        Mobile:{' '}
                        <span className="text-base font-medium">
                            {userData?.CeoMobile}
                        </span>
                    </p>
                    <p>
                        Email:{' '}
                        <span className="text-base font-medium">
                            {userData?.ceoEmail}
                        </span>
                    </p>
                    <p>
                        Address:{' '}
                        <span className="text-base font-medium">
                            {userData?.ceoState}
                        </span>
                    </p>
                    <p>
                        Province/State:{' '}
                        <span className="text-base font-medium">
                            {userData?.ceoState}
                        </span>
                    </p>
                    <p>
                        City:{' '}
                        <span className="text-base font-medium">
                            {userData?.ceoCity}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex justify-end mt-8 gap-3">
                <Button variant="solid" onClick={onRequestClose}>
                    EDIT
                </Button>
                <Button className="flex justify-center  align-middle py-3 gap-2">
                    <IoMdDownload className="m-0 p-0" size={18} color="#000" />
                    PDF
                </Button>
                <Button
                    onClick={() => submitData(userData)}
                    variant="solid"
                    loading={loading}
                >
                    {currentStepStatus === 'complete' ? 'Save' : 'Next'}
                </Button>
            </div>
        </ReactModal>
    )
}

export default MerchantInformationModal
