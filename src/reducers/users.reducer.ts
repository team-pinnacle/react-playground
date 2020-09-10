import { createSlice, createAsyncThunk, createSelector, EntityAdapter, createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { usersService } from "../services/users.service";
import { string } from "prop-types";

export type User = {
  name: string;
};

export type State = {
  loading: boolean;
  error: boolean;
  data: EntityState<User>
};


const usersAdapter = createEntityAdapter<User>();

const initialState = {
  loading: false,
  error: false,
  data: usersAdapter.getInitialState() || [],
};

export const getUsers = createAsyncThunk('get/users', async () => usersService.getUsers());

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    sort: (state, action) => {
      console.log(action);
    }
  },
  extraReducers: (bulder) => {
    bulder.addCase(getUsers.pending, (state, action) => {
      // state.loading
      state.loading = true;
    });
    
    bulder.addCase(getUsers.fulfilled, (state, action) => {
      // immerjs
      state.loading = false;
      // state.data = action.payload.data;
      usersAdapter.setAll(state.data, action.payload.data);
      console.log(state.data)
    });

    bulder.addCase(getUsers.rejected, (state, action) => {
      // state.loading
      state.loading = false;
    });
  }
});

export const stateSelector_ = (state: { [x: string]: unknown; users: State }): State => {
  return state.users;
}

// export const users_ = createSelector(stateSelector_, (state) => state.data);

export const { selectAll: users_ } = usersAdapter.getSelectors(
  (state: { [x: string]: unknown; users: State }) => stateSelector_(state).data
);


export default usersSlice.reducer;
