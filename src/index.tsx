import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import {HashRouter} from 'react-router-dom'
import {App} from './App'
import {Provider} from 'react-redux/es/exports'
import {store} from './bll/store'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>
    </React.StrictMode>
)

reportWebVitals()