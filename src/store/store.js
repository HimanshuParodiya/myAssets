import { configureStore } from "@reduxjs/toolkit";
import getAllAssetSlice from "./slice/assetSlice/getAllAssetSlice";
import getAllTicketSlice from "./slice/ticketSlice/getAllTicketSlice";

const store = configureStore({
    reducer: {
        allAssets: getAllAssetSlice,
        allTickets: getAllTicketSlice,
    }
})

export default store