import { Navbar, Card } from '../Components';
import { HomeData } from '../Mocks/data';

const Home = () => {
    return (
        <div className='flex flex-col justify-between gap-4 h-screen'>
            <nav>
                <Navbar />
            </nav>

            <main className='flex flex-col gap-8'>
                <header>
                    <h2 className='w-fit mx-auto font-extrabold text-2xl text-[#F9004D] italic'>
                        Chào mừng Anh Minh đã quay trở lại
                    </h2>
                </header>

                <div className='flex justify-center items-center gap-8 flex-wrap'>
                    {HomeData.map((item) => {
                        return (
                            <article key={item.name} className='cursor-pointer'>
                                <Card image={item.img} name={item.name} />
                            </article>
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
