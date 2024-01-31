import PropTypes from 'prop-types';
import 'ag-grid-community/styles/ag-grid.css'; //* Core AGGrid CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; //* AGGrid Theme

import { Home, NotFound, Disease, History, Medicine, Patient, Receipt, Login } from './Pages';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { PrimaryLayout } from './Layouts';
import { Alert } from './utils/Alert';
import { useEffect } from 'react';
import { useAuth } from './hooks';

const RequireAuth = ({ children, redirectTo }) => {
    const navigate = useNavigate();
    const { dispatch } = useAuth();

    useEffect(() => {
        //* This will prevent user from manipulating with any browser storage
        const handleLocalStorageChange = () => {
            Alert({
                toast: true,
                icon: 'error',
                title: 'Phát hiện hành vi thao tác vi phạm đến xác thực người dùng',
                text: 'Vui lòng đăng nhập lại vào hệ thống',
            });

            dispatch({ type: 'LOGOUT' });
            return navigate('/login');
        };

        //* This event fire when browser storage detect change value
        window.addEventListener('storage', handleLocalStorageChange);

        //* Cleanup function
        return () => {
            // Remove event listener
            window.removeEventListener('storage', handleLocalStorageChange);
        };
    }, []);

    const user = JSON.parse(localStorage.getItem('userData'));

    if (!user) {
        Alert({
            toast: true,
            icon: 'error',
            title: 'Không thể xác thực người dùng',
            text: 'Vui lòng đăng nhập vào hệ thống',
        });
    }
    return user ? children : <Navigate to={redirectTo} replace={true} />;
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
