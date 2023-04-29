
import { Box, Breadcrumbs, Link, Typography } from '@mui/material'
import React from 'react'
import AddCard from 'src/views/apps/invoice/add/AddCard'

const OrderForm  = () => {


    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" sx={{mb:4}}>
              <Link underline="hover" color="inherit" href="/">
                ORDERS
              </Link>
             
              <Typography color="text.primary">ADD</Typography>
            </Breadcrumbs>
            <AddCard></AddCard>
        </Box>
        
    )
}
OrderForm.acl = {
    action: 'manage',
    subject: 'business'
  }
export default OrderForm