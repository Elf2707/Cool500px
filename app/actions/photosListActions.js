/**
 * Created by Elf on 06.11.2016.
 */
import * as NetworkUtils from './../utils/networkUtils';
import * as ActionTypes from './../constants/PhotoListActionTypes';
import PropsConfig from './../config/PropsConfig';
import ApiConfig from './../config/ApiConfig';

export function fetchPhotos(page) {
    return async (dispatch) => {
        // Set pending flag
        dispatch({
            type: ActionTypes.TRY_FETCH_PHOTOS,
            payload: false,
        });

        // Get photos
        try {
            if (!NetworkUtils.isInternetAvailable()) {
                throw new Error('Internet connection not available');
            }

            let apiUrl = `${ApiConfig.popular500pxPhotosUrl}${page}${ApiConfig.apiKey500px}`;

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            let ReqParams = {
                method: 'GET',
                headers: headers,
                mode: 'cors',
                cache: 'default'
            };

            const res = await fetch(apiUrl, ReqParams);

            // Test if we get error in response
            if  ( res.status !== 200 ) {
                // Error while getting photos
                throw new Error('Error while getting photos' + res.statusText);
            }

            const resJson = await res.json();

            // Fire the action with retrieved data
            dispatch({
                type: ActionTypes.PHOTOS_FETCHED_SUCCESS,
                payload: resJson
            });

        } catch (error) {
            console.error(error);

            // Fire error action
            dispatch({
                type: ActionTypes.PHOTOS_FETCHED_ERROR,
                payload: null,
            });
        }
    }
}

export function setSelectedPhoto(photo) {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.PHOTO_SELECTED,
            payload: photo,
        });
    }
}

export function clearPhotos() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.PHOTOS_CLEAR,
            payload: null,
        });
    }
}