import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  profile_data: {},
};

const profileApi = createSlice({
  name: 'PROFILE_SLICE',
  initialState,
  reducers: {
    setBrandsLoading: (state, action: PayloadAction<any>) => {
      state.loading = action.payload;
    },
    setProfileData: (state, action: PayloadAction<any>) => {
      state.profile_data = action.payload;
    },
  },
});

export const { setBrandsLoading, setProfileData } = profileApi.actions;
export default profileApi.reducer;
