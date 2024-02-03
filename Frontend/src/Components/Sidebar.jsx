import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { MdSpaceDashboard, MdEmail } from 'react-icons/md';
import { IoMdHelpCircleOutline, IoIosPerson } from 'react-icons/io';
import { CiPill } from 'react-icons/ci';
import { FaVirus } from 'react-icons/fa6';
import { IoReceipt } from 'react-icons/io5';

import { signOut } from 'firebase/auth';
import { auth } from '../Configs/firebase';
import { useAuth } from '../hooks';

const Sidebar = () => {
    const { dispatch } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch({ type: 'LOGOUT' });
            navigate('/login');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert({ toast: true, icon: 'error', title: errorCode, text: errorMessage });
        }
    };

    return (
        <>
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
                                <span className='ms-3'>Trang Chủ</span>
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
                                <span className='ms-3'>MasterData Bệnh Nhân</span>
                            </li>
                        </Link>
                        <Link to={'/masterdata/medicine'}>
                            <li className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                                <CiPill className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                <span className='ms-3'>MasterData Dược Liệu</span>
                            </li>
                        </Link>
                        <Link to={'/masterdata/disease'}>
                            <li className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                                <FaVirus className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                <span className='ms-3'>MasterData Triệu Chứng Bệnh</span>
                            </li>
                        </Link>
                        <Link to={'/masterdata/receipt'}>
                            <li className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                                <IoReceipt className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                <span className='ms-3'>Phiếu Khám Bệnh</span>
                            </li>
                        </Link>
                    </ul>

                    {/* Divider Here */}

                    <ul className='pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700'>
                        <li>
                            <button
                                className='w-full'
                                onClick={() => document.getElementById('help_modal').showModal()}
                            >
                                <Link className='flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'>
                                    <IoMdHelpCircleOutline className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                    <span className='ms-3'>Trợ Giúp</span>
                                </Link>
                            </button>
                        </li>
                        <li>
                            <button className='w-full' onClick={handleLogout}>
                                <Link className='flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'>
                                    <FaSignOutAlt className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                    <span className='ms-3'>Đăng Xuất</span>
                                </Link>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

            <dialog id='help_modal' className='modal'>
                <div className='modal-box w-4/12 max-w-5xl'>
                    <h3 className='font-bold text-2xl text-primary text-center uppercase'>thông tin hỗ trợ</h3>

                    <ul className='mt-8 grid grid-cols-3 italic'>
                        <li className='capitalize col-span-1'>
                            <p>kỹ thuật</p>
                            <div className='divider divider-neutral'></div>
                            <p>nghiệp vụ</p>
                            <div className='divider divider-neutral'></div>
                            <p>góp ý và báo lỗi</p>
                        </li>
                        <li className='font-bold col-span-2'>
                            <div className='flex flex-row items-center gap-4'>
                                <MdEmail className='w-5 h-5' /> trinhcamminh25112002@gmail.com
                            </div>
                            <div className='divider divider-neutral'></div>
                            <div className='flex flex-row items-center gap-4'>
                                <MdEmail className='w-5 h-5' /> ledangkhoa199@gmail.com
                            </div>
                            <div className='divider divider-neutral'></div>
                            <div className='flex flex-row items-center gap-4'>
                                <MdEmail className='w-5 h-5' /> trinhcamminh25112002@gmail.com
                            </div>
                        </li>
                    </ul>

                    <div className='modal-action'>
                        <form method='dialog'>
                            {/* if there is a button in form, it will close the modal */}
                            <button className='btn'>Đóng</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Sidebar;
