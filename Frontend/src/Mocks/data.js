import Patient from '../Assets/Patient_Home_Logo.jpg';
import Disease from '../Assets/Disease_Home_Logo.jpg';
import Receipt from '../Assets/Receipt_Home_Logo.jpg';
import Medicine from '../Assets/Medicine_Home_Logo.jpg';

const HomeData = [
    {
        name: 'Master Data Bệnh Nhân',
        img: Patient,
        link: '/masterdata/patient',
    },
    {
        name: 'Master Data Dược Liệu',
        img: Medicine,
        link: '/masterdata/medicine',
    },
    {
        name: 'Master Data Triệu Chứng',
        img: Disease,
        link: '/masterdata/disease',
    },
    {
        name: 'Phiếu Khám Bệnh',
        img: Receipt,
        link: '/masterdata/receipt',
    },
];

//! Remember to config theme in TailwindCSS config file when add new theme
const Themes = [
    {
        label: 'Sunset',
        value: 'sunset',
    },
    {
        label: 'Cupcake',
        value: 'cupcake',
    },
    {
        label: 'Retro',
        value: 'retro',
    },
    {
        label: 'Valentine',
        value: 'valentine',
    },
    {
        label: 'Dracula',
        value: 'dracula',
    },
    {
        label: 'Coffee',
        value: 'coffee',
    },
];

export { HomeData, Themes };
