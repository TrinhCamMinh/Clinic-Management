import PropTypes from 'prop-types';
import 'ag-grid-community/styles/ag-grid.css'; //* Core AGGrid CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; //* AGGrid Theme

import { Home, NotFound, Disease, History, Medicine, Patient, Receipt, Login } from './Pages';
import { Route, Routes, Navigate } from 'react-router-dom';
import { PrimaryLayout } from './Layouts';
import { Alert } from './utils/Alert';
import { useAuth } from './hooks';

const RequireAuth = ({ children, redirectTo }) => {
    const { isAuthenticated, errorStatus, message } = useAuth();

    if (errorStatus) {
        Alert({ toast: true, icon: 'error', title: 'Không thể xác thực người dùng', text: message });
    }
    return isAuthenticated ? children : <Navigate to={redirectTo} replace={true} />;
};

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />

            <Route
                path='/masterdata'
                element={
                    <RequireAuth redirectTo='/login'>
                        <PrimaryLayout />
                    </RequireAuth>
                }
            >
                <Route path='patient' element={<Patient />} />
                <Route path='medicine' element={<Medicine />} />
                <Route path='disease' element={<Disease />} />
                <Route path='receipt' element={<Receipt />} />
                <Route path='history' element={<History />} />
            </Route>

            <Route path='/login' element={<Login />} />

            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

RequireAuth.propTypes = {
    redirectTo: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
export default App;
