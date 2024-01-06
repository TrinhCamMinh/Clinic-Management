import { Home, NotFound, Disease, History, Medicine, Patient, Receipt, Login } from './Pages';
import { Route, Routes, Navigate } from 'react-router-dom';
import { PrimaryLayout } from './Layouts';
import { useAuth } from './hooks';
import Swal from 'sweetalert2';

const RequireAuth = ({ children, redirectTo }) => {
    let isAuthenticated = useAuth();

    if (!isAuthenticated) {
        Swal.fire({
            toast: true,
            position: 'top-right',
            icon: 'error',
            title: 'Không thể đăng nhập',
            text: 'Vui lòng đăng nhập lại!',
            timerProgressBar: true,
            timer: 2000,
        });
    }

    return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

const App = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <RequireAuth redirectTo='/login'>
                        <Home />
                    </RequireAuth>
                }
            />

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

export default App;
