import { Home, NotFound, Disease, History, Medicine, Patient, Receipt, Login } from './Pages';
import { Route, Routes, Navigate } from 'react-router-dom';
import { PrimaryLayout } from './Layouts';

const App = () => {
    const user = JSON.parse(sessionStorage.getItem('userInfo'));

    return (
        <Routes>
            <Route path='/' element={user ? <Navigate to={'home'} /> : <Login />} />

            <Route path='/home' element={<Home />} />

            <Route path='/masterdata' element={<PrimaryLayout />}>
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
