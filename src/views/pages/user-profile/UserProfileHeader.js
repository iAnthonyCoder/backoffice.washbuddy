// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { businessService } from 'services/business.service'
import { Mailbox, MailboxOpen, MailboxOutline } from 'mdi-material-ui'
import { Chip, Fab } from '@mui/material'
import { textTransform } from '@mui/system'
import DialogAddOwner from 'src/views/components/dialogs/DialogAddOwner'
import DialogAddUser from 'src/views/apps/user/list/AddUserDialog'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const UserProfileHeader = ({id}) => {
  // ** State

  const [data, setData] = useState(null)
  useEffect(() => {
    businessService.find(id).then(response => {
      setData(response)
    })
  }, [])

  const designationIcon = data?.designationIcon || 'mdi:briefcase-outline'

  const [ showAddOwnerDialog, setShowAddOwnerDialog ] = useState(false)

  return data !== null ? (
    <Card>
     
      {/* <CardMedia
        component='img'
        alt='profile-header'
        image={'/images/pages/profile-banner.png'}
        sx={{
          height: { xs: 150, md: 250 }
        }}
      /> */}
      <CardContent
        sx={{
          pt: 0,
          mt: 4,
          display: 'flex',
          alignItems: { xs: 'flex-end', md: 'flex-start' },
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        <ProfilePicture src={'/images/avatars/1.png'} alt='profile-picture' />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between']
          }}
        >
          <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
            
            <div style={{display:'flex'}}>
            <Typography variant='h5' sx={{ mb: 4, fontSize: '1.375rem' }}>
              {data.name}
              
            </Typography>
            <Chip size='small' sx={{ml:4}} label={data.is_enabled ? 'Enabled' : 'Disabled'} color={data.is_enabled ? 'primary' : 'warning'} variant='outline'>
              
              </Chip>
            </div>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:mailbox-outline' />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600, textTransform:'uppercase' }}>{data.email}</Typography>
              </Box>
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:telephone-outline' />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{data.phone_number}</Typography>
              </Box>
              {
                data.website && <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                  <Icon icon='mdi:web' />
                  <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>={data.website}</Typography>
                </Box>
              }
            </Box>
            <Box sx={{mt:2}}>
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:map-marker' />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600, textTransform:'uppercase' }}>
                {data.address}{data.address_line_two ? ', ' : '' }{data.address_line_two}, {data.city.name}, {data.zip_code}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{mt:3}}>
            {/* <Typography sx={{ color: 'text.primary', fontSize:'16px', fontWeight: 900, textTransform:'uppercase', marginBottom:'5px' }}>
                Owner
              </Typography> */}
              {
                Boolean(data.user) ? (
                    <Chip
                      label={`${data.user.first_name} ${data.user.last_name} (OWNER)`}
                      onDelete={data.key === 2 ? undefined : ()=>console.log('object')}
                    />
                  ) : (
                    <Fab onClick={()=>setShowAddOwnerDialog(true)} color='secondary' size='small' variant='extended' sx={{ '& svg': { mr: 1 } }}>
                      <Icon icon='mdi:plus' />
                      Add Ownmer
                    </Fab>
                  )
                
              }
            </Box>
          </Box>
          {/* <Button variant='contained' startIcon={<Icon icon='mdi:account-check-outline' fontSize={20} />}>
            Connected
          </Button> */}
        </Box>
        <DialogAddUser business_id={data.id} show={showAddOwnerDialog} setShow={setShowAddOwnerDialog} />
      </CardContent>
    </Card>
  ) : null
}

export default UserProfileHeader
