import { getLocationReducer } from "../reducers/getLocationReducer";
import inforBookReducer from "../reducers/inforBookReducer";
import authenReducer from "../reducers/authenReducer";
// import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { legacy_createStore as createStore } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { AsyncStorage } from "react-native";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["getLocationReducer", "authenReducer"],
  // whitelist: ['getLocationReducer']
};

const rootReducer = combineReducers({
  getLocationReducer: getLocationReducer,
  authenReducer: authenReducer,
  inforBookReducer: inforBookReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });
// export default store;
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
// export default rootReducer
