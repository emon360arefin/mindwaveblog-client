import React, { useContext, useEffect, useState } from 'react';
import { BsCardImage } from "react-icons/bs";
import Button from '../../Components/Shared/Button/Button';
import { AuthContext } from '../../Components/Authprovider/Authprovider';
import { toast } from 'react-hot-toast';

const Write = () => {

    const [blogIMG, setBlogIMG] = useState(null)
    const [categoryInfo, setCategoryInfo] = useState([])
    const [cat, setCat] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [tags, setTags] = useState('');

    const { user } = useContext(AuthContext)

    // Image Upload
    const imgUpload = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image)

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`

        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                // Creating user
                const imgURL = imgData.data.display_url;

                {
                    imgURL && setBlogIMG(imgURL)
                }

            })
            .catch(err => {
                toast.error(err.message)
            })
    }


    // Handle Blog Submit
    const handleBlogSubmit = (e) => {
        e.preventDefault()

        const title = e.target.title.value;
        const content = e.target.content.value;
        const category = e.target.category.value;
        const subCategory = e.target.subCategory.value
        const tagsArray = tags.split(',').map(tag => tag.trim());

        const blog = {

            "title": title,
            "author": user?.displayName,
            "author_img": user?.photoURL,
            "published_date": new Date(),
            "category": category,
            "sub-category": subCategory,
            "tags": tagsArray,
            "content": content,
            "image_url": blogIMG && blogIMG,
        }

        console.log(blog);

        fetch(`${import.meta.env.VITE_SERVER_API}/api/blogs`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(blog)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Blog Uploaded') {
                    toast.success("Blog Published")
                    e.target.reset()
                    setBlogIMG(null)
                }
            })
    }


    useEffect(() => {
        fetch('/data/categoryInfo.json')
            .then(res => res.json())
            .then(data => setCategoryInfo(data))
    }, [])

    useEffect(() => {
        const selectedCategoryData = categoryInfo.find(category => category.category === cat);
        setSelectedCategory(selectedCategoryData);

    }, [cat])




    return (
        <div className='bg-white py-16 md:py-20'>
            <div className='max-w-5xl mx-auto bg-theme-accent p-6 rounded'>


                <form onSubmit={handleBlogSubmit} className='' action="">

                    {/* left col */}
                    <div className='flex flex-col gap-4 md:gap-6'>
                        {/* Title */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="title">Title</label>
                            <input
                                name='title'
                                placeholder='Write your title'
                                type="text"
                                className='border rounded py-2 px-4 '
                            />
                        </div>


                        {/* Image + category */}
                        <div className='w-full flex flex-col md:flex-row md:items-start md:justify-between gap-4'>


                            {/* File Upload  */}
                            <div className='flex gap-4'>

                                <label htmlFor='image' className=' flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer h-10'>
                                    {
                                        blogIMG ? " Change Feature Image" : " Select Feature Image"
                                    }
                                </label>
                                <input
                                    required
                                    type='file'

                                    id='image'
                                    name='image'
                                    accept='image/*'
                                    className='sr-only '
                                    onChange={imgUpload}
                                />

                                {
                                    blogIMG && blogIMG ? <div className='h-36 w-64 flex items-center justify-center rounded border border-slate-300 overflow-hidden'>
                                        <img className='w-auto h-full' src={blogIMG} alt="" />
                                    </div> :

                                        <div className='w-10 h-10'> <BsCardImage className='text-[40px] text-slate-500'></BsCardImage> </div>
                                }

                            </div>



                            {/* Category */}

                            <div className='flex flex-col md:flex-row gap-4'>
                                <select className='border px-4 py-2 rounded' onChange={(e) => setCat(e.target.value)} name="category" id="">


                                    <option value="" selected disabled >
                                        Select a Category
                                    </option>

                                    {
                                        categoryInfo && categoryInfo.map((category, index) => (
                                            <option key={index} value={category.category}>{category.category}</option>
                                        ))
                                    }




                                </select>




                                {
                                    selectedCategory && <select className='border px-4 py-2 rounded' name="subCategory" id="">

                                        <option value="" selected disabled >
                                            Select a Sub-Category
                                        </option>

                                        {
                                            selectedCategory.subCategory.map((sub, index) => (
                                                <option value={sub}>{sub}</option>
                                            ))
                                        }

                                    </select>
                                }

                            </div>

                        </div>


                        {/* Tags */}
                        <div className='flex flex-col md:flex-row gap-2 md:items-center'>
                            <label className='w-full md:w-1/3 ' htmlFor="tags">Enter Tags (comma-separated):</label>
                            <input
                                type="text"
                                id="tags"
                                placeholder="Enter tags..."
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className='px-4 py-[6px] rounded border w-full md:w-2/3'
                            />

                        </div>



                        {/* Content */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="Content">Content</label>
                            <textarea
                                className='border rounded py-2 px-4'
                                name="content"
                                placeholder='Write your content '
                                id="content"
                                cols="70"
                                rows="10"></textarea>
                        </div>


                        <Button type='submit' width='w-44' height="h-10" >Publish</Button>
                    </div>


                    {/* Right Col */}




                </form>

            </div>
        </div>
    );
};

export default Write;