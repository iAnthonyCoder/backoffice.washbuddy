// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

const DialogAddOwner = (props) => {

  const { showAddOwnerDialog, setShowAddOwnerDialog } = props
  // ** State
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Fragment>
      <Dialog open={showAddOwnerDialog} onClose={()=>setShowAddOwnerDialog(false)} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Add owner</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Write the email address of the user you want to assign as owner of this business
          </DialogContentText>
          <TextField id='name' autoFocus fullWidth type='email' label='Email Address' />
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Assign</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogAddOwner
