import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import Metrics from './Metrics';
import SystemMetrics from './SystemMetrics';
import ConnectionTest from './ConnectionTest';
import Today from './Today';
import Color from './Color';
import Pixel from './Pixel';
import RandomPixel from './RandomPixel';
import Graph from './Graph';
import FileReader from './FileReader';
import FileLogger from './FileLogger';
import AppService from './AppService';
import ReduxState from './ReduxState';
import Notifications from './components/Notifications';
import Database from './Database';
import Ideas from "./Ideas";
import Sample from './Sample';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
	<Router>
            <Routes>
                <Route exact path='/' exact element={<App />} />
                <Route path='/metrics' element={<Metrics />} />
                <Route path='/systemmetrics' element={<SystemMetrics />} />
                <Route path='/today' element={<Today />} />
                <Route path='/connectiontest' element={<ConnectionTest />} />
                <Route path='/color' element={<Color />} />
                <Route path='/pixel' element={<Pixel />} />
                <Route path='/randompixel' element={<RandomPixel />} />
                <Route path='/graph' element={<Graph />} />
                <Route path='/filereader' element={<FileReader />} />
                <Route path='/filelogger' element={<FileLogger />} />
                <Route path='/appservice' element={<AppService />} />
                <Route path='/reduxstate' element={<ReduxState />} />
                <Route path='/notifications' element={<Notifications />} />
                <Route path='/database' element={<Database />} />
                <Route path='/ideas' element={<Ideas />} />
                <Route path='/sample' element={<Sample />} />
            </Routes>
        </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
