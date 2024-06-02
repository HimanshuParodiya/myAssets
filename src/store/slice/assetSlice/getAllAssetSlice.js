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
export const updateAsset = createAsyncThunk(
    "assets/update",
    async ({ assetId, assetData }, thunkAPI) => {
        try {
            const response = await fetch(`/api/v1/assets/update-details/${assetId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(assetData),
            });
            const data = await response.json();
            // console.log("res data", data);
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
            }).addCase(updateAsset.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = "";
            })
            .addCase(updateAsset.fulfilled, (state, action) => {
                state.isLoading = false;
                // Check if state.assets is an array
                if (Array.isArray(state.assets)) {
                    // Optionally, update the state with the updated asset
                    state.assets = state.assets.map(asset =>
                        asset._id === action.payload._id ? action.payload : asset
                    );
                } else {
                    // Log an error or handle the situation where state.assets is not an array
                    console.error("state.assets is not an array:", state.assets);
                }
            })

            .addCase(updateAsset.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            });
    },
});

export default getAllAssetSlice.reducer;
