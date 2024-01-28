import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { IoMdHelpCircleOutline, IoIosPerson } from 'react-icons/io';
import { CiPill } from 'react-icons/ci';
import { FaVirus } from 'react-icons/fa6';
import { IoReceipt } from 'react-icons/io5';

import { signOut } from 'firebase/auth';
import { auth } from '../Configs/firebase';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('userData');

            navigate('/login');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert({ toast: true, icon: 'error', title: errorCode, text: errorMessage });
        }
    };

    return (
        <aside
            id='separator-sidebar'
            className='fixed top-0 left-0 z-40 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'
            aria-label='Sidebar'
        >
            <div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800'>
                <ul className='space-y-2 font-medium'>
                    <Link to={'/'}>
                        <li className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                            <FaHome className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                            <span className='ms-3'>Home</span>
                            <span className='ms-3 bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300'>
                                Mới
                            </span>
                        </li>
                    </Link>

                    <button className='w-full opacity-50' disabled={true}>
                        <li className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                            <MdSpaceDashboard className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                            <span className='ms-3'>Dashboard</span>
                            <span className='ms-3 bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300'>
                                Đang phát triển
                            </span>
                        </li>
                    </button>

                    <Link to={'/masterdata/patient'}>
                        <li className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                            <IoIosPerson className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                            <span className='ms-3'>MasterData Patient</span>
                        </li>
                    </Link>
                    <Link to={'/masterdata/medicine'}>
                        <li className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                            <CiPill className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                            <span className='ms-3'>MasterData Medicine</span>
                        </li>
                    </Link>
                    <Link to={'/masterdata/disease'}>
                        <li className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                            <FaVirus className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                            <span className='ms-3'>MasterData Disease</span>
                        </li>
                    </Link>
                    <Link to={'/masterdata/receipt'}>
                        <li className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                            <IoReceipt className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                            <span className='ms-3'>MasterData Receipt</span>
                        </li>
                    </Link>
                </ul>

                {/* Divider Here */}

                <ul className='pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700'>
                    <li>
                        <Link className='flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'>
                            <IoMdHelpCircleOutline className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                            <span className='ms-3'>Help</span>
                        </Link>
                    </li>
                    <li>
                        <button className='w-full' onClick={handleLogout}>
                            <Link className='flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'>
                                <FaSignOutAlt className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                <span className='ms-3'>Sign Out</span>
                            </Link>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
