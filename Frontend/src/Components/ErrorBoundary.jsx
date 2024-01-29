'use client';

const ErrorBoundary = () => {
    return (
        <main>
            <div className='max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8'>
                <div className='max-w-lg mx-auto text-center'>
                    <div className='pb-6'>
                        <img src='https://floatui.com/logo.svg' width={150} className='mx-auto' alt='Error Logo' />
                    </div>
                    <h3 className='text-red-400 text-4xl font-bold sm:text-5xl'>Something Wrong 😥</h3>
                    <p className='text-red-400 mt-3'>Sorry, the server has been crashed. Please comeback later</p>
                    <div className='flex flex-wrap items-center justify-center gap-3 mt-4'>
                        <a
                            href='/'
                            className='block py-2 px-4 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:text-black font-medium duration-150 active:bg-gray-100 border rounded-lg'
                        >
                            Contact support
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ErrorBoundary;
