import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { peopleApi } from './peopleApi';
import { RootState } from '../app/store';
import { SERVER_PAGE_SIZE_API_RESPONSE } from '../constants';

export interface IPagination {
  count: number;
  pages: number;
  previous: string | null;
  next: string | null;
}

export interface IPerson {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
}

const getIdFromUrlRegExp = /\/(\d+)\/$/;

export const getAllPeopleAsync = createAsyncThunk(
  'people/getAll',
  async (
    queryParams: { [key: string]: string | number } = {},
    { rejectWithValue }
  ) => {
    const response = await peopleApi.getAllPeople(queryParams);

    if (response.ok) {
      const loadedData = await response.json();
      const { results: data, ...pagination } = loadedData;

      const dataWithIds = data.map((item: IPerson) => ({
        ...item,
        id: item.url.match(getIdFromUrlRegExp)?.[1]
      }));

      return {
        status: response.status,
        data: dataWithIds,
        pagination: {
          ...pagination,
          pages: Math.ceil(pagination.count / SERVER_PAGE_SIZE_API_RESPONSE)
        }
      };
    }

    return rejectWithValue(response.statusText);
  }
);

export const getPeopleById = createAsyncThunk(
  'people/getById',
  async (peopleId: string, { rejectWithValue }) => {
    const response = await peopleApi.getPeopleById(peopleId);

    if (response.ok) {
      const result = await response.json();

      return { ...result, id: result.url.match(getIdFromUrlRegExp)?.[1] };
    }

    return rejectWithValue(response.statusText);
  }
);

const peopleAdapter = createEntityAdapter();
const initialState = peopleAdapter.getInitialState({
  status: 'idle',
  error: null,
  pagination: {
    count: 0,
    pages: 0,
    previous: null,
    next: null
  }
});

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    updatePeopleById: (state, action) => {
      peopleAdapter.updateOne(state, action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPeopleAsync.pending, (state) => {
        state.status = 'loading';
        peopleAdapter.removeAll(state);
      })
      .addCase(getAllPeopleAsync.fulfilled, (state, action) => {
        const { data, pagination } = action.payload;

        state.status = 'idle';
        state.pagination = pagination;

        peopleAdapter.setAll(state, data);
      })
      .addCase(getAllPeopleAsync.rejected, (state) => {
        state.status = 'failed';
      });
    builder
      .addCase(getPeopleById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPeopleById.fulfilled, (state, action) => {
        state.status = 'idle';

        peopleAdapter.setOne(state, action.payload);
      })
      .addCase(getPeopleById.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const { updatePeopleById } = peopleSlice.actions;

export default peopleSlice.reducer;

export const { selectAll: selectAllPeople, selectById: selectPeopleById } =
  peopleAdapter.getSelectors((state: RootState) => state.people);
