import { GetProfilesProps } from '@/lib/modules/profile/profile.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  profile_data: {},
  profile_filter_values: {},
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
    setProfileFilterValues: (state, action: PayloadAction<GetProfilesProps>) => {
      state.profile_filter_values = action.payload;
    },
  },
});

export const { setBrandsLoading, setProfileData, setProfileFilterValues } = profileApi.actions;
export default profileApi.reducer;
