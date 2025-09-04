
// // import React from 'react'
// // import { Link } from 'react-router-dom'

// // const Start = () => {
// //   return (
// //     <div>
// //       <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full'>
// //         <img className='w-16 ml-8' src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcLzhGbTh4cU5SZGZUVjUxYVh3bnEyLnN2ZyJ9:weare:F1cOF9Bps96cMy7r9Y2d7affBYsDeiDoIHfqZrbcxAw?width=1200&height=417" alt="" />
// //         <div className='bg-white pb-8 py-4 px-4'>
// //           <h2 className='text-[30px] font-semibold'>Get Started with Uber</h2>
// //           <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Start

// import React from 'react'
// import { Link } from 'react-router-dom'

// const Start = () => {
//   return (
//     <div>
//       <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full'>
//         <img className='w-16 ml-8' src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcLzhGbTh4cU5SZGZUVjUxYVh3bnEyLnN2ZyJ9:weare:F1cOF9Bps96cMy7r9Y2d7affBYsDeiDoIHfqZrbcxAw?width=1200&height=417" alt="" />
//         <div className='bg-white pb-8 py-4 px-4'>
//           <h2 className='text-[30px] font-semibold'>Get Started with Uber</h2>
//           <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Start
import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import carAnimation from "../assets/car.json";
import SawariLogo from "../assets/cars.png";

const Start = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-between relative bg-gray-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10 animate-slow-pan"
        style={{
          backgroundImage:
            "url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')",
        }}
      />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />

      {/* Logo + Title */}
      <div className="flex flex-col items-center mt-10 z-10">
        <img
          src={SawariLogo}
          alt="Sawari Logo"
          className="w-24 h-24 drop-shadow-lg"
        />
        <h1
          className="text-5xl font-extrabold tracking-widest 
          bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 
          bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(56,189,248,0.7)]"
        >
          Sawari
        </h1>
        <p className="text-lg opacity-80">Your ride, your way</p>
      </div>

      {/* Car Animation with Yellowish Glow */}
      <div className="relative w-80 h-80 z-10 flex items-center justify-center">
        {/* Warm Yellow Glow (centered) */}
        <div className="absolute inset-0 blur-3xl bg-yellow-400/40 animate-pulse rounded-full"></div>

        {/* Car Animation */}
        <Lottie animationData={carAnimation} loop={true} />
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 mb-12 w-3/4 max-w-sm z-10">
        <Link
          to="/login"
          className="bg-white text-indigo-600 font-semibold py-3 rounded-2xl shadow-lg text-center hover:scale-105 transition"
        >
          Continue as User
        </Link>
        <Link
          to="/captain-login"
          className="bg-black text-white font-semibold py-3 rounded-2xl shadow-lg text-center hover:scale-105 transition"
        >
          Continue as Captain
        </Link>
      </div>
    </div>
  );
};

export default Start;


