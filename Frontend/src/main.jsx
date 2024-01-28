import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { FallBackUI } from './Components';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary fallback={<FallBackUI />}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ErrorBoundary>
);
