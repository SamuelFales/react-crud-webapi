import { combineReducers } from 'redux';
import { authentication } from './auth.reducer';

const rootReducer = combineReducers({
    authentication
});
export default rootReducer;