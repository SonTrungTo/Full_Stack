import { createStore } from "redux";
import { ShopReducer } from "./ShopReducer";

export const BooksStoreDataStore = createStore(ShopReducer);