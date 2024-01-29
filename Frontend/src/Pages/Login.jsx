import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Configs/firebase';
import { Alert } from '../utils/Alert';

const Login = () => {
    const userEmail = useRef(null);
    const userPassword = useRef(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userInfo = {
                userEmail: userEmail.current.value,
                userPassword: userPassword.current.value,
            };

            const userCredential = await signInWithEmailAndPassword(auth, userInfo.userEmail, userInfo.userPassword);
            const { displayName, email, isAnonymous, metadata, phoneNumber } = userCredential.user;

            //* Save the user data info to local storage
            const savedUserData = JSON.stringify({ displayName, email, isAnonymous, metadata, phoneNumber });
            localStorage.setItem('userData', savedUserData);

            //* Navigate user to receipt page after login successfully
            navigate('/masterdata/receipt');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert({ toast: true, icon: 'error', title: errorCode, text: errorMessage });
        }
    };

    return (
        <section className='bg-white h-screen'>
            <div className='h-full grid grid-cols-1 lg:grid-cols-2'>
                <div className='flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24'>
                    <div className='xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md'>
                        <h2 className='text-8xl lg:text-4xl font-bold leading-tight text-black'>
                            Sign in to Clinic 4.0
                        </h2>
                        <p className='mt-2 text-4xl lg:text-base text-gray-600'>
                            Dont have an account?{' '}
                            <Link
                                to='developing'
                                className='ml-1 font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700'
                            >
                                Create a free account
                            </Link>
                        </p>

                        <form className='mt-8'>
                            <div className='space-y-5'>
                                <div>
                                    <label
                                        htmlFor='userEmail'
                                        className='text-4xl lg:text-base font-medium text-gray-900'
                                    >
                                        Email
                                    </label>
                                    <div className='mt-2.5'>
                                        <input
                                            ref={userEmail}
                                            type='email'
                                            name='userEmail'
                                            id='userEmail'
                                            placeholder='Enter user name to get started'
                                            className='block w-full rounded-md border border-gray-200 bg-gray-50 p-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:bg-white focus:outline-none'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className='flex items-center justify-between'>
                                        <label
                                            htmlFor='password'
                                            className='text-4xl lg:text-base font-medium text-gray-900'
                                        >
                                            Password
                                        </label>

                                        <Link
                                            to='developing'
                                            className='text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline focus:text-blue-700'
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className='mt-2.5'>
                                        <input
                                            ref={userPassword}
                                            type='password'
                                            name='password'
                                            id='password'
                                            placeholder='Enter your password'
                                            className='block w-full rounded-md border border-gray-200 bg-gray-50 p-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:bg-white focus:outline-none'
                                            autoComplete='current-password'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type='button'
                                        onClick={handleLogin}
                                        className='inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none'
                                    >
                                        Log in
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='flex items-center justify-center bg-gray-50 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24'>
                    <div>
                        <img
                            className='mx-auto w-full'
                            src='https://cdn.rareblocks.xyz/collection/celebration/images/signup/1/cards.png'
                            alt=''
                        />

                        <div className='mx-auto w-full max-w-md xl:max-w-xl'>
                            <h3 className='text-center text-2xl font-bold text-black'>Welcome back 🙋‍♂️</h3>
                            <p className='mt-2.5 text-center leading-relaxed text-gray-500'>
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
