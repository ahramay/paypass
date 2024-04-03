import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import { MerchantInfo,BusinessDetail,OperationDetail,BankDetail } from '../../interface/onBoardingFormInterface'

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
        merchantInformation: MerchantInfo,
        businessDetails:BusinessDetail
        // operationsDetails:OperationDetail
        // operationsDetails:
    }
}

export const MyDocument: React.FC<DocumentProps> = ({ data }) => {
    const merchantInfo = data?.merchantInformation
    const BussinessDeatil = data?.businessDetails
    // const operationsDetails = data?.operationsDetails
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
                            {merchantInfo?.legalName}{' '}
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
            </Page>
        </Document>
    )
}
