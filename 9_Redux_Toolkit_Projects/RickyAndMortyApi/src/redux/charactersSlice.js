import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://rickandmortyapi.com/api/";

export const fetchCharacters = createAsyncThunk(
  "characters/getCharacters",
  async (page) => {
    const res = await axios
      .get(`character/?page=${page}`)
      .then((res) => res.data);
    return res;
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    page: 0,
    hasNextPage: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.page += 1;

        if (action.payload.length < 12) {
          state.hasNextPag = false
        }
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default charactersSlice.reducer;
