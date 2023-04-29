import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { isEmpty, omitBy } from 'lodash'
import toast from 'react-hot-toast'
import { business_itemService } from 'services/business_item.service'

// ** Fetch Businesses
export const fetchData = createAsyncThunk('appChat/fetchData', async (params = '', { getState, dispatch }) => {

  try {
    await dispatch(setLoading())
    const response = await business_itemService.get('?'+params)
   
    return response
  } catch (er){
    er.errors && er.errors.map(x => toast.error(x.message))
  }
})



export const setLoading = createAsyncThunk('appChat/setLoading', async (id, { dispatch }) => {
  return true
})

export const appChatSlice = createSlice({
  name: 'appChat',
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

export default appChatSlice.reducer