import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  setError,
  setLoading,
  setPagination,
  setUserList,
} from ".";

import { userApi } from "./services";

import { message } from "antd";

export const getUsersAction = createAsyncThunk(
  "GET_USERS_ACTION",

  async (arg: any, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const res: any = await dispatch(
        userApi.endpoints.getUsers.initiate(arg, {
          forceRefetch: true,
          subscribe: true,
        })
      );

      const result = res?.data;

      if (result?.success) {
        dispatch(setUserList(result?.data || []));

        dispatch(setPagination(result?.pagination || {}));
      } else {
        message.error(result?.message || "Failed to fetch users");
      }

      return result;
    } catch (error: any) {
      dispatch(setError(error.toString()));
    } finally {
      dispatch(setLoading(false));
    }
  }
);