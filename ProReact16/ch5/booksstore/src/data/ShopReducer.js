import { ActionTypes } from "./Types";
export const ShopReducer = (storeData, action) => {
    switch (action.type) {
        case ActionTypes.DATA_LOAD:
            return {
                ...storeData,
                [action.payload.dataType]: action.payload.data
            };
            break;
    
        default:
            return storeData || {};
            break;
    }
};