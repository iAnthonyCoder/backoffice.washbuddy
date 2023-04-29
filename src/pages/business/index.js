import React from 'react'

const BusinessDashboard = () => {


    return (
        <h1>asd</h1>
    )
}

BusinessDashboard.authGuard = true
BusinessDashboard.acl = {
    action: 'manage',
    subject: 'business'
}
export default BusinessDashboard