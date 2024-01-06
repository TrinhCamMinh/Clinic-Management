import { Footer, Navbar } from '../Components';
import { Outlet } from 'react-router-dom';

const Primary = () => {
    return (
        <>
            <nav>
                <Navbar />
            </nav>

            {/* Prose is TailwindCSS's font */}
            <main className='container px-8 py-2'>
                {/* Main content will be placed here */}
                <Outlet />
            </main>

            <footer className='mt-20'>
                <Footer />
            </footer>
        </>
    );
};

export default Primary;
