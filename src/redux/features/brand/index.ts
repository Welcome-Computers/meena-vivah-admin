import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  about_brand: '',
  default_banners: [],
  brand_banner: null,
  product_banner: null,
  profile_brand_banner: '',
  profile_product_banner: '',
};

const brandSlice = createSlice({
  name: 'BRAND_SLICE',
  initialState,
  reducers: {
    setBrandsLoading: (state, action: PayloadAction<any>) => {
      state.loading = action.payload;
    },
    setBrandData: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.about_brand = action.payload.about_brand;
      state.brand_banner = action.payload.brand_banner;
      state.product_banner = action.payload.product_banner;
      state.default_banners = action.payload.default_banners;
      state.profile_brand_banner = action.payload.profile_brand_banner;
      state.profile_product_banner = action.payload.profile_product_banner;
    },
  },
});

export const { setBrandData, setBrandsLoading } = brandSlice.actions;
export default brandSlice.reducer;
