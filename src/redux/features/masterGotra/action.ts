import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  setError,
  setGotraList,
  setLoading,
  setPagination,
} from ".";

import { masterGotraApi } from "./services";

import { message } from "antd";

export const getGotrasAction = createAsyncThunk(
  "GET_USERS_ACTION",

  async (arg: any, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const res: any = await dispatch(
        masterGotraApi.endpoints.getGotras.initiate(arg, {
          forceRefetch: true,
          subscribe: true,
        })
      );

      const result = res?.data;

      if (result?.success) {
        dispatch(setGotraList(result?.data || []));

        dispatch(setPagination(result?.pagination || {}));
      } else {
        message.error(result?.message || "Failed to fetch gotras");
      }

      return result;
    } catch (error: any) {
      dispatch(setError(error.toString()));
    } finally {
      dispatch(setLoading(false));
    }
  }
);