import { IOccupation, paginationInit } from "@/redux/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface IOccupationState {
  loading: boolean;
  errorMsg: string | null;

  occupationList: IOccupation[];

  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const initialState: IOccupationState = {
  loading: false,

  errorMsg: null,

  occupationList: [],

  pagination: paginationInit,
};

const occupationSlice = createSlice({
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
    setOccupationList: (state, action: PayloadAction<IOccupation[]>) => {
      state.occupationList = action.payload;
    },

    // PAGINATION
    setPagination: (state, action: PayloadAction<any>) => {
      state.pagination = action.payload;
    },

    // CLEAR USERS
    clearOccupations: (state) => {
      state.occupationList = [];
    },
  },
});

export const {
  setLoading,
  setError,
  setOccupationList,
  setPagination,
  clearOccupations,
} = occupationSlice.actions;

export default occupationSlice.reducer;