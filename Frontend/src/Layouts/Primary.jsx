import { Footer, Navbar } from '../Components';
import { Outlet } from 'react-router-dom';

const Primary = () => {
    return (
        <>
            <nav>
                <Navbar />
            </nav>

            {/* Prose is TailwindCSS's font */}
            <main className='prose'>
                {/* Main content will be placed here */}
                <Outlet />
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default Primary;
