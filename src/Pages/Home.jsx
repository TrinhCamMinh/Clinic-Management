import { Card } from '../Components';
import { HomeData } from '../Mocks/data';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
    return (
        <div className='flex flex-col gap-4 h-screen'>
            <main className='flex flex-col xl:gap-8 container'>
                <header className='flex items-center justify-center gap-2 mt-4'>
                    <h2 className='w-fit font-extrabold text-2xl xl:text-4xl text-[#F9004D] italic'>
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                `Xin chào Admin`,
                                2000, // wait 1s before replacing "Mice" with "Hamsters"
                                `Chúc Admin làm việc thật hiệu quả nhé`,
                                2000,
                            ]}
                            wrapper='span'
                            speed={50}
                            repeat={Infinity}
                        />
                    </h2>
                    <div className='text-4xl ml-2 hidden lg:block'>🙋‍♂️</div>
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
                    <p className='font-bold'>Copyright © 2024 - All right reserved by MK Team</p>
                </aside>
            </footer>
        </div>
    );
};

export default Home;
