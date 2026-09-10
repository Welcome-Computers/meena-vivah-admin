import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  layout_height: "auto", // main window height
  admin_topbar: "auto", // main window height
  bread_crumb: "auto", // main window height
};

const layoutSettingApi = createSlice({
  name: 'LAYOUT_SETTING_SLICE',
  initialState,
  reducers: {
    setLayoutHeight: (state, action: PayloadAction<any>) => {
      state.layout_height = action.payload;
    },

  },
});

export const { setLayoutHeight } = layoutSettingApi.actions;
export default layoutSettingApi.reducer;
