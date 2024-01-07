import { Link } from 'react-router-dom';
import { Themes } from '../Mocks/data';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleChangeTheme = (event) => {
        const selectedTheme = event.target.value;
        const htmlElement = document.documentElement;
        htmlElement.dataset.theme = selectedTheme;
    };

    const handleLogout = () => {
        sessionStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <div className='navbar bg-base-300'>
            <div className='flex-1'>
                <Link to='/' className='btn btn-ghost text-xl'>
                    Jenkins
                </Link>
            </div>

            <div>
                <div className='dropdown dropdown-end mr-4 lg:mr-8'>
                    <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
                        <div className='w-10 rounded-full'>
                            <img
                                alt='Tailwind CSS Navbar component'
                                src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className='mt-3 z-[20] absolute p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'
                    >
                        <li>
                            <a className='justify-between'>
                                Profile
                                <span className='badge'>New</span>
                            </a>
                        </li>
                        <li>
                            <a>Settings</a>
                        </li>
                        <li onClick={handleLogout}>
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>

                <div className='dropdown dropdown-end'>
                    <div tabIndex={0} role='button' className='btn m-1'>
                        Theme
                        <svg
                            width='12px'
                            height='12px'
                            className='h-2 w-2 fill-current opacity-60 inline-block'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 2048 2048'
                        >
                            <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className='dropdown-content z-[20] p-2 shadow-2xl bg-base-300 rounded-box w-52 mt-4'
                        onChange={handleChangeTheme}
                    >
                        {Themes.map((item) => {
                            return (
                                <li key={item.value}>
                                    <input
                                        type='radio'
                                        name='theme-dropdown'
                                        className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
                                        aria-label={item.label}
                                        value={item.value}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
