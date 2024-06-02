
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for adding a new ticket
export const addTicket = createAsyncThunk(
    'tickets/addTicket',
    async (ticketData, { rejectWithValue }) => {
        try {
            // console.log("ticketData", ticketData);
            const response = await axios.post('/api/v1/ticket/raise', ticketData);
            // console.log("response.data", response.data);
            return response.data; // Assuming response.data is serializable
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const ticketSlice = createSlice({
    name: 'tickets',
    initialState: {
        tickets: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTicket.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTicket.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tickets.push(action.payload);
            })
            .addCase(addTicket.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default ticketSlice;