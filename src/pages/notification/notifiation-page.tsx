import React from 'react'
import { TabLayout } from '../../components/TabLayout'
import AuthRedirectCard from '../../components/auth-redirect/AuthRedirectCard'


const NotificationPage = () => {
    return (
        <TabLayout>
            <AuthRedirectCard to="/home" message="Page Coming Soon" btnText="Explore Market" />
        </TabLayout>
    )
}

export default NotificationPage
