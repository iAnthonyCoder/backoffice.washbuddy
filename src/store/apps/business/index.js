import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { isEmpty, omitBy } from 'lodash'
import toast from 'react-hot-toast'
import { businessService } from 'services/business.service'

// ** Fetch Businesses
export const fetchData = createAsyncThunk('appBusinesses/fetchData', async (params = '', { getState, dispatch }) => {

  try {
    await dispatch(setLoading())
    const response = await businessService.get('?'+params)
    return response
  } catch (er){
    er.errors && er.errors.map(x => toast.error(x.message))
  }
})

// ** Add Business
export const addBusiness = createAsyncThunk('appBusinesses/addBusiness', async (data, { getState, dispatch }) => {
  const response = await axios.post('/apps/businesss/add-business', {
    data
  })
  dispatch(fetchData(getState().business.params))

  return response.data
})

export const openReviewDialog = createAsyncThunk('appBusinesses/openReviewDialog', async (data, { getState, dispatch }) => {
  return {
    isReviewDialogOpen:true
  }
})

export const closeReviewDialog = createAsyncThunk('appBusinesses/closeReviewDialog', async (data, { getState, dispatch }) => {
  return {
    isReviewDialogOpen:false
  }
})


export const deleteBusiness = createAsyncThunk('appBusinesses/deleteBusiness', async (id, { getState, dispatch }) => {
  const response = await axios.delete('/apps/businesss/delete', {
    data: id
  })
  dispatch(fetchData(getState().business.params))

  return response.data
})

export const setLoading = createAsyncThunk('appBusinesses/setLoading', async (id, { dispatch }) => {
  return true
})

export const appBusinessesSlice = createSlice({
  name: 'appBusinesses',
  initialState: {
    data: [],
    isReviewDialogOpen: false,
    profile:{},
    loading: true,
    total: null,
    params: {},
    allData: [],
    current_page:-1,
    page_size: 24,
    starting_at:1
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {

      if(action.payload){
        state.data = action.payload.data
        state.total = action.payload.total
        state.params = action.payload.params
        state.current_page = action.payload.current_page
        state.page_size = action.payload.page_size
        state.starting_at = action.payload.starting_at
        state.loading = false
      } else {
        state.loading = false
      }
    }),
    builder.addCase(setLoading.fulfilled, (state, action) => {
      state.loading = true
    })
  }
})

export default appBusinessesSlice.reducer