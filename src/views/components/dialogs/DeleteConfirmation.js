// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

const DeleteConfirmation = (props) => {

	const { 
		title, 
		description, 
		recordToDelete, 
		setRecordToDelete, 
		removeRecord ,
		isDeleting
	} = props

	return (
		<Fragment>
	 
			<Dialog
				open={Boolean(recordToDelete)}
				onClose={()=>setRecordToDelete(null)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{title.replace('?', '')} {recordToDelete && recordToDelete.name ? recordToDelete.name+'?' : '?'}</DialogTitle>
			 <DialogContent>
					<DialogContentText id='alert-dialog-description'>
						{description}
					</DialogContentText>
				</DialogContent>
				<DialogActions className='dialog-actions-dense'>
					<Button disabled={isDeleting} onClick={()=>setRecordToDelete(null)}>Cancel</Button>
					<Button disabled={isDeleting} onClick={()=>removeRecord(recordToDelete)}>Confirm</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	)
}

export default DeleteConfirmation
