import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk function to fetch all assets
export const fetchAllTicket = createAsyncThunk(
    "ticket/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("/api/v1/ticket/all-tickets");
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
export const deleteTicket = createAsyncThunk(
    "ticket/delete",
    async (assetId, thunkAPI) => {
        try {
            const response = await fetch(`/api/v1/ticket/delete-ticket/${assetId}`, {
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
    ticket: [],
    isLoading: false,
    isError: false,
    errorMessage: ""
};

const getAllTicketSlice = createSlice({
    name: "getAllTicket",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTicket.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = "";
            })
            .addCase(fetchAllTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ticket = action.payload;
            })
            .addCase(fetchAllTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            }).addCase(deleteTicket.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = "";
            })
            .addCase(deleteTicket.fulfilled, (state) => {
                state.isLoading = false;
                // Optionally, you can remove the deleted asset from the state
            })
            .addCase(deleteTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
    },
});

export default getAllTicketSlice.reducer;
