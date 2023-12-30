import { Link } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import { IoIosPerson } from 'react-icons/io';
import { CiPill } from 'react-icons/ci';
import { FaVirus } from 'react-icons/fa6';
import { IoReceipt } from 'react-icons/io5';
import { MdHistoryEdu } from 'react-icons/md';

const Footer = () => {
    return (
        <div className='btm-nav'>
            <button className='text-primary'>
                <Link to='/'>
                    <div className='tooltip' data-tip='Trang Chủ'>
                        <MdHome className='h-5 w-5' />
                    </div>
                </Link>
            </button>

            <button className='text-primary'>
                <Link to='/masterdata/patient'>
                    <div className='tooltip' data-tip='Masterdata Bệnh nhân'>
                        <IoIosPerson className='h-5 w-5' />
                    </div>
                </Link>
            </button>

            <button className='text-primary active'>
                <Link to='/masterdata/medicine'>
                    <div className='tooltip' data-tip='Masterdata Thuốc'>
                        <CiPill className='h-5 w-5' />
                    </div>
                </Link>
            </button>

            <button className='text-primary'>
                <Link to='/masterdata/disease'>
                    <div className='tooltip' data-tip='Masterdata Triệu Chứng'>
                        <FaVirus className='h-5 w-5' />
                    </div>
                </Link>
            </button>

            <button className='text-primary'>
                <Link to='/masterdata/receipt'>
                    <div className='tooltip' data-tip='Phiếu Khám Bệnh'>
                        <IoReceipt className='h-5 w-5' />
                    </div>
                </Link>
            </button>

            <button className='text-primary'>
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
