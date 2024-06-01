import { configureStore } from "@reduxjs/toolkit";
import getAllAssetSlice from "./slice/assetSlice/getAllAssetSlice";
import getAllTicketSlice from "./slice/ticketSlice/getAllTicketSlice";
import addAssetsSlice from "./slice/assetSlice/addAssetSlice";

const store = configureStore({
    reducer: {
        allAssets: getAllAssetSlice,
        allTickets: getAllTicketSlice,
        addAssets: addAssetsSlice,
    }
})

export default store