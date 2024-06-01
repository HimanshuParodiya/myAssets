import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk function to fetch all assets
export const fetchAllAssets = createAsyncThunk(
    "assets/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("/api/v1/assets/all-assets");
            const data = await response.json();
            if (!response.ok) {
                return thunkAPI.rejectWithValue(data);
            }
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Thunk function to delete an asset by ID
export const deleteAsset = createAsyncThunk(
    "assets/delete",
    async (assetId, thunkAPI) => {
        try {
            const response = await fetch(`/api/v1/assets/delete-asset/${assetId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (!response.ok) {
                return thunkAPI.rejectWithValue(data);
            }
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    assets: [],
    isLoading: false,
    isError: false,
    errorMessage: ""
};

const getAllAssetSlice = createSlice({
    name: "getAllAssets",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAssets.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = "";
            })
            .addCase(fetchAllAssets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.assets = action.payload;
            })
            .addCase(fetchAllAssets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(deleteAsset.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = "";
            })
            .addCase(deleteAsset.fulfilled, (state) => {
                state.isLoading = false;
                // Optionally, you can remove the deleted asset from the state
            })
            .addCase(deleteAsset.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            });
    },
});

export default getAllAssetSlice.reducer;
