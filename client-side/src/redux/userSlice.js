import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: undefined,
  newUser:false
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state,action) => {
      return{
        ...state,
        userInfo:action.payload
      }
    },
    setNewUser: (state,action) => {
      return{
        ...state,
        newUser:action.payload
      }
    },
  },
})

export const { setNewUser, setUserInfo } = userReducer.actions

export default userReducer.reducer