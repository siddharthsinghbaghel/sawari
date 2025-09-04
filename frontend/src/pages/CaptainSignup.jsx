// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { CaptainDataContext } from '../context/CapatainContext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const CaptainSignup = () => {

//   const navigate = useNavigate()

//   const [ email, setEmail ] = useState('')
//   const [ password, setPassword ] = useState('')
//   const [ firstName, setFirstName ] = useState('')
//   const [ lastName, setLastName ] = useState('')

//   const [ vehicleColor, setVehicleColor ] = useState('')
//   const [ vehiclePlate, setVehiclePlate ] = useState('')
//   const [ vehicleCapacity, setVehicleCapacity ] = useState('')
//   const [ vehicleType, setVehicleType ] = useState('')


//   const { captain, setCaptain } = React.useContext(CaptainDataContext)


//   const submitHandler = async (e) => {
//     e.preventDefault()
//     const captainData = {
//       fullname: {
//         firstname: firstName,
//         lastname: lastName
//       },
//       email: email,
//       password: password,
//       vehicle: {
//         color: vehicleColor,
//         plate: vehiclePlate,
//         capacity: vehicleCapacity,
//         vehicleType: vehicleType
//       }
//     }

//     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

//     if (response.status === 201) {
//       const data = response.data
//       setCaptain(data.captain)
//       localStorage.setItem('token', data.token)
//       navigate('/captain-home')
//     }

//     setEmail('')
//     setFirstName('')
//     setLastName('')
//     setPassword('')
//     setVehicleColor('')
//     setVehiclePlate('')
//     setVehicleCapacity('')
//     setVehicleType('')

//   }
//   return (
//     <div className='py-5 px-5 h-screen flex flex-col justify-between'>
//       <div>
//         <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

//         <form onSubmit={(e) => {
//           submitHandler(e)
//         }}>

//           <h3 className='text-lg w-full  font-medium mb-2'>What's our Captain's name</h3>
//           <div className='flex gap-4 mb-7'>
//             <input
//               required
//               className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
//               type="text"
//               placeholder='First name'
//               value={firstName}
//               onChange={(e) => {
//                 setFirstName(e.target.value)
//               }}
//             />
//             <input
//               required
//               className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
//               type="text"
//               placeholder='Last name'
//               value={lastName}
//               onChange={(e) => {
//                 setLastName(e.target.value)
//               }}
//             />
//           </div>

//           <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
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

//           <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
//           <div className='flex gap-4 mb-7'>
//             <input
//               required
//               className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
//               type="text"
//               placeholder='Vehicle Color'
//               value={vehicleColor}
//               onChange={(e) => {
//                 setVehicleColor(e.target.value)
//               }}
//             />
//             <input
//               required
//               className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
//               type="text"
//               placeholder='Vehicle Plate'
//               value={vehiclePlate}
//               onChange={(e) => {
//                 setVehiclePlate(e.target.value)
//               }}
//             />
//           </div>
//           <div className='flex gap-4 mb-7'>
//             <input
//               required
//               className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
//               type="number"
//               placeholder='Vehicle Capacity'
//               value={vehicleCapacity}
//               onChange={(e) => {
//                 setVehicleCapacity(e.target.value)
//               }}
//             />
//             <select
//               required
//               className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
//               value={vehicleType}
//               onChange={(e) => {
//                 setVehicleType(e.target.value)
//               }}
//             >
//               <option value="" disabled>Select Vehicle Type</option>
//               <option value="car">Car</option>
//               <option value="auto">Auto</option>
//               <option value="moto">Moto</option>
//             </select>
//           </div>

//           <button
//             className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
//           >Create Captain Account</button>

//         </form>
//         <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
//       </div>
//       <div>
//         <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
//           Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
//       </div>
//     </div>
//   )
// }

// export default CaptainSignup
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import { CarFront } from "lucide-react"; // ✅ Lucide icon

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const captainData = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.errors?.[0]?.msg ||
        err?.response?.data?.message ||
        "Signup failed";
      alert(msg);
    } finally {
      setLoading(false);
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
      setVehicleType("");
    }
  };

  return (
    <div className="min-h-screen relative bg-gray-900 text-white flex flex-col lg:flex-row">
      {/* Top-left clickable brand */}
      <div
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 z-30 cursor-pointer text-2xl font-bold text-green-400 hover:text-red-500 transition-colors duration-300"
      >
        Sawari
      </div>

      {/* Left: Glow + Car Icon */}
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/30 via-green-400/20 to-transparent blur-3xl"></div>
        <CarFront className="w-48 h-48 text-green-400 opacity-70 z-10" />
      </div>

      {/* Right: Signup Form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-gray-800/95 p-6 rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]">
          {/* Icon above heading */}
          <div className="flex justify-center mb-4">
            <CarFront className="w-16 h-16 text-green-400" />
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Captain Signup
          </h2>

          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                required
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-700 flex-1 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                required
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-700 flex-1 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Email */}
            <input
              required
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 rounded-lg px-4 py-3 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Password */}
            <input
              required
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 rounded-lg px-4 py-3 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Vehicle Info */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                required
                type="text"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                className="bg-gray-700 flex-1 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                required
                type="text"
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                className="bg-gray-700 flex-1 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                required
                type="number"
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                className="bg-gray-700 flex-1 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="bg-gray-700 flex-1 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled>
                  Select Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>

            <button
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white font-semibold py-3 rounded-lg"
            >
              {loading ? "Creating…" : "Create Captain Account"}
            </button>
          </form>

          <p className="text-gray-400 text-center mt-4">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-green-400 hover:underline">
              Login here
            </Link>
          </p>

          <p className="text-[11px] mt-6 text-gray-500 text-center leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service</span> apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;

