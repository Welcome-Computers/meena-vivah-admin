import { IUser, paginationInit } from "@/redux/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface IUserState {
  loading: boolean;
  errorMsg: string | null;

  userList: IUser[];

  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const initialState: IUserState = {
  loading: false,

  errorMsg: null,

  userList: [],

  pagination: paginationInit,
};

const userSlice = createSlice({
  name: "USER_SLICE",

  initialState,

  reducers: {
    // LOADING
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // ERROR
    setError: (state, action: PayloadAction<string>) => {
      state.errorMsg = action.payload;
    },

    // USERS
    setUserList: (state, action: PayloadAction<IUser[]>) => {
      state.userList = action.payload;
    },

    // PAGINATION
    setPagination: (state, action: PayloadAction<any>) => {
      state.pagination = action.payload;
    },

    // CLEAR USERS
    clearUsers: (state) => {
      state.userList = [];
    },
  },
});

export const {
  setLoading,
  setError,
  setUserList,
  setPagination,
  clearUsers,
} = userSlice.actions;

export default userSlice.reducer;