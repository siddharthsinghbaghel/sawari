// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { CaptainDataContext } from '../context/CapatainContext'

// const Captainlogin = () => {

//   const [ email, setEmail ] = useState('')
//   const [ password, setPassword ] = useState('')

//   const { captain, setCaptain } = React.useContext(CaptainDataContext)
//   const navigate = useNavigate()



//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const captain = {
//       email: email,
//       password
//     }

//     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

//     if (response.status === 200) {
//       const data = response.data

//       setCaptain(data.captain)
//       localStorage.setItem('token', data.token)
//       navigate('/captain-home')

//     }

//     setEmail('')
//     setPassword('')
//   }
//   return (
//     <div className='p-7 h-screen flex flex-col justify-between'>
//       <div>
//         <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

//         <form onSubmit={(e) => {
//           submitHandler(e)
//         }}>
//           <h3 className='text-lg font-medium mb-2'>What's your email</h3>
//           <input
//             required
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value)
//             }}
//             className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
//             type="email"
//             placeholder='email@example.com'
//           />

//           <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

//           <input
//             className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value)
//             }}
//             required type="password"
//             placeholder='password'
//           />

//           <button
//             className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
//           >Login</button>

//         </form>
//         <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
//       </div>
//       <div>
//         <Link
//           to='/login'
//           className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
//         >Sign in as User</Link>
//       </div>
//     </div>
//   )
// }

// export default Captainlogin
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import { CarFront } from "lucide-react"; // ✅ Lucide icon

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        { email, password }
      );
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token); // same token key
        navigate("/captain-home");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.errors?.[0]?.msg ||
        err?.response?.data?.message ||
        "Login failed";
      alert(msg);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="h-screen relative bg-gray-900 text-white flex flex-col lg:flex-row overflow-hidden">
      {/* Top-left clickable brand */}
      <div
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 z-30 cursor-pointer text-2xl font-bold text-green-400 hover:text-red-500 transition-colors duration-300"
      >
        Sawari
      </div>

      {/* Left: Background Glow & Icon */}
      <div className="relative lg:w-1/2 w-full flex items-center justify-center">
        {/* Greenish glow background */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 via-green-400/10 to-transparent blur-3xl"></div>
        <CarFront className="w-40 h-40 text-green-400 opacity-70 z-10" />
      </div>

      {/* Right: Login Form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-md bg-gray-800/95 p-8 rounded-2xl shadow-lg">
          {/* Icon above Welcome Back */}
          <div className="flex justify-center mb-4">
            <CarFront className="w-16 h-16 text-green-400" />
          </div>

          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Captain Login
          </h2>

          <form onSubmit={submitHandler} className="flex flex-col gap-5">
            <div>
              <label className="text-gray-300 mb-1 block">Email</label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="captain@example.com"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-gray-300 mb-1 block">Password</label>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white font-semibold py-3 rounded-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-gray-400 text-center mt-4">
            New Captain?{" "}
            <Link to="/captain-signup" className="text-green-400 hover:underline">
              Register as a Captain
            </Link>
          </p>

          <Link
            to="/login"
            className="block mt-6 bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white font-semibold text-center py-3 rounded-lg"
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;

