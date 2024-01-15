import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://rickandmortyapi.com/api/";

export const fetchCharacters = createAsyncThunk(
  "characters/getCharacters",
  async () => {
    const res = await axios.get("character").then((res) => res.data);
    return res
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchCharacters.fulfilled, (state,action) => {
        state.items = action.payload
        console.log(action.payload)
    })
  }
});

export default charactersSlice.reducer;
