/**
 * Created by Elf on 06.11.2016.
 */
import * as ActionTypes from './../constants/NavActionTypes'

export function pop() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.POP_ROUTE,
            payload: null,
        });
    }
}

export function push(route) {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.PUSH_ROUTE,
            payload: route,
        });
    }
}

export function replace(route) {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.REPLACE_ROUTE,
            payload: route,
        });
    }
}