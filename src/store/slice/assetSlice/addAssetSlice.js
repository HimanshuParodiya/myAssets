import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for adding a new asset
export const addAsset = createAsyncThunk(
    'assets/addAsset',
    async (assetData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/assets/add', assetData);
            console.log("Res", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const addAssetsSlice = createSlice({
    name: 'assets',
    initialState: {
        assets: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAsset.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addAsset.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.assets.push(action.payload);
            })
            .addCase(addAsset.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default addAssetsSlice;
