import { ActionTypes } from "./Types";

export const CartReducer = (storeData, action) => {
    let newStore = {cart: [], cartItems: 0, cartPrice: 0, ...storeData};
    switch (action.type) {
        case ActionTypes.CART_ADD:
            const p = action.payload.product;
            const q = action.payload.quantity;

            let existing = newStore.cart.find(item => item.product.id === p.id);
            if (existing) {
                existing.quantity += q;
            } else {
                newStore.cart = [...newStore.cart, action.payload];
            }
            newStore.cartItems += q;
            newStore.cartPrice += p.price * q;
            return newStore;

        case ActionTypes.CART_UPDATE:
            return newStore;
    
        default:
            break;
    }
};