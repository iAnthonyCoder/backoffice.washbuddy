// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import items from 'src/store/apps/item'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import orders from 'src/store/apps/order'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import businesses from 'src/store/apps/business'

export const store = configureStore({
  reducer: {
    user,
    items,
    email,
    orders,
    calendar,
    permissions,
    businesses,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
