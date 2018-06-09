import {combineReducers} from 'redux'
import postReucer from './postReducer';

export default combineReducers ({
    posts: postReucer
})