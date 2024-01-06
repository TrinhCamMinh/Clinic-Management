import { Navbar, Card } from '../Components';
import { HomeData } from '../Mocks/data';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex flex-col gap-4 h-screen'>
            <nav>
                <Navbar />
            </nav>

            <main className='flex flex-col xl:gap-8 container'>
                <header className='flex items-center justify-center gap-2'>
                    <h2 className='w-fit font-extrabold text-xl xl:text-4xl text-[#F9004D] italic'>
                        Chào mừng Anh Minh đã quay trở lại
                    </h2>

                    <label className='swap swap-flip text-4xl ml-4'>
                        {/* this hidden checkbox controls the state */}
                        <input type='checkbox' />
                        <div className='swap-off'>🥳</div>
                        <div className='swap-on'>😉</div>
                    </label>
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
