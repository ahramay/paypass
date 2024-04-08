import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import {
    MerchantInfo,
    BusinessDetail,
    OperationDetail,
    BankDetail,
} from '../../interface/onBoardingFormInterface'

// Create styles
const styles = StyleSheet.create({
    page: {
        border: 'none',
        borderColor: '#fff',
        backgroundColor: '#fff',
        fontFamily: 'Times-Roman',
        padding: '20px',
    },
    title: {
        fontSize: '18px',
        textAlign: 'center',
        marginTop: '10px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
    },
    section: {
        width: '250px',
        backgroundColor: '#6366f1',
        borderRadius: '8px',
        padding: '10px',
    },
    hr: {
        borderBottom: '1px solid #000000',
        margin: '10px 0',
    },
})
interface DocumentProps {
    data: {
        merchantInformation: MerchantInfo
        businessDetails: BusinessDetail
        operationsDetails: OperationDetail
    }
    bankDetails: BankDetail
}

export const MyDocument: React.FC<DocumentProps> = ({ data, bankDetails }) => {
    const merchantInfo = data?.merchantInformation
    const BussinessDeatil = data?.businessDetails
    const operationsDetails = data?.operationsDetails
    // const bankDetails = data?.bankDetails
    // const bankAccountDetail = data?.operationsDetails
    console.log(data)
    return (
        <Document>
            <Page style={styles.page} size="A4">
                <View style={styles.title}>
                    <Text style={styles.section}>Merchant Information</Text>
                </View>
                <View style={{ marginTop: '20px', fontSize: '16px' }}>
                    <Text>
                        legal Name :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {merchantInfo.legalName}{' '}
                        </Text>
                    </Text>
                    <Text>
                        Types Of Organization :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {merchantInfo?.typeOfOrganization}
                        </Text>
                    </Text>
                    <Text>
                        Merchant Brand Name :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {merchantInfo?.merchantBrandName}
                        </Text>
                    </Text>
                </View>
                {/* Certificate of Incorporation / NTN  */}
                <View>
                    <Text
                        style={{
                            fontSize: '18px',
                            margin: '20px',
                            textAlign: 'center',
                        }}
                    >
                        Certificate of Incorporation / NTN
                    </Text>
                    <View style={{ fontSize: '16px' }}>
                        <Text>
                            Incorporation / NTN :&nbsp;
                            <Text style={{ fontSize: '14px' }}>
                                {merchantInfo?.incorporationOrNtn}
                            </Text>
                        </Text>
                        <Text>
                            Incorporation / NTN Issue Date :&nbsp;
                            <Text style={{ fontSize: '14px' }}>
                                {merchantInfo?.IncorporateNtnIssueDate}
                            </Text>
                        </Text>
                        <Text>
                            Regulatory Authority Name : &nbsp;
                            <Text style={{ fontSize: '14px' }}>
                                {
                                    merchantInfo?.incorporationRegulatoryAuthorityName
                                }
                            </Text>
                        </Text>
                    </View>
                </View>
                {/*Sales Tax Registration */}
                <View>
                    <Text
                        style={{
                            fontSize: '18px',
                            margin: '20px',
                            textAlign: 'center',
                        }}
                    >
                        Sales Tax Registration
                    </Text>
                    <View style={{ fontSize: '16px' }}>
                        <Text>
                            Sales Tax Registration # :&nbsp;
                            <Text style={{ fontSize: '14px' }}>
                                {merchantInfo?.salesTaxRegistration}
                            </Text>
                        </Text>
                        <Text>
                            Sales Tax Registration Issue Date :&nbsp;
                            <Text style={{ fontSize: '14px' }}>
                                {merchantInfo?.ntnIssueDate}
                            </Text>
                        </Text>
                        <Text>
                            Regulatory Authority Name : &nbsp;
                            <Text style={{ fontSize: '14px' }}>
                                {merchantInfo?.saleTaxRegulatoryAuthorityName}
                            </Text>
                        </Text>
                    </View>
                </View>
                {/*National Tax Number */}
                <View>
                    <Text
                        style={{
                            fontSize: '18px',
                            margin: '20px',
                            textAlign: 'center',
                        }}
                    >
                        National Tax Number
                    </Text>
                    <View style={{ fontSize: '16px' }}>
                        <Text>
                            National Tax Number # / (NTN) : &nbsp;
                            <Text style={{ fontSize: '14px' }}>
                                {merchantInfo?.nationalTaxNumber}
                            </Text>
                        </Text>
                    </View>
                </View>
                {/*CEO/Owner/MD */}
                <View>
                    <Text
                        style={{
                            fontSize: '18px',
                            margin: '20px',
                            textAlign: 'center',
                        }}
                    >
                        CEO/Owner/MD
                    </Text>
                    <View style={{ fontSize: '16px' }}>
                        <Text>
                            Name :&nbsp;
                            <Text style={{ fontSize: '14px' }}>
                                {merchantInfo?.ceoName}
                            </Text>
                        </Text>
                        <Text>
                            CNIC :&nbsp;
                            <Text style={{ fontSize: '14px' }}>
                                {merchantInfo?.ceoCNIC}
                            </Text>
                        </Text>
                        <Text>
                            Mobile :&nbsp;
                            <Text style={{ fontSize: '14px' }}>
                                {merchantInfo?.CeoMobile}
                            </Text>
                        </Text>
                        <Text>
                            Email : &nbsp;
                            <Text style={{ fontSize: '14px' }}>
                                {merchantInfo?.ceoEmail}
                            </Text>
                        </Text>
                        <Text>
                            Address : &nbsp;
                            <Text style={{ fontSize: '14px' }}>
                                {merchantInfo?.ceoAddress}
                            </Text>
                        </Text>
                        <Text>
                            Province/State : &nbsp;
                            <Text style={{ fontSize: '14px' }}>
                                {merchantInfo?.ceoState}
                            </Text>
                        </Text>
                        <Text>
                            City : &nbsp;
                            <Text style={{ fontSize: '14px' }}>
                                {merchantInfo?.ceoCity}
                            </Text>
                        </Text>
                    </View>
                </View>
                {/* {shows Bussiness detail} */}
                <View style={styles.title}>
                    <Text style={styles.section}>Bussiness Details</Text>
                </View>
                <View style={{ marginTop: '20px', fontSize: '16px' }}>
                    <Text>
                        Main line of bussiness :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {BussinessDeatil?.mainLineOfBusiness}{' '}
                        </Text>
                    </Text>
                    <Text>
                        Website :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {BussinessDeatil?.website}
                        </Text>
                    </Text>
                    <Text>
                        Mobile :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {BussinessDeatil?.mobile}
                        </Text>
                    </Text>
                    <Text>
                        Email&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {BussinessDeatil?.email}
                        </Text>
                    </Text>
                    <Text>
                        Address :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {BussinessDeatil?.address}
                        </Text>
                    </Text>
                    <Text>
                        province/State :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {BussinessDeatil?.state}
                        </Text>
                    </Text>
                    <Text>
                        City :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {BussinessDeatil?.city}
                        </Text>
                    </Text>
                </View>
                {/* {Bussines detail additional branches} */}
                <Text
                    style={{
                        fontSize: '18px',
                        margin: '20px',
                        textAlign: 'center',
                    }}
                >
                    Additional Branches
                </Text>
                <View>
                    <Text>
                        Mobile :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {BussinessDeatil?.additionalMobile}
                        </Text>
                    </Text>
                    <Text>
                        Email&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {BussinessDeatil?.additionalEmail}
                        </Text>
                    </Text>
                    <Text>
                        Address :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {BussinessDeatil?.additionalAddress}
                        </Text>
                    </Text>
                    <Text>
                        province/State :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {BussinessDeatil?.additionalState}
                        </Text>
                    </Text>
                    <Text>
                        City :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {BussinessDeatil?.city}
                        </Text>
                    </Text>
                </View>
                {/* {shows opertaion details} */}
                <View style={styles.title}>
                    <Text style={styles.section}>Operations Details</Text>
                </View>
                {/* {Primary POC} */}
                <Text
                    style={{
                        fontSize: '18px',
                        margin: '20px',
                        textAlign: 'center',
                    }}
                >
                    Primary POC
                </Text>
                <View>
                    <Text>
                        Name :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.secondaryPOCName}
                        </Text>
                    </Text>
                    <Text>
                        Mobile &nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.secondaryPOCMobile}
                        </Text>
                    </Text>
                    <Text>
                        Email :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.secondaryPOCEmail}
                        </Text>
                    </Text>
                    <Text>
                        CNIC :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.secondaryPOCCnic}
                        </Text>
                    </Text>
                    <Text>
                        Designation :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.secondaryPOCDesignation}
                        </Text>
                    </Text>
                </View>
                {/* {Primary POC} */}
                <Text
                    style={{
                        fontSize: '18px',
                        margin: '20px',
                        textAlign: 'center',
                    }}
                >
                    Secondary POC
                </Text>
                <View>
                    <Text>
                        Name :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.primaryPOCName}
                        </Text>
                    </Text>
                    <Text>
                        Mobile &nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.primaryPOCMobile}
                        </Text>
                    </Text>
                    <Text>
                        Email :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.primaryPOCEmail}
                        </Text>
                    </Text>
                    <Text>
                        CNIC :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.primaryPOCCnic}
                        </Text>
                    </Text>
                    <Text>
                        Designation :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.primaryPOCDesignation}
                        </Text>
                    </Text>
                </View>
                {/* {Aggrement details} */}
                <Text
                    style={{
                        fontSize: '18px',
                        margin: '20px',
                        textAlign: 'center',
                    }}
                >
                    Agreement Details
                </Text>
                <View>
                    <Text>
                        Name of the Signee :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.agreementDetailsNameOfSignee}
                        </Text>
                    </Text>
                    <Text>
                        CNIC :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.agreementDetailsCnic}
                        </Text>
                    </Text>
                    <Text>
                        Designation :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.agreementDetailsDesignation}
                        </Text>
                    </Text>
                    <Text>
                        Email :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.agreementDetailsEmail}
                        </Text>
                    </Text>
                    <Text>
                        Mobile :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.agreementDetailsMobile}
                        </Text>
                    </Text>
                    <Text>
                        Place of execution :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {
                                operationsDetails?.agreementDetailsPlaceOfExecution
                            }
                        </Text>
                    </Text>
                </View>
                {/* {Declaration} */}
                <Text
                    style={{
                        fontSize: '18px',
                        margin: '20px',
                        textAlign: 'center',
                    }}
                >
                    Agreement Details
                </Text>
                <View>
                    <Text>
                        Name of the Signee :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.declarationNameOfSignee}
                        </Text>
                    </Text>
                    <Text>
                        CNIC :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.declarationCnic}
                        </Text>
                    </Text>
                    <Text>
                        Designation :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.declarationDesignation}
                        </Text>
                    </Text>
                    <Text>
                        Email :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.declarationEmail}
                        </Text>
                    </Text>
                    <Text>
                        Mobile :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.declarationMobile}
                        </Text>
                    </Text>
                    <Text>
                        Place of execution :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.declarationPlaceOfExecution}
                        </Text>
                    </Text>
                </View>
                {/* {shows the bank details} */}
                <View style={styles.title}>
                    <Text style={styles.section}>Bank Account Details</Text>
                </View>
                <View>
                    <Text>
                        Bank Name :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {bankDetails?.branchName}
                        </Text>
                    </Text>
                    <Text>
                        Account Title :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {bankDetails?.accountTitle}
                        </Text>
                    </Text>
                    <Text>
                        Account Number :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {bankDetails?.accountNumber}
                        </Text>
                    </Text>
                    <Text>
                        IBAN :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {bankDetails?.iban}
                        </Text>
                    </Text>
                    <Text>
                        Branch Name :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {bankDetails?.branchName}
                        </Text>
                    </Text>
                    <Text>
                        Branch code :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {bankDetails?.branchCode}
                        </Text>
                    </Text>
                    <Text>
                        Branch City :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {operationsDetails?.declarationPlaceOfExecution}
                        </Text>
                    </Text>
                </View>
            </Page>
        </Document>
    )
}
