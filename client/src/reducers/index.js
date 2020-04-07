import { combineReducers } from 'redux';
import sessionReducer from './session';
import placesReducer from './places';
const rootReducer = combineReducers({
  sessionState: sessionReducer,
  placesState: placesReducer
});
export default rootReducer;
