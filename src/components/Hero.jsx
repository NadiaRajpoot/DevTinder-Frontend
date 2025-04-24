import React from "react";
import { IoCode } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { FiZap } from "react-icons/fi";
import {Link} from "react-router-dom"
import { FaArrowRight } from "react-icons/fa6";
const Hero = () => {
  return (
    <section className="px-4 py-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-12">
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight w-full">
            Connect with developers who match your vibe
          </h1>
          <p className="mt-6 text-lg text-gray-500 md:w-[90%]">
            Whether you're shipping side projects or building the next big thing
            — meet people who just <em>get</em> your flow.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
           <Link to = "/login" > <button className=" flex gap-2 items-center px-6 py-3 bg-gradient-to-b from-[#8c75e3] to-[#6f51ee] text-sm  text-white rounded-md font-medium hover:opacity-90 transition duration-300">
              Get Started <FaArrowRight />
            </button></Link>
            <button className="px-6 py-3 border border-gray-700 text-]gray-700 rounded-md font-medium text-sm hover:bg-transparent hover:border-none transition duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src="/public/assets/hero-img.png"
            alt="hero"
            className="h-full max-h-[500px] w-auto object-contain rounded-xl "
          />
        </div>
      </div>

      <div className="py-20">
        {" "}
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Why DevTinder?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find your perfect match in the tech world. Whether you're
                looking for a coding partner, mentor, or just expanding your
                network.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 border border-primary/40 p-5 rounded-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                <IoCode className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Skill-Based Matching</h3>
                <p className="text-muted-foreground sm:text-base text-sm text-gray-500">
                  Find developers with complementary skills to yours. Perfect
                  for collaborative projects.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4 border border-primary/40 p-5 rounded-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                <HiUsers className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Professional Networking</h3>
                <p className="text-muted-foreground sm:text-s text-sm text-gray-500">
                  Expand your professional circle with like-minded developers in
                  your field or area of interest.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4 border border-primary/40 p-5 rounded-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                <FiZap className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Quick Connections</h3>
                <p className="text-muted-foreground sm:text-base text-sm text-gray-500">
                  Our intuitive swiping interface makes finding the right
                  connection fast and efficient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
