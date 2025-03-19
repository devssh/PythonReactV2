import { configureStore } from '@reduxjs/toolkit';
import connectionTestReducer from '../reducers/connectionTestService/connectionTestSlice';
import metricReducer from '../reducers/metricService/metricSlice';
import networkReducer from '../reducers/networkService/networkSlice';
import filesReducer from '../reducers/filesService/filesSlice';
import localReducer from '../reducers/localService/localSlice';
import databaseReducer from '../reducers/databaseService/databaseSlice';
import sampleReducer from '../reducers/sampleService/sampleSlice';

export const store = configureStore({
  reducer: {
    connectionTest: connectionTestReducer,
    metric: metricReducer,
    network: networkReducer,
    files: filesReducer,
    local: localReducer,
    database: databaseReducer,
    sample: sampleReducer
  },
});
