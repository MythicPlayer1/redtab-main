
import KycVerifyCard from '../../components/outlet-info/kyc-verify-card'
import { TabLayout } from '../../components/TabLayout'

const Outlet = () => {
    return (
        <TabLayout title="Outlet Details" noMyfooter={true}>
            <div className='px-4'>
                <KycVerifyCard />
            </div>
        </TabLayout>
    )
}

export default Outlet