import { createSlice } from "@reduxjs/toolkit";

const cartslice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalAmaunt:0,
        count: 0
    },
    reducers: {
        addToCart: (state, action)=> {
            const item = action.payload;
            const existing = state.items.find(i => i.id == item.id)
            if(existing){
             existing.quantity +=1
            }else{
                state.items.push({...item})
            }
            state.totalAmaunt += (item.price * item.quantity)
            state.count += item.quantity

        }
    }

})
export const {addToCart}  = cartslice.actions;
export default cartslice.reducer;




// {
//     id: "ad",
//     // all fildes of products
//     quantity: 2,
// }