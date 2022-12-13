import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  connectDlgOpen: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSidebarOpen: (state, action) => {
      state.sidebarOpen =action.payload ;
    },
    setConnectDlgOpen: (state, action) => {
      state.connectDlgOpen = action.payload
    }
  },
  
});

export const { setSidebarOpen, setConnectDlgOpen } = appSlice.actions;


export default appSlice.reducer;
