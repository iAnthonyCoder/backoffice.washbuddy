// // ** MUI Imports
// import { Typography } from '@mui/material'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import TextField from '@mui/material/TextField'
// import { useRouter } from 'next/router'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// const TableHeader = props => {
//   // ** Props
//   const { handleFilter, toggle, value, title } = props
//   const router = useRouter()

//   return (
//     <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
//       {/* <Button
//         sx={{ mr: 4, mb: 2 }}
//         color='secondary'
//         variant='outlined'
//         startIcon={<Icon icon='mdi:export-variant' fontSize={20} />}
//       >
//         Export
//       </Button> */}
//       <Typography sx={{fontWeight:'500', fontSize:'1.325rem'}}>{title}</Typography>
//       <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
//         {/* <TextField
//           size='small'
//           value={value}
//           sx={{ mr: 6, mb: 2 }}
//           placeholder='Search'
//           onChange={e => handleFilter(e.target.value)}
//         /> */}

//         <Button onClick={()=>router.push('/business/orders/add')} sx={{ mb: 2 }} variant='contained'>
//           Add New
//         </Button>
//       </Box>
//     </Box>
//   )
// }

// export default TableHeader
