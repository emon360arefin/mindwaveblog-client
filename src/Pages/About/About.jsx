import React from "react";

import { Link } from "react-router-dom";
import Heading from "../../Components/Shared/Heading/Heading";
import Button from "../../Components/Shared/Button/Button";


const About = () => {
    return (
        <div className=' py-16 md:py-20 bg-theme-accent'>



            <div className="max-w-7xl mx-auto px-2">

                <Heading heading='Discover Our Story: Unveiling the Journey Behind Our Blog'
                    subheading='Embark on a Journey of Insight and Inspiration: Exploring Stories, Ideas, and Experiences that Shape Our Blogging Narrative'></Heading>

                <div className='flex flex-col gap-4 mt-10'>
                    <div className="h-72 overflow-hidden relative rounded">

                        <img
                            src="/team.jpg"
                            alt=""

                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-semibold text-theme-primary">Digital Storytellers</h1>
                        <h2 className="">
                            Handcrafting award winning digital experiences
                        </h2>
                    </div>
                </div>
                <div className=" flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-2 mt-4">
                        <h1 className="text-2xl font-semibold text-theme-primary">Who Are We?</h1>
                        <p className="">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                            quae dolor, optio voluptatibus magnam iure esse tempora beatae. A
                            suscipit eos. Animi quibusdam cum omnis officiis voluptatum quo ea
                            eveniet? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Ducimus quae dolor, optio voluptatibus magnam iure esse tempora
                            beatae, a suscipit eos. Animi quibusdam cum omnis officiis
                            <br />
                            <br />
                            voluptatum quo ea eveniet? Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Ducimus quae dolor, optio voluptatibus magnam iure
                            esse tempora beatae, a suscipit eos. Animi quibusdam cum omnis
                            officiis voluptatum quo ea eveniet?
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <h1 className="text-2xl font-semibold text-theme-primary">What We Do?</h1>
                        <p className="">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                            quae dolor, optio voluptatibus magnam iure esse tempora beatae, a
                            suscipit eos. Animi quibusdam cum omnis officiis voluptatum quo ea
                            eveniet? Lorem ipsum dolor sit amet consectetur adipisicing elit.

                            <div className="mt-4 flex flex-col gap-1">
                                <li>Creative Illustrations</li>
                                <li>Dynamic Websites</li>
                                <li>Fast and Handy</li>
                                <li>Mobile Apps</li>

                            </div>
                        </p>
                        <Link className="mt-2" href='/contact'>
                            <Button width='w-32'>Contact</Button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;