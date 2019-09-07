import { combineReducers } from 'redux';
import { counterReducer } from './counter'

export const rootReducer = combineReducers({
    counterReducer,
  });