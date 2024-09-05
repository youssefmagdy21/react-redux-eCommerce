import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { TCategory } from "@customTypes/category";
import { TLoading } from "@customTypes/shared";
// defining type guard using typescript interface
interface ICategoriesState {
	records: TCategory[];
	// literal types
	loading: TLoading;
	error: string | null;
}

const initialState: ICategoriesState = {
	records: [],
	loading: "idle",
	error: null,
};

const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(actGetCategories.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(actGetCategories.fulfilled, (state, action) => {
			state.loading = "succeeded";
			state.records = action.payload;
		});
		builder.addCase(actGetCategories.rejected, (state, action) => {
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

export { actGetCategories };
export default categoriesSlice.reducer;
