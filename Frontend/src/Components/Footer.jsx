import { Link, useLocation } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import { IoIosPerson } from 'react-icons/io';
import { CiPill } from 'react-icons/ci';
import { FaVirus } from 'react-icons/fa6';
import { IoReceipt } from 'react-icons/io5';
import { useEffect } from 'react';

const Footer = () => {
    let location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        const button = document.querySelector(`[data-path='${currentPath}']`);

        //* Path that doest not exist in Footer Navigation List
        if (!button) {
            return;
        }

        const currentActiveButton = document.querySelector('button.active');

        if (currentActiveButton) {
            currentActiveButton.classList.remove('active');
        }
        button.classList.add('active');
    }, [location]);

    return (
        <div className='btm-nav'>
            <button className='text-primary' data-path='/home'>
                <Link to='/'>
                    <div className='tooltip tooltip-primary' data-tip='Trang Chủ'>
                        <MdHome className='h-5 w-5' />
                    </div>
                </Link>
            </button>

            <button className='text-primary' data-path='/masterdata/patient'>
                <Link to='/masterdata/patient'>
                    <div className='tooltip tooltip-primary' data-tip='Masterdata Bệnh nhân'>
                        <IoIosPerson className='h-5 w-5' />
                    </div>
                </Link>
            </button>

            <button className='text-primary' data-path='/masterdata/medicine'>
                <Link to='/masterdata/medicine'>
                    <div className='tooltip tooltip-primary' data-tip='Masterdata Thuốc'>
                        <CiPill className='h-5 w-5' />
                    </div>
                </Link>
            </button>

            <button className='text-primary' data-path='/masterdata/disease'>
                <Link to='/masterdata/disease'>
                    <div className='tooltip tooltip-primary' data-tip='Masterdata Triệu Chứng'>
                        <FaVirus className='h-5 w-5' />
                    </div>
                </Link>
            </button>

            <button className='text-primary' data-path='/masterdata/receipt'>
                <Link to='/masterdata/receipt'>
                    <div className='tooltip tooltip-primary' data-tip='Phiếu Khám Bệnh'>
                        <IoReceipt className='h-5 w-5' />
                    </div>
                </Link>
            </button>
        </div>
    );
};

export default Footer;
