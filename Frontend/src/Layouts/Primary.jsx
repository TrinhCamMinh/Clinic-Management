import { Navbar, SideBar } from '../Components';
import { Outlet } from 'react-router-dom';

const Primary = () => {
    return (
        <>
            <nav className='fixed top-0 z-100 w-full'>
                <Navbar />
            </nav>

            <SideBar />

            <main className='p-4 sm:ml-72 mt-14'>
                {/* Main content will be placed here */}
                <Outlet />
            </main>
        </>
    );
};

export default Primary;
