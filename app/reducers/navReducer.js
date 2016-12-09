/**
 * Created by Elf on 24.08.2016.
 */
import { NavigationExperimental } from 'react-native';

import * as ActionTypes from './../constants/NavActionTypes';

const {
    StateUtils: NavigationStateUtils
    } = NavigationExperimental;

const initState = {
    index: 0,
    routes: [{
        key: 'photosList',
        title: 'Popular 500',
    }]
};

export default function navReducer(state = initState, action) {
    switch (action.type) {
        case ActionTypes.PUSH_ROUTE:
            let {payload: route} = action;

            if (state.routes[state.index].key === (route && route.key)) {
                return state;
            } else {
                return NavigationStateUtils.push(state, route);
            }

        case ActionTypes.POP_ROUTE:
            if (state.index === 0 || state.routes.length === 1) {
                return state;
            } else {
                return NavigationStateUtils.pop(state);
            }

        case ActionTypes.REPLACE_ROUTE:
            route = action.payload;

            if (state.index === 0 || state.routes.length === 1
                || state.routes[state.index].key === (route && route.key)) {
                return state;
            } else {
                // Replace current page with new one
                return NavigationStateUtils.replaceAt(state, key, state.routes[state.index]);
            }

        default:
            return state;
    }
}