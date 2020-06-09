import {createReducer, createActions} from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    saveName: ['name'],

});

export const MainTypes = Types;

export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  name: '',
};

/* ------------- Reducers ------------- */

const saveName = (state = INITIAL_STATE, action) => {
  return {...state, name: action.name};
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [MainTypes.SAVE_NAME]: saveName,
});
