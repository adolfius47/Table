"use strict"
import {combineReducers} from 'redux'
import * as Action from '../actions';


const data = (previousState = [], action = {}) => {

    switch (action.type) {
        case Action.ADD_POST:
            let newState=previousState.concat(action.payload)
            localStorage.setItem('posts', JSON.stringify(newState));
            return newState
        default:
            return previousState;


    }
}


export default combineReducers({
    data,


})