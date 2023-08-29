import { useContext } from 'react';
import HeroSection from './HeroSection';
import HomeBlog from './Homeblog/HomeBlog';
import { AuthContext } from '../../Components/Authprovider/Authprovider';
// import StickyPanel from './StickyPanel/StickyPanel';
import Blog from '../Blog/Blog';
import About from '../About/About';

const Home = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <div>

                {
                    !user ? <>
                        <HeroSection></HeroSection>
                        <HomeBlog></HomeBlog>
                        <About></About>
                    </> :
                        <div className='flex flex-col-reverse md:flex-row gap-4  max-w-7xl mx-auto'>
                            {/* Left Col */}
                            <div className='bg-blue-200 w-full '>
                                <Blog></Blog>
                            </div>

                            {/* Right Sticky Col */}
                            {/* <div className='bg-theme-accent w-full md:w-1/5 hidden md:block p-4'>
                                <StickyPanel></StickyPanel>
                            </div> */}
                        </div>
                }

            </div>
        </div>
    );
};

export default Home;