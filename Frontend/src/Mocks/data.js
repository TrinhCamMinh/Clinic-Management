import Patient from '../Assets/Patient_Home_Logo.jpg';
import Book from '../Assets/Book_Home_Logo.jpg';
import Disease from '../Assets/Disease_Home_Logo.jpg';
import Receipt from '../Assets/Receipt_Home_Logo.jpg';
import Medicine from '../Assets/Medicine_Home_Logo.jpg';

const HomeData = [
    {
        name: 'Master Data Bệnh Nhân',
        img: Patient,
        link: '/masterdata/patient'
    },
    {
        name: 'Master Data Dược Liệu',
        img: Medicine,
        link: '/masterdata/medicine'
    },
    {
        name: 'Master Data Triệu Chứng',
        img: Disease,
        link: '/masterdata/disease'
    },
    {
        name: 'Phiếu Khám Bệnh',
        img: Receipt,
        link: '/masterdata/receipt'
    },
    {
        name: 'Sổ Khám Bệnh',
        img: Book,
        link: '/masterdata/history'
    },
];

export { HomeData };
