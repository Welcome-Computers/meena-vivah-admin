import { createAsyncThunk } from '@reduxjs/toolkit';
import { setBrandData } from '.';
import { brandApi } from './services';

export const fetchBanners = createAsyncThunk('FETCH_BANNERS', async (args: any, { dispatch }) => {
  try {
    const res = await dispatch(brandApi.endpoints.getBrands.initiate(args, { forceRefetch: true, subscribe: true }));
    dispatch(setBrandData({ ...res.data }));
    return res.data;
  } catch (error: any) {
    //   dispatch(setError(error.toString()));
  } finally {
    //   dispatch(setCategoriesLoading(false));
  }
});



