import { createAsyncThunk } from '@reduxjs/toolkit';
import { importedProfileApi } from './srevices';

export const fetchBanners = createAsyncThunk('FETCH_BANNERS', async (args: any, { dispatch }) => {
  try {
    const res = await dispatch(importedProfileApi.endpoints.getImportedProfiles.initiate(args, { forceRefetch: true, subscribe: true }));
    // dispatch(setBrandData({ ...res.data }));
    return res.data;
  } catch (error: any) {
    //   dispatch(setError(error.toString()));
  } finally {
    //   dispatch(setCategoriesLoading(false));
  }
});

