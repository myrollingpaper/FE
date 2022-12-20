// src/redux/config/configStore.js

import { configureStore } from "@reduxjs/toolkit";
import boards from "../modules/boardsSlice";
const store = configureStore({
    reducer: { boards: boards},
});

export default store;
