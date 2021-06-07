import {
	SEARCHING_ITEMS,
	SEARCHING_ITEMS_SUCCESS,
	SEARCHING_ITEMS_FAILED,
	SEARCHING_ITEM_DETAIL,
	SEARCHING_ITEM_DETAIL_FAILED,
	SEARCHING_ITEM_DETAIL_SUCCESS,
} from "../types";

const initialState = {
	searchText:"",
	items: {},
	itemDetail: {},
	loading: false,
	error: null,
};

export default function itemsReducer(state = initialState, action) {
	switch (action.type) {
		case SEARCHING_ITEMS:
			return {
				...state,
				searchText:action.payload,
				items: {},
				loading: true,
				error: null,
			};
		case SEARCHING_ITEMS_SUCCESS:
			return {
				...state,
				items: action.payload,
				loading: false,
			};
		case SEARCHING_ITEMS_FAILED:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case SEARCHING_ITEM_DETAIL:
			return {
				...state,
				loading: true,
			};
		case SEARCHING_ITEM_DETAIL_SUCCESS:
			return {
				...state,
				loading: false,
				itemDetail: action.payload,
			};
		case SEARCHING_ITEM_DETAIL_FAILED:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
}
