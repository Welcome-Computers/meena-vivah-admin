import { brandIdentityApi } from '@redux/brand_identity/services';
import { brandsApi } from '@redux/brands/service';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareAuthHeaders } from '@utils/prepareHeaders';
// import { getSession } from 'next-auth/react';

export const brandApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
    prepareHeaders: prepareAuthHeaders,
  }),
  reducerPath: 'brandAPI',
  tagTypes: ['Brand', 'BrandList', 'WaiverRegistrationDetails'],
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({
        url: '/facility/facility_manage_brands',
        method: 'GET',
      }),
      providesTags: ['Brand'],
    }),
    uploadBanner: builder.mutation({
      query: (args: { brand_banner?: { image: any }; product_banner?: { image: any }; about_brand?: string }) => ({
        url: '/facility/facility_manage_brands',
        method: 'POST',
        body: args,
      }),
      invalidatesTags: ['Brand'],
    }),
    deleteBanner: builder.mutation({
      query: (args: { brand_banner?: boolean; product_banner?: boolean }) => ({
        url: '/facility/facility_manage_brands/remove_custom_banners',
        method: 'DELETE',
        params: args,
      }),
      invalidatesTags: ['Brand'],
    }),
    updateDefaults: builder.mutation({
      query: (args: {
        banner?: { default_banner_id?: string; custom_banner_id?: string };
        product?: { default_banner_id?: string; custom_banner_id?: string };
      }) => ({
        url: '/facility/facility_manage_brands/set_custom_banner_profiles',
        method: 'PUT',
        body: args,
      }),
      invalidatesTags: ['Brand'],
    }),
    checkoutSummary: builder.query({
      query: (args: { price_for: string }) => ({
        url: `/company/billings_and_subscriptions/checkout_summary?price_for=${args?.price_for}`,
        method: 'GET',
      }),
      providesTags: ['BrandList'],
    }),
    billingsAndSubscriptions: builder.mutation({
      query: (args: {
        subscriber: string;
        company_id?: number | null | undefined;
        source?: string | number | null | undefined;
        by_connected_account?: string | boolean | undefined;
        additional_store_count?: number;
      }) => ({
        url: `/company/billings_and_subscriptions`,
        method: 'POST',
        body: args,
      }),
      onQueryStarted: (_args, { dispatch, queryFulfilled }) => {
        queryFulfilled.then(() => {
          dispatch(brandsApi.util.invalidateTags([{ type: 'Brand', id: 'INFINITE_LIST' }]));
        });
      },
      // invalidatesTags: [{ type: 'Brand', id: 'LIST' }],
    }),
    getWavierRegistrationDetails: builder.query({
      query: () => ({
        url: '/facility/waiver_registrations/waiver_registration_details',
        method: 'GET',
      }),
      providesTags: ['WaiverRegistrationDetails'],
    }),
    updateBrandIdentity: builder.mutation({
      query: (args: { dba_name: string; identity_type: string }) => ({
        url: '/facility/waiver_registrations/update_brand_identity',
        method: 'PUT',
        body: args,
      }),
      invalidatesTags: ['WaiverRegistrationDetails'],
    }),
    setBanner: builder.mutation({
      query: (args: { default_banner_id: string }) => ({
        url: '/facility/waiver_registrations/set_default_banner',
        method: 'PUT',
        params: args,
      }),
      invalidatesTags: ['WaiverRegistrationDetails'],
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(brandIdentityApi.util.invalidateTags(['CompanyBrandIdentityBanners', 'WaiverRegistrationBanners']));
      },
    }),
    setLogo: builder.mutation({
      query: (args: { default_profile_picture_id: string }) => ({
        url: '/facility/waiver_registrations/set_default_logo',
        method: 'PUT',
        params: args,
      }),
      invalidatesTags: ['WaiverRegistrationDetails'],
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(brandIdentityApi.util.invalidateTags(['CompanyBrandIdentityLogos', 'WaiverRegistrationLogos']));
      },
    }),
  }),
});

export const { useGetBrandsQuery, useCheckoutSummaryQuery, useBillingsAndSubscriptionsMutation } = brandApi;
