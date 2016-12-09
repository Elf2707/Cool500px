/**
 * Created by Elf on 06.06.2016.
 */
import { combineReducers } from 'redux';
import navReducer from './navReducer';
import photosList from './photosList';

export default combineReducers({
    navReducer,
    photosList,
});