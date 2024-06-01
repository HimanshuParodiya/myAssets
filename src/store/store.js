import { configureStore } from "@reduxjs/toolkit";
import getAllAssetSlice from "./slice/assetSlice/getAllAssetSlice";

const store = configureStore({
    reducer: {
        allAssets: getAllAssetSlice,
    }
})

export default store