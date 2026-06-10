import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  setError,
  setLoading,
  setOccupationList,
  setPagination,
} from ".";

import { masterOccupationApi } from "./services";

import { message } from "antd";

export const getOccupationsAction = createAsyncThunk(
  "GET_USERS_ACTION",

  async (arg: any, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const res: any = await dispatch(
        masterOccupationApi.endpoints.getOccupations.initiate(arg, {
          forceRefetch: true,
          subscribe: true,
        })
      );

      const result = res?.data;

      if (result?.success) {
        dispatch(setOccupationList(result?.data || []));

        dispatch(setPagination(result?.pagination || {}));
      } else {
        message.error(result?.message || "Failed to fetch occupations");
      }

      return result;
    } catch (error: any) {
      dispatch(setError(error.toString()));
    } finally {
      dispatch(setLoading(false));
    }
  }
);