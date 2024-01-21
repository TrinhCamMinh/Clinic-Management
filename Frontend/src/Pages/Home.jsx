import { Navbar, Card } from '../Components';
import { HomeData } from '../Mocks/data';
import { Link } from 'react-router-dom';

const Home = () => {
    const { userName } = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <div className='flex flex-col gap-4 h-screen'>
            {/* HARDCODE */}
            {/* <nav>
                <Navbar />
            </nav> */}

            <main className='flex flex-col xl:gap-8 container'>
                <header className='flex items-center justify-center gap-2'>
                    <h2 className='w-fit font-extrabold text-4xl text-[#F9004D] italic'>
                        Chào mừng anh {userName} đã quay trở lại
                    </h2>

                    <div className='text-4xl ml-4'>🥳</div>
                </header>

                <div className='grid grid-cols-4 gap-8 mt-8 xl:mt-0'>
                    {HomeData.map((item) => {
                        return (
                            <Link to={item.link} key={item.name} className='col-span-4 xl:col-span-2'>
                                <article className='cursor-pointer w-full h-full'>
                                    <Card image={item.img} name={item.name} />
                                </article>
                            </Link>
                        );
                    })}
                </div>
            </main>

            <footer className='mt-auto footer footer-center p-4 bg-base-300 text-base-content'>
                <aside>
                    <p className='font-bold'>Copyright © 2024 - All right reserved by MINHCT / KHOALD</p>
                </aside>
            </footer>
        </div>
    );
};

export default Home;
