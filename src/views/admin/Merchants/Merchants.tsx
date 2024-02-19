import AdaptableCard from '@/components/shared/AdaptableCard'
import CustomersTable from './components/MerchantsTable'
import CustomersTableTools from './components/MerchantsTableTools'
import CustomerStatistic from './components/MerchantsStatistic'
import { injectReducer } from '@/store'
import reducer from './store'

injectReducer('crmCustomers', reducer)

const Customers = () => {
    return (
        <>
            <CustomerStatistic />
            <AdaptableCard className="h-full" bodyClass="h-full">
                <CustomersTableTools />
                <CustomersTable />
            </AdaptableCard>
        </>
    )
}

export default Customers
