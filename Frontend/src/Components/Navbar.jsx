import { Link } from 'react-router-dom';
import { Themes } from '../Mocks/data';

const Navbar = () => {
    const handleChangeTheme = (event) => {
        const selectedTheme = event.target.value;
        //* This is used for setting class either dark/light for TailwindCSS component
        const themeValue = event.target.dataset.theme;

        const htmlElement = document.documentElement;
        htmlElement.dataset.theme = selectedTheme;

        //* Clear all the current class and assign the new theme value in HTML class
        //* To make normal TailwindCSS component change color
        //* And save the value to session storage
        htmlElement.classList.remove(...htmlElement.classList);
        htmlElement.classList.add(themeValue);

        //* Save the data to local storage
        localStorage.setItem('themeInfo', JSON.stringify({ selectedTheme, themeValue }));

        //* Trigger a custom event when we select a new theme
        //* This will fire a custom event so that every AG Grid Component will catch this
        //* event and change theme according to themeValue in local storage
        //* Include data in the custom event
        const themeChangeEvent = new CustomEvent('themeChange', {
            detail: { selectedTheme, themeValue },
        });
        window.dispatchEvent(themeChangeEvent);
    };

    return (
        <div className='navbar bg-base-300'>
            <div className='flex-1'>
                {/* Open Sidebar Menu */}
                <button
                    data-drawer-target='separator-sidebar'
                    data-drawer-toggle='separator-sidebar'
                    aria-controls='separator-sidebar'
                    type='button'
                    className='inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                >
                    <span className='sr-only'>Open sidebar</span>
                    <svg
                        className='w-6 h-6'
                        aria-hidden='true'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            clipRule='evenodd'
                            fillRule='evenodd'
                            d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                        ></path>
                    </svg>
                </button>
                <Link to='/' className='btn btn-ghost text-xl'>
                    Jenkins
                </Link>
            </div>

            <div>
                <div className='dropdown dropdown-end'>
                    <button tabIndex={0} className='btn m-1'>
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
                    </button>
                    <ul
                        tabIndex={-1}
                        className='dropdown-content z-100 p-2 shadow-2xl bg-base-300 rounded-box w-52 mt-2'
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
                                        data-theme={item.theme}
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
