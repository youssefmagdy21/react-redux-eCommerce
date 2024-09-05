import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrefix from "./act/actGetProductsByCatPrefix";
import { TProduct } from "@customTypes/product";

import { TLoading } from "@customTypes/shared";
// defining type guard using typescript interface
interface ICategoriesState {
	records: TProduct[];
	// literal types
	loading: TLoading;
	error: string | null;
}

const initialState: ICategoriesState = {
	records: [],
	loading: "idle",
	error: null,
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		productsCleanUp: (state) => {
			state.records = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
			state.loading = "succeeded";
			state.records = action.payload;
		});
		builder.addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
			state.loading = "failed";
			// guard for unknown data
			// if(action.payload && typeof action.payload === "string") {

			//   state.error = action.payload;
			// }
			// or use casting if you know for sure the data type
			state.error = action.payload as string;
		});
	},
});

export const { productsCleanUp } = productsSlice.actions;
export { actGetProductsByCatPrefix };
export default productsSlice.reducer;
