import { combineEpics } from 'redux-observable';
import {counterEpic} from './counter' 

export const rootEpic = combineEpics(
    counterEpic,
  );
  