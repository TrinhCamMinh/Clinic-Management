import 'ag-grid-community/styles/ag-grid.css'; //* Core AGGrid CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; //* AGGrid Theme

import { Home, NotFound, Disease, Medicine, Patient, Receipt, Login } from './Pages';
import { Route, Routes } from 'react-router-dom';
import { PrimaryLayout } from './Layouts';
import { Alert } from './utils/Alert';
import { useEffect } from 'react';
import { useAuth } from './hooks';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />

            <Route
                path='/masterdata'
                element={<PrimaryLayout /> }
            >
                <Route path='patient' element={<Patient />} />
                <Route path='medicine' element={<Medicine />} />
                <Route path='disease' element={<Disease />} />
                <Route path='receipt' element={<Receipt />} />
            </Route>

            <Route path='/login' element={<Login />} />

            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default App;
