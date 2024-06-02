import { configureStore } from "@reduxjs/toolkit";
import getAllAssetSlice from "./slice/assetSlice/getAllAssetSlice";
import getAllTicketSlice from "./slice/ticketSlice/getAllTicketSlice";
import addAssetsSlice from "./slice/assetSlice/addAssetSlice";
import addTicketSlice from "./slice/ticketSlice/addTicketSlice";

const store = configureStore({
    reducer: {
        allAssets: getAllAssetSlice,
        addAssets: addAssetsSlice,
        allTickets: getAllTicketSlice,
        raiseTicket: addTicketSlice
    }
})

export default store