import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal'
import { IoMdDownload } from 'react-icons/io'
import Button from '@/components/ui/Button'
import { apiOnboardingStepFour } from '@/services/onBoarding/onBoardingServices'
import type { BankDetails as BankDetailsType } from '../store'
import ShowToast from '@/components/ui/Notification/ShowToast'
import { useNavigate } from 'react-router-dom'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import { MyDocument } from '../pdf/merchantInformationPdf'
import { BankDetail } from '../../interface/onBoardingFormInterface'
import { useSelector } from 'react-redux'
// import { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf-viewer/pdfjs-dist'/;
interface MerchantInformationModalProps {
    openModal: boolean
    onRequestClose: () => void
    BankDetails?: () => BankDetail
    onNextChange?: (values: BankDetailsType, formName: string) => void
    currentStepStatus?: string
}

const MerchantInformationModal: React.FC<MerchantInformationModalProps> = ({
    openModal,
    onRequestClose,
    onNextChange,
    BankDetails,
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
            width: '700px',
        },
    }
    const onNext = (values: BankDetailsType) => {
        onNextChange?.(values, 'bankDetails')
    }

    const formData = useSelector((state: any) => state)
    console.log(formData)
    const merchantInfo =
        formData.accountDetailForm.data.formData.merchantInformation
    const BussinessDeatil =
        formData.accountDetailForm.data.formData.businessDetails
    const operationsDetails =
        formData.accountDetailForm.data.formData.operationsDetails
    const bankAccountDetail = BankDetails ? BankDetails() : null

    const submitData = async (data: any) => {
        setLoading(true)
        onNext(data)
        ShowToast('success', 'All detailed saves successfully')
        setLoading(false)
    }

    return (
        <ReactModal style={customStyles} isOpen={openModal}>
            <h1 className="text-center text-indigo-700 mt-3 mb-6 uppercase text-3xl font-bold">
                Merchant Information
            </h1>
            {/* <PDFViewer>
                <MyDocument data={formData.accountDetailForm.data.formData} />
            </PDFViewer> */}
            <div className="mb-6" style={{ color: 'black' }}>
                <div className="text-lg font-semibold mb-3">
                    <div className="flex justify-between">
                        <p>
                            Legal Name :{' '}
                            <span className="text-base font-medium">
                                {merchantInfo?.legalName}
                            </span>
                        </p>
                        <p>
                            Type of organization :{' '}
                            <span className="text-base font-medium">
                                {merchantInfo?.typeOfOrganization}
                            </span>
                        </p>
                    </div>
                    <p>
                        Merchant Brand Name :{' '}
                        <span className="text-base font-medium">
                            {merchantInfo?.merchantBrandName}
                        </span>
                    </p>
                </div>
            </div>

            <div className="mb-8  text-black">
                <h3 className="text-center text-2xl font-bold mb-3">
                    Certificate of Incorporation / NTN
                </h3>
                <div className="text-lg font-semibold">
                    <div className="flex justify-between">
                        <p>
                            Incorporation/NTN # :{' '}
                            <span className="text-base font-medium">
                                {merchantInfo?.incorporationOrNtn}
                            </span>
                        </p>
                        <p>
                            Incorporation/NTN Issue Date :{' '}
                            <span className="text-base font-medium">
                                {merchantInfo?.IncorporateNtnIssueDate}
                            </span>
                        </p>
                    </div>
                    <p>
                        Regulatory Authority Name :{' '}
                        <span className="text-base font-medium">
                            {merchantInfo?.incorporationRegulatoryAuthorityName}
                        </span>
                    </p>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-center text-2xl font-bold mb-3">
                    Sales Tax Registration
                </h3>
                <div className="text-black text-lg font-semibold">
                    <p>
                        Sales Tax Registration # :{' '}
                        <span className="text-base font-medium">
                            {merchantInfo?.salesTaxRegistration}
                        </span>
                    </p>
                    <p>
                        Sales Tax Registration Issue Date :{' '}
                        <span className="text-base font-medium">
                            {merchantInfo?.ntnIssueDate}
                        </span>
                    </p>
                    <p>
                        Regulatory Authority Name :{' '}
                        <span className="text-base font-medium">
                            {merchantInfo?.saleTaxRegulatoryAuthorityName}
                        </span>
                    </p>
                </div>
            </div>

            <div className="mb-8 text-black">
                <h3 className="text-center text-2xl font-bold mb-3">
                    National Tax Number
                </h3>
                <p className="text-lg font-semibold">
                    National Tax # / (NTN) :
                    <span className="text-base font-medium">
                        {' '}
                        {merchantInfo?.nationalTaxNumber}
                    </span>
                </p>
            </div>

            <div className="mb-8">
                <h3 className="text-center text-2xl font-bold mb-3">
                    CEO/Owner/MD
                </h3>
                <div className="text-black text-lg font-semibold">
                    <div className="flex justify-between">
                        <p>
                            Name :{' '}
                            <span className="text-base font-medium">
                                {merchantInfo?.ceoName}
                            </span>
                        </p>
                        <p>
                            CNIC :{' '}
                            <span className="text-base font-medium">
                                {merchantInfo?.ceoCNIC}
                            </span>
                        </p>
                        <p>
                            Mobile :{' '}
                            <span className="text-base font-medium">
                                {merchantInfo?.CeoMobile}
                            </span>
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <p>
                            Email :{' '}
                            <span className="text-base font-medium">
                                {merchantInfo?.ceoEmail}
                            </span>
                        </p>
                        <p>
                            Address :{' '}
                            <span className="text-base font-medium">
                                {merchantInfo?.ceoState}
                            </span>
                        </p>
                        <p>
                            Province/State :{' '}
                            <span className="text-base font-medium">
                                {merchantInfo?.ceoState}
                            </span>
                        </p>
                    </div>
                    <p>
                        City :{' '}
                        <span className="text-base font-medium">
                            {merchantInfo?.ceoCity}
                        </span>
                    </p>
                </div>
            </div>
            {/* Shows the bussiness details */}
            <h1 className="text-center text-indigo-700 mt-3 mb-6 uppercase text-3xl font-bold">
                Business Details
            </h1>
            <div className="mb-6">
                <div className="text-lg font-semibold mb-3 text-black">
                    <p>
                        Main Line Of Bussiness :
                        <span className="text-base font-medium">
                            {BussinessDeatil?.mainLineOfBusiness}
                        </span>
                    </p>
                    <p>
                        Website or App :{' '}
                        <span className="text-base font-medium">
                            {BussinessDeatil?.website}
                        </span>
                    </p>

                    <p>
                        Mobile Number :{' '}
                        <span className="text-base font-medium">
                            {BussinessDeatil?.mobile}
                        </span>
                    </p>

                    <p>
                        Email :
                        <span className="text-base font-medium">
                            {BussinessDeatil?.email}
                        </span>
                    </p>

                    <p>
                        Address :
                        <span className="text-base font-medium">
                            {BussinessDeatil?.address}
                        </span>
                    </p>
                    <p>
                        State :
                        <span className="text-base font-medium">
                            {BussinessDeatil?.state}
                        </span>
                    </p>

                    <p>
                        City :
                        <span className="text-base font-medium">
                            {BussinessDeatil?.city}
                        </span>
                    </p>
                </div>
            </div>
            <div className="mb-8">
                <h3 className="text-center text-2xl font-semibold mb-3">
                    Additional Branches
                </h3>
                <div className="text-lg font-semibold mb-3 text-black">
                    <p>
                        Mobile Number :
                        <span className="text-base font-medium">
                            {BussinessDeatil?.additionalMobile}
                        </span>
                    </p>

                    <p>
                        Email :
                        <span className="text-base font-medium">
                            {BussinessDeatil?.additionalEmail}
                        </span>
                    </p>
                    <p>
                        Address :
                        <span className="text-base font-medium">
                            {BussinessDeatil?.additionalAddress}
                        </span>
                    </p>
                    <p>
                        State :
                        <span className="text-base font-medium">
                            {BussinessDeatil?.additionalState}
                        </span>
                    </p>
                    <p>
                        City :
                        <span className="text-base font-medium">
                            {BussinessDeatil?.additionalCity}
                        </span>
                    </p>
                </div>
            </div>
            {/* shows the operation detail */}

            <h1 className="text-center text-indigo-700 mt-3 mb-6 uppercase text-3xl font-bold">
                Operation Details
            </h1>
            <div className="text-lg font-bold mb-3 text-black">
                <div className="mb-6">
                    <h3 className="text-center text-2xl font-bold mb-3">
                        Primary POC
                    </h3>
                    <div className="font-semibold">
                        <p>
                            Name :
                            <span className="text-base font-medium">
                                {operationsDetails?.primaryPOCName}
                            </span>
                        </p>
                        <p>
                            Mobile Number :
                            <span className="text-base font-medium">
                                {operationsDetails?.primaryPOCMobile}
                            </span>
                        </p>

                        <p>
                            Email :
                            <span className="text-base font-medium">
                                {operationsDetails?.primaryPOCEmail}
                            </span>
                        </p>
                        <p>
                            CNIC :
                            <span className="text-base font-medium">
                                {operationsDetails?.primaryPOCCnic}
                            </span>
                        </p>
                        <p>
                            Designation :
                            <span className="text-base font-medium">
                                {operationsDetails?.primaryPOCDesignation}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="mb-6 font-semibold">
                    <h3 className="text-center text-2xl font-bold mb-3">
                        Secondary POC
                    </h3>
                    <p>
                        Name :
                        <span className="text-base font-medium">
                            {operationsDetails?.secondaryPOCName}
                        </span>
                    </p>
                    <p>
                        Mobile Number :
                        <span className="text-base font-medium">
                            {operationsDetails?.secondaryPOCMobile}
                        </span>
                    </p>

                    <p>
                        Email :
                        <span className="text-base font-medium">
                            {operationsDetails?.secondaryPOCEmail}
                        </span>
                    </p>
                    <p>
                        CNIC :
                        <span className="text-base font-medium">
                            {operationsDetails?.secondaryPOCCnic}
                        </span>
                    </p>
                    <p>
                        Designation :
                        <span className="text-base font-medium">
                            {operationsDetails?.secondaryPOCDesignation}
                        </span>
                    </p>
                </div>

                <div className="mb-6 font-semibold">
                    <h3 className="text-center text-2xl font-bold mb-3">
                        Aggrement Details
                    </h3>
                    <p>
                        Name of the signee :
                        <span className="text-base font-medium">
                            {operationsDetails?.agreementDetailsNameOfSignee}
                        </span>
                    </p>
                    <p>
                        CNIC :
                        <span className="text-base font-medium">
                            {operationsDetails?.agreementDetailsCnic}
                        </span>
                    </p>

                    <p>
                        Designation :
                        <span className="text-base font-medium">
                            {operationsDetails?.agreementDetailsDesignation}
                        </span>
                    </p>

                    <p>
                        Email :
                        <span className="text-base font-medium">
                            {operationsDetails?.agreementDetailsEmail}
                        </span>
                    </p>
                    <p>
                        Mobile :
                        <span className="text-base font-medium">
                            {operationsDetails?.agreementDetailsMobile}
                        </span>
                    </p>
                    <p>
                        Date :
                        <span className="text-base font-medium">
                            {operationsDetails?.secondaryPOCCnic}
                        </span>
                    </p>
                    <p>
                        Place of executaion :
                        <span className="text-base font-medium">
                            {
                                operationsDetails?.agreementDetailsPlaceOfExecution
                            }
                        </span>
                    </p>
                </div>

                <div className="mb-6 font-semibold">
                    <h3 className="text-center text-2xl font-bold mb-3">
                        Declaration
                    </h3>
                    <p>
                        Name of the signee :
                        <span className="text-base font-medium">
                            {operationsDetails?.declarationNameOfSignee}
                        </span>
                    </p>
                    <p>
                        CNIC :
                        <span className="text-base font-medium">
                            {operationsDetails?.declarationCnic}
                        </span>
                    </p>

                    <p>
                        Designation :
                        <span className="text-base font-medium">
                            {operationsDetails?.declarationDesignation}
                        </span>
                    </p>

                    <p>
                        Email :
                        <span className="text-base font-medium">
                            {operationsDetails?.declarationEmail}
                        </span>
                    </p>
                    <p>
                        Mobile :
                        <span className="text-base font-medium">
                            {operationsDetails?.declarationMobile}
                        </span>
                    </p>
                    <p>
                        Date :
                        <span className="text-base font-medium">
                            {operationsDetails?.secondaryPOCCnic}
                        </span>
                    </p>
                    <p>
                        Place of executaion :
                        <span className="text-base font-medium">
                            {operationsDetails?.declarationPlaceOfExecution}
                        </span>
                    </p>
                </div>
            </div>
            {/* Shows the bank account details */}
            <h1 className="text-center text-indigo-700 mt-3 mb-6 uppercase text-3xl font-bold">
                Bank Account Details
            </h1>
            <div className="mb-6 font-semibold text-black">
                <div className="text-lg font-semibold mb-3">
                    <p>
                        Bank Name :
                        <span className="text-base font-medium">
                            {bankAccountDetail?.bankName}
                        </span>
                    </p>
                    <p>
                        Account Title :
                        <span className="text-base font-medium">
                            {bankAccountDetail?.accountTitle}
                        </span>
                    </p>
                    <p>
                        Account Number :
                        <span className="text-base font-medium">
                            {bankAccountDetail?.accountNumber}
                        </span>
                    </p>

                    <p>
                        IBAN :
                        <span className="text-base font-medium">
                            {bankAccountDetail?.iban}
                        </span>
                    </p>
                    <p>
                        Branch Name :
                        <span className="text-base font-medium">
                            {bankAccountDetail?.branchName}
                        </span>
                    </p>
                    <p>
                        Branch Code :
                        <span className="text-base font-medium">
                            {bankAccountDetail?.branchCode}
                        </span>
                    </p>
                    <p>
                        Branch City :
                        <span className="text-base font-medium">
                            {bankAccountDetail?.branchCity}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex justify-end mt-8 gap-3">
                <Button variant="solid" onClick={onRequestClose}>
                    EDIT
                </Button>
                <PDFDownloadLink
                    document={
                        <MyDocument
                            data={formData.accountDetailForm.data.formData}
                        />
                    }
                    fileName="merchant_information.pdf"
                    className="flex justify-center align-middle"
                >
                    {({ loading }) => (
                        <Button>
                            {loading ? (
                                'Loading document...'
                            ) : (
                                <div className="flex items-center gap-2">
                                    <IoMdDownload size={18} />
                                    <span>PDF</span>
                                </div>
                            )}
                        </Button>
                    )}
                </PDFDownloadLink>
                <Button
                    onClick={() => submitData(bankAccountDetail)}
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
