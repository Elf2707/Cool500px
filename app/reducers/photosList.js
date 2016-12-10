/**
 * Created by Elf on 06.06.2016.
 */
import * as ActionTypes from '../constants/PhotoListActionTypes';

const initialState = {
    currentPage: 1,
    totalPages: -1,
    totalItems: 0,
    photos: [],
    selectedPhoto: null,
    isPhotosPending: false,
    isError : false,
};

export default function photosList(state = initialState, action = {}) {
    switch (action.type) {
        case ActionTypes.TRY_FETCH_PHOTOS:
            return Object.assign({}, state, {
                isPhotosPending: true,
                isError: false,
            });

        case ActionTypes.PHOTOS_FETCHED_SUCCESS:
            return Object.assign({}, state, {
                photos: state.photos.concat(action.payload.photos),
                currentPage: action.payload.current_page,
                totalPages: action.payload.total_page,
                totalItems: action.payload.total_items,
                isPhotosPending: false,
                isError: false,
            });

        case ActionTypes.PHOTOS_FETCHED_ERROR:
            return Object.assign({}, state, {
                isPhotosPending: false,
                isError: true,
            });

        case ActionTypes.PHOTO_SELECTED:
            return Object.assign({}, state, {
                selectedPhoto: action.payload,
            });

        case ActionTypes.PHOTOS_CLEAR:
            return Object.assign({}, state, {
                currentPage: 1,
                totalPages: -1,
                totalItems: 0,
                photos: [],
                selectedPhoto: null,
                isPhotosPending: false,
                isError : false,
            });

        default:
            return state;
    }
}