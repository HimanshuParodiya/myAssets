import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk function to fetch all assets
export const fetchAllTicket = createAsyncThunk(
    "ticket/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("https://myassets-api.onrender.com/api/v1/ticket/all-tickets");
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
            const response = await fetch(`https://myassets-api.onrender.com/api/v1/ticket/delete-ticket/${assetId}`, {
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

export const updateTicket = createAsyncThunk(
    "ticket/update",
    async ({ assetId, assetData }, thunkAPI) => {
        try {
            // console.log("assetID", assetId);
            // console.log("assetData", assetData);

            const response = await fetch(`https://myassets-api.onrender.com/api/v1/ticket/update-ticket/${assetId}`, {
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
            }).addCase(updateTicket.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = "";
            })
            .addCase(updateTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                // Check if state.assets is an array
                if (Array.isArray(state.ticket)) {
                    // Optionally, update the state with the updated asset
                    state.ticket = state.ticket.map(ticket =>
                        ticket._id === action.payload._id ? action.payload : ticket
                    );
                } else {
                    // Log an error or handle the situation where state.assets is not an array
                    console.error("state.ticket is not an array:", state.assets);
                }
            })

            .addCase(updateTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            });

    },
});

export default getAllTicketSlice.reducer;
