import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

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
}
// Create Document Component
export const MyDocument: React.FC<DocumentProps> = ({ data }) => (
    <Document>
        <Page style={styles.page} size="A4">
            <View style={styles.title}>
                <Text style={styles.section}>Merchant Information</Text>
            </View>
            <View style={{ marginTop: '20px', fontSize: '16px' }}>
                <Text>
                    legal Name :&nbsp;
                    <Text style={{ fontSize: '14px' }}>{data?.legalName} </Text>
                </Text>
                <Text>
                    Types Of Organization :&nbsp;
                    <Text style={{ fontSize: '14px' }}>
                        {data?.typeOfOrganization}
                    </Text>
                </Text>
                <Text>
                    Merchant Brand Name :&nbsp;
                    <Text style={{ fontSize: '14px' }}>
                        {data?.merchantBrandName}
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
                            {data?.incorporationOrNtn}
                        </Text>
                    </Text>
                    <Text>
                        Incorporation / NTN Issue Date :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {data?.IncorporateNtnIssueDate}
                        </Text>
                    </Text>
                    <Text>
                        Regulatory Authority Name : &nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {data?.incorporationRegulatoryAuthorityName}
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
                            {data?.salesTaxRegistration}
                        </Text>
                    </Text>
                    <Text>
                        Sales Tax Registration Issue Date :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {data?.ntnIssueDate}
                        </Text>
                    </Text>
                    <Text>
                        Regulatory Authority Name : &nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {data?.saleTaxRegulatoryAuthorityName}
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
                            {data?.nationalTaxNumber}
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
                            {data?.ceoName}
                        </Text>
                    </Text>
                    <Text>
                        CNIC :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {data?.ceoCNIC}
                        </Text>
                    </Text>
                    <Text>
                        Mobile :&nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {data?.CeoMobile}
                        </Text>
                    </Text>
                    <Text>
                        Email : &nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {data?.ceoEmail}
                        </Text>
                    </Text>
                    <Text>
                        Address : &nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {data?.ceoAddress}
                        </Text>
                    </Text>
                    <Text>
                        Province/State : &nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {data?.ceoState}
                        </Text>
                    </Text>
                    <Text>
                        City : &nbsp;
                        <Text style={{ fontSize: '14px' }}>
                            {data?.ceoCity}
                        </Text>
                    </Text>
                </View>
            </View>
        </Page>
    </Document>
)
