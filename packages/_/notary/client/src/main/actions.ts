import { MAIN_UPLOAD_READY, MAIN_GET_TEXT_READY } from './../constants';
import { createAction } from 'create-action';

export const uploadReady = createAction(MAIN_UPLOAD_READY)
export const getTextReady = createAction(MAIN_GET_TEXT_READY)