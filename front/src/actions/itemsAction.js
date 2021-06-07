import {
	SEARCHING_ITEMS,
	SEARCHING_ITEMS_SUCCESS,
	SEARCHING_ITEMS_FAILED,
	SEARCHING_ITEM_DETAIL,
	SEARCHING_ITEM_DETAIL_SUCCESS,
	SEARCHING_ITEM_DETAIL_FAILED,
} from "../types";
import client from "../config/client";

//Buscar items
export function searchItemsAction(searchTxt) {
	return (dispatch) => {
		dispatch(searchItems(searchTxt));

		try {
			client
				.get(`/api/items?search=${searchTxt}`)
				.then((resp) => {
					dispatch(searchItemsSuccess(resp.data));
				})
				.catch((error) => {
					dispatch(
						searchItemsFailed(
							"Ocurrió un error, intenta nuevamente. " + error.message
						)
					);
				});
		} catch (error) {
			//console.log(error)
			dispatch(
				searchItemsFailed("Ocurrió un error, intenta nuevamente." + error)
			);
		}
	};
}

const searchItems = (searchTxt) => ({
	type: SEARCHING_ITEMS,
	payload: searchTxt,
});

const searchItemsSuccess = (arrItems) => ({
	type: SEARCHING_ITEMS_SUCCESS,
	payload: arrItems,
});

const searchItemsFailed = (msgerror) => ({
	type: SEARCHING_ITEMS_FAILED,
	payload: msgerror,
});

//Detalles de un item
export function searchItemDetailsAction(id) {
	return (dispatch) => {
		dispatch(searchItemDetails());
		try {
			client
				.get(`/api/items/${id}`)
				.then((resp) => {
					dispatch(searchItemDetailsSuccess(resp.data));
				})
				.catch((error) => {
					dispatch(
						searchItemDetailsFailed(
							"Ocurrió un error al obtener el artículo, intenta nuevamente. " +
								error.message
						)
					);
				});
		} catch (error) {
			dispatch(
				searchItemDetailsFailed(
					"Ocurrió un error al obtener el artículo, intenta nuevamente. " +
						error
				)
			);
		}
	};
}

const searchItemDetails = () => ({
	type: SEARCHING_ITEM_DETAIL,
});

const searchItemDetailsSuccess = (itemDetail) => ({
	type: SEARCHING_ITEM_DETAIL_SUCCESS,
	payload: itemDetail,
});

const searchItemDetailsFailed = (msgerror) => ({
	type: SEARCHING_ITEM_DETAIL_FAILED,
	payload: msgerror,
});
