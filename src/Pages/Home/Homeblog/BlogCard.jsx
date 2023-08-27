import moment from 'moment/moment';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidUserCircle } from 'react-icons/bi';
import { MdFavorite } from 'react-icons/md';
import { BsFillHandThumbsUpFill, BsHandThumbsDownFill } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Components/Authprovider/Authprovider';

const BlogCard = (props) => {

    const [hover, setHover] = useState(false)
    const [likes, setLikes] = useState(0)
    const [fav, setFav] = useState(false)

    const { user } = useContext(AuthContext)
    const email = user?.email;

    const displayName = user?.displayName;
    const photoURL = user?.photoURL;

    const { id, _id, title, author, author_img, published_date, category, tags, content, image_url, comments } = props.blog

    const setBlogs = props.setBlogs;

    const paragraphs = content.split('\n\n');
    const renderedParagraphs = paragraphs?.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
    ));


    const words = content.split(' ');
    const truncatedWords = words.slice(0, 20);
    const truncatedText = truncatedWords.join(' ');


    const handleComment = (e, displayName, photoURL, _id) => {

        e.preventDefault();
        console.log("Comment hit");

        if (!displayName) {
            toast.error("Please Login First ")
            return
        }

        const user = displayName;
        const user_img = photoURL;
        const text = e.target.comment.value;

        const newComment = {
            user, user_img, text
        }

        console.log(newComment, _id);


        fetch(`${import.meta.env.VITE_SERVER_API}/api/blogs/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
            .then(res => res.json())
            .then(data => {
                console.log("Response Data", data)
                fetch(`${import.meta.env.VITE_SERVER_API}/api/blogs`)
                    .then(res => res.json())
                    .then(data => setBlogs(data))
                e.target.reset()
            })

    }


    // Like Count 

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_API}/api/blogs/${_id}`)
            .then(res => res.json())
            .then(data => {
                if (data.likes) {
                    setLikes(data?.likes?.length)
                    console.log("Likes ", data?.likes?.length);
                    if (data.likes.includes(email)) {
                        console.log("Got it", email);
                        setFav(true)
                    }
                } else {
                    setLikes(0)
                }
            })
    }, [likes, fav])

    // Check Favorite
    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_SERVER_API}/api/favorites/${email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.favoriteIds.includes(id)) {
    //                 setFav(true);

    //             }
    //         })
    //         .catch(error => console.log("Error", error.message))
    // }, [email, id])

    const handleFavorite = (email, id) => {

        if (!email) {
            toast.error("Please login first to add favorite recipe")
            return
        }

        // fetch(`${import.meta.env.VITE_SERVER_API}/api/favorites/${email}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         if (!data) {
        //             fetch(`${import.meta.env.VITE_SERVER_API}/api/favorites/${email}`, {
        //                 method: 'PUT',
        //                 headers: {
        //                     'Content-Type': 'application/json'
        //                 },
        //                 body: JSON.stringify({ id: id })
        //             })
        //                 .then(response => response.json())
        //                 .then(data => {


        //                     console.log("data", data);

        //                     if (data.modifiedCount > 0) {
        //                         setFav(true)
        //                         toast.success("Added to favorite")
        //                     }
        //                     else if (data.upsertedCount > 0) {
        //                         setFav(true)
        //                         toast.success("Added to favorite")
        //                     } else if (!data.success) {
        //                         toast.error("Server Error")
        //                     } else {
        //                         toast.error("Already Added 1")
        //                     }
        //                 })
        //                 .catch(error => {
        //                     console.error('An error occurred:', error);
        //                 });
        //         }

        //         else {
        //             fetch(`${import.meta.env.VITE_SERVER_API}/api/favorites/${email}`)
        //                 .then(res => res.json())
        //                 .then(data => {
        //                     if (data.favoriteIds.includes(id)) {
        //                         toast.error("Already Added")
        //                     } else {
        //                         fetch(`${import.meta.env.VITE_SERVER_API}/api/favorites/${email}`, {
        //                             method: 'PUT',
        //                             headers: {
        //                                 'Content-Type': 'application/json'
        //                             },
        //                             body: JSON.stringify({ id: id })
        //                         })
        //                             .then(response => response.json())
        //                             .then(data => {


        //                                 console.log("data", data);

        //                                 if (data.modifiedCount > 0) {
        //                                     setFav(true)
        //                                     toast.success("Added to favorite")
        //                                 }
        //                                 else if (data.upsertedCount > 0) {
        //                                     setFav(true)
        //                                     toast.success("Added to favorite")
        //                                 } else {
        //                                     toast.error("Already Added")

        //                                 }
        //                             })
        //                             .catch(error => {
        //                                 console.error('An error occurred:', error);
        //                             });

        //                     }
        //                 })
        //         }
        //     })


        fetch(`${import.meta.env.VITE_SERVER_API}/api/blogs/${_id}`)
            .then(res => res.json())
            .then(data => {
                if (data.likes.includes(email)) {
                    // Remove From the Array

                    fetch(`${import.meta.env.VITE_SERVER_API}/api/blogs/like/remove/${_id}`, {
                        method: 'PUT',
                        headers: {
                            "content-type": "text/plain"
                        },
                        body: email
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data.message);
                            if (data.message === "removed") {
                                setFav(false)
                                toast.error("Removed from favorite")
                            }

                        })


                } else {
                    // Add to the array
                    console.log("Nothing");
                    fetch(`${import.meta.env.VITE_SERVER_API}/api/blogs/like/${_id}`, {
                        method: 'PUT',
                        headers: {
                            "content-type": "text/plain"
                        },
                        body: email
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log("Added Data Message", data.message);
                            if (data.message === "added") {
                                setFav(true)
                                toast.success("Added to favorite new")
                            }
                        })
                }
            })

    }

    return (
        <div
            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            className='rounded-[11px] border border-slate-200 overflow-hidden  mb-6 relative'>

            {/* Pop Up */}

            <div className={`bg-white opacity-[98%] shadow backdrop-blur-2xl h-12 absolute top-0  rounded-bl-[11px] transition-all ease-in-out duration-300 flex items-center gap-2 py-2 px-4   justify-between right-0`}>

                <MdFavorite onClick={() => handleFavorite(email, id)} className={`text-2xl cursor-pointer  hover:text-red-600 ${!fav ? 'text-slate-400' : 'text-red-600'} text-2xl`} ></MdFavorite>
                <h2 className='text-xl'>{likes}</h2>
            </div>

            {/* Main Card Starts Here */}
            <div className='bg-theme-accent p-4 rounded-[10px] grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-8'>
                <div className='flex flex-col gap-4 md:col-span-4 '>
                    <h2 className='text-2xl font-semibold mt-10 md:mt-0'>{title}</h2>
                    <div className='flex gap-4'>
                        <img className='rounded-full w-[56px] h-[56px] border-2' src={author_img} alt="" />
                        <div>
                            <h2 className='text-lg font-semibold'>{author}</h2>

                            <p className='text-sm'>
                                {
                                    moment(published_date).format("MMM Do YY")
                                }
                            </p>
                        </div>
                    </div>

                    <Link
                        to={`/blogpost/${_id}`}
                        className=' overflow-hidden rounded-md'>
                        <img className='rounded-md h-[250px] w-[480px] object-cover  object-center border-slate-200' src={image_url} alt="" />
                    </Link>


                    <p className=''>
                        {truncatedText} ...
                        <span className='pl-1 font-semibold text-theme-primary text-lg'>
                            <Link to={`/blogpost/${_id}`}>
                                Read More
                            </Link>
                        </span>
                    </p>
                </div>

                {/* Comment*/}

                <div className='md:col-span-3 w-full '>
                    <div className='sticky top-24'>
                        <h2 className='text-lg font-semibold mb-4'>Comments</h2>


                        <div className='h-[35vh] overflow-auto pr-2'>
                            {
                                comments.map(comment =>
                                    <div className='flex gap-2 mb-4 '>

                                        <img className='w-8 h-8 rounded-full border' src={comment?.user_img} alt="" />
                                        <div className='bg-white rounded-md py-2 px-4'>
                                            <h2 className=' font-semibold'>{comment.user}</h2>
                                            <p>{comment.text}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>


                        <div className='w-full pt-4'>

                            <div className='flex gap-2 mb-4'>

                                <div className='w-8 h-8'>
                                    {
                                        !user ? <Link to='/login'>
                                            <BiSolidUserCircle className='text-4xl'></BiSolidUserCircle></Link> :

                                            <img className=' rounded-full border' src={user?.photoURL} alt="" />
                                    }



                                </div>

                                <form
                                    onSubmit={(e) => handleComment(e, displayName, photoURL, _id)}
                                    className='w-full' action="">
                                    <input
                                        name='comment'
                                        required
                                        placeholder='Write your comment'
                                        className='w-full h-16 border border-sal border-slate-200  rounded-md px-4' type="text" />
                                    <div className='flex justify-end pt-2'>

                                        <button type='submit' className='flex items-center justify-center h-8 bg-theme-primary text-white rounded-full w-28'>Comment</button>

                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;