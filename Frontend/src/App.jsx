import { Home, NotFound } from './Pages';
import { Route, Routes } from 'react-router-dom';
import { PrimaryLayout } from './Layouts';
import { Disease, History, Medicine, Patient, Receipt } from './Pages';

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />

                <Route path='/masterdata' element={<PrimaryLayout />}>
                    <Route path='patient' element={<Patient />} />
                    <Route path='medicine' element={<Medicine />} />
                    <Route path='disease' element={<Disease />} />
                    <Route path='receipt' element={<Receipt />} />
                    <Route path='history' element={<History />} />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
