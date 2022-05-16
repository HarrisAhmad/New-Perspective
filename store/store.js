import {createStore} from 'redux';
import {StateReducer} from './reducers/reducer';

const store = createStore(StateReducer);

export default store;
