import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux/es/exports'
import {App, store} from 'app'

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

export * from './app'
export * from './common'
export * from './faetures'