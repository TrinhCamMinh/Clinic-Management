import { Navbar, Card } from '../Components';
import { HomeData } from '../Mocks/data';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex flex-col justify-between gap-4 h-screen'>
            <nav>
                <Navbar />
            </nav>

            <main className='flex flex-col gap-8'>
                <header className='flex items-center justify-center gap-2'>
                    <h2 className='w-fit font-extrabold text-2xl text-[#F9004D] italic'>
                        Chào mừng Anh Minh đã quay trở lại
                    </h2>

                    <label className='swap swap-flip text-4xl ml-4'>
                        {/* this hidden checkbox controls the state */}
                        <input type='checkbox' />

                        <div className='swap-off'>🥳</div>
                        <div className='swap-on'>😉</div>
                    </label>
                </header>

                <div className='flex justify-center items-center gap-8 flex-wrap'>
                    {HomeData.map((item) => {
                        return (
                            <Link to={item.link} key={item.name}>
                                <article className='cursor-pointer'>
                                    <Card image={item.img} name={item.name} />
                                </article>
                            </Link>
                        );
                    })}
                </div>
            </main>

            <footer className='footer footer-center p-4 bg-base-300 text-base-content'>
                <aside>
                    <p className='font-bold'>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
                </aside>
            </footer>
        </div>
    );
};

export default Home;
