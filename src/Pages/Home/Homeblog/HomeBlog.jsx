import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import Heading from '../../../Components/Shared/Heading/Heading';
import Loader from '../../../Components/Shared/Loader/Loader';

const HomeBlog = () => {

    const [blogs, setBlogs] = useState(null)
    const [tags, setTags] = useState([])
    const [newtag, setNewtag] = useState([])
    const [selectedTag, setSelectedTag] = useState('All')

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_API}/api/blogs`)
            .then(res => res.json())
            .then(data => {
                setBlogs(data)
            })
    }, [])

    const refresh = () => {
        fetch(`${import.meta.env.VITE_SERVER_API}/api/blogs`)
            .then(res => res.json())
            .then(data => {
                setBlogs(data)
            })
    }


    const allTags = blogs && tags.concat(...blogs?.map(blog => blog.category));

    allTags && allTags.map(tag => {
        if (!newtag.includes(tag)) {
            newtag.push(tag)
        }
    })


    let filteredBlog = blogs && blogs.filter(blog => blog.category.includes(selectedTag))

    if (selectedTag === "All") {
        filteredBlog = blogs;
        console.log("selectedTag1", selectedTag);
    }


    // console.log("selectedTag", selectedTag);


    return (
        <div className='bg-white py-16 md:py-20'>
            {
                blogs ?
                    <div className='max-w-7xl mx-auto px-2'>
                        <Heading
                            heading="Explore Intriguing Blogs"
                            subheading="Dive into a curated collection of captivating blogs within your favorite categories. Feed your curiosity, expand your knowledge, and stay updated with the latest insights and trends that pique your interest."
                        ></Heading>


                        {/* Card Container */}


                        <div className='grid grid-cols-1 md:grid-cols-4  md:gap-8 mt-8 md:mt-16'>

                            <div className='col-span-1 w-full h-min   bg-theme-accent p-4 rounded-md flex md:flex-col flex-wrap '>
                                <h2 className='mb-4 text-lg w-full font-semibold'>Filter By Category</h2>
                                <h2
                                    onClick={() => setSelectedTag("All")}
                                    className={`inline px-4 py-3 leading-none  md:w-full md:flex items-center md:pl-8 rounded-full mr-2 md:mt-0 mt-2 cursor-pointer hover:shadow-md  transition-all duration-200 ease-in-out select-none ${selectedTag === "All" ? 'bg-theme-primary text-white shadow-md' : 'bg-white hover:bg-theme-accent'} `}
                                >All</h2>
                                {
                                    newtag && newtag.map(tag => <h2
                                        onClick={() => setSelectedTag(tag)}
                                        className={`md:w-full inline px-4 py-3 leading-none  md:flex items-start justify-start md:pl-8 rounded-full mr-2 mt-2 cursor-pointer hover:shadow-md  transition-all duration-200 ease-in-out select-none  ${tag === selectedTag ? 'bg-theme-primary text-white shadow-md' : 'bg-white hover:bg-theme-accent'} `}
                                    >{tag}</h2>)
                                }
                            </div>


                            <div className='col-span-3 w-full overflow-auto h-[70vh] pr-2 md:pr-4  mt-6 md:mt-0'>
                                <p className=' mb-2'>Total Results: {filteredBlog?.length}</p>
                                {
                                    filteredBlog && filteredBlog.map(blog => <BlogCard key={blog.id} blog={blog} setBlogs={setBlogs} refresh={refresh}></BlogCard>)
                                }
                            </div>
                        </div>


                    </div> : <Loader></Loader>
            }
        </div>
    );
};

export default HomeBlog;