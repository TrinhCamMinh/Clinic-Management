import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <main>
            <div className='max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8'>
                <div className='max-w-lg mx-auto text-center'>
                    <div className='pb-6'>
                        <img src='https://floatui.com/logo.svg' width={150} className='mx-auto' alt='NotFound Logo' />
                    </div>
                    <h3 className='text-gray-800 dark:text-white text-4xl font-semibold sm:text-5xl'>Page not found</h3>
                    <p className='text-gray-600 dark:text-white mt-3'>
                        Sorry, the page you are looking for could not be found or has been removed.
                    </p>
                    <div className='flex flex-wrap items-center justify-center gap-3 mt-4'>
                        <a
                            href='/'
                            className='block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg'
                        >
                            Go back
                        </a>
                        <Link
                            to='#'
                            className='block py-2 px-4 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:text-black font-medium duration-150 active:bg-gray-100 border rounded-lg'
                        >
                            Contact support
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default NotFound;
