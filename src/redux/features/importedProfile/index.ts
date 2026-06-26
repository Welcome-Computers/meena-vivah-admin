import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  imported_profile_data: {},
};

const importedProfileApi = createSlice({
  name: 'IMPORTED_PROFILE_SLICE',
  initialState,
  reducers: {
    setImportedProfileData: (state, action: PayloadAction<any>) => {
      state.imported_profile_data = action.payload;
    },
  },
});

export const { setImportedProfileData } = importedProfileApi.actions;
export default importedProfileApi.reducer;
