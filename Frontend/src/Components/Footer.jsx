import { Link } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import { IoIosPerson } from 'react-icons/io';
import { CiPill } from 'react-icons/ci';
import { FaVirus } from 'react-icons/fa6';
import { IoReceipt } from 'react-icons/io5';
import { MdHistoryEdu } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Footer = () => {
    let location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        const button = document.querySelector(`[data-path='${currentPath}']`);
        const currentActiveButton = document.querySelector('button.active');

        if(currentActiveButton) {
            currentActiveButton.classList.remove('active')
        }
        button.classList.add('active');
    }, [location]);

    return (
        <div className='btm-nav'>
            <button className='text-primary' data-path='/home'>
                <Link to='/'>
                    <div className='tooltip' data-tip='Trang Chủ'>
                        <MdHome className='h-5 w-5' />
                    </div>
                </Link>
            </button>

            <button className='text-primary' data-path='/masterdata/patient'>
                <Link to='/masterdata/patient'>
                    <div className='tooltip' data-tip='Masterdata Bệnh nhân'>
                        <IoIosPerson className='h-5 w-5' />
                    </div>
                </Link>
            </button>

            <button className='text-primary' data-path='/masterdata/medicine'>
                <Link to='/masterdata/medicine'>
                    <div className='tooltip' data-tip='Masterdata Thuốc'>
                        <CiPill className='h-5 w-5' />
                    </div>
                </Link>
            </button>

            <button className='text-primary' data-path='/masterdata/disease'>
                <Link to='/masterdata/disease'>
                    <div className='tooltip' data-tip='Masterdata Triệu Chứng'>
                        <FaVirus className='h-5 w-5' />
                    </div>
                </Link>
            </button>

            <button className='text-primary' data-path='/masterdata/receipt'>
                <Link to='/masterdata/receipt'>
                    <div className='tooltip' data-tip='Phiếu Khám Bệnh'>
                        <IoReceipt className='h-5 w-5' />
                    </div>
                </Link>
            </button>

            <button className='text-primary' data-path='/masterdata/history'>
                <Link to='/masterdata/history'>
                    <div className='tooltip' data-tip='Sổ Khám Bệnh'>
                        <MdHistoryEdu className='h-5 w-5' />
                    </div>
                </Link>
            </button>
        </div>
    );
};

export default Footer;
