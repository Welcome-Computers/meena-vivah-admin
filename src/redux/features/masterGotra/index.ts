import { IGotra, paginationInit } from "@/redux/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface IGotraState {
  loading: boolean;
  errorMsg: string | null;

  gotraList: IGotra[];

  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const initialState: IGotraState = {
  loading: false,

  errorMsg: null,

  gotraList: [],

  pagination: paginationInit,
};

const gotraSlice = createSlice({
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
    setGotraList: (state, action: PayloadAction<IGotra[]>) => {
      state.gotraList = action.payload;
    },

    // PAGINATION
    setPagination: (state, action: PayloadAction<any>) => {
      state.pagination = action.payload;
    },

    // CLEAR USERS
    clearGotras: (state) => {
      state.gotraList = [];
    },
  },
});

export const {
  setLoading,
  setError,
  setGotraList,
  setPagination,
  clearGotras,
} = gotraSlice.actions;

export default gotraSlice.reducer;