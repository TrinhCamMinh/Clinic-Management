const Login = () => {
    return (
        <section class='bg-white'>
            <div class='grid grid-cols-1 lg:grid-cols-2'>
                <div class='flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24'>
                    <div class='xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md'>
                        <h2 class='text-3xl font-bold leading-tight text-black sm:text-4xl'>Sign in to Clinic 4.0</h2>
                        <p class='mt-2 text-base text-gray-600'>
                            Don't have an account?
                            <a
                                href='#'
                                title=''
                                class='ml-1 font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700'
                            >
                                Create a free account
                            </a>
                        </p>

                        <form action='#' method='POST' class='mt-8'>
                            <div class='space-y-5'>
                                <div>
                                    <label for='' class='text-base font-medium text-gray-900'>
                                        Email address
                                    </label>
                                    <div class='mt-2.5'>
                                        <input
                                            type='email'
                                            name=''
                                            id=''
                                            placeholder='Enter email to get started'
                                            class='block w-full rounded-md border border-gray-200 bg-gray-50 p-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:bg-white focus:outline-none'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div class='flex items-center justify-between'>
                                        <label for='' class='text-base font-medium text-gray-900'>
                                            Password
                                        </label>

                                        <a
                                            href='#'
                                            title=''
                                            class='text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline focus:text-blue-700'
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                    <div class='mt-2.5'>
                                        <input
                                            type='password'
                                            name=''
                                            id=''
                                            placeholder='Enter your password'
                                            class='block w-full rounded-md border border-gray-200 bg-gray-50 p-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:bg-white focus:outline-none'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type='submit'
                                        class='inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none'
                                    >
                                        Log in
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div class='flex items-center justify-center bg-gray-50 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24'>
                    <div>
                        <img
                            class='mx-auto w-full'
                            src='https://cdn.rareblocks.xyz/collection/celebration/images/signup/1/cards.png'
                            alt=''
                        />

                        <div class='mx-auto w-full max-w-md xl:max-w-xl'>
                            <h3 class='text-center text-2xl font-bold text-black'>Welcome back 🙋‍♂️</h3>
                            <p class='mt-2.5 text-center leading-relaxed text-gray-500'>
                                Hope you enjoy working here. Have a nice day sir 😉
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
