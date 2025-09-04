// import React, { useState, useContext } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { UserDataContext } from '../context/UserContext'



// const UserSignup = () => {
//   const [ email, setEmail ] = useState('')
//   const [ password, setPassword ] = useState('')
//   const [ firstName, setFirstName ] = useState('')
//   const [ lastName, setLastName ] = useState('')
//   const [ userData, setUserData ] = useState({})

//   const navigate = useNavigate()



//   const { user, setUser } = useContext(UserDataContext)




//   const submitHandler = async (e) => {
//     e.preventDefault()
//     const newUser = {
//       fullname: {
//         firstname: firstName,
//         lastname: lastName
//       },
//       email: email,
//       password: password
//     }

//     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

//     if (response.status === 201) {
//       const data = response.data
//       setUser(data.user)
//       localStorage.setItem('token', data.token)
//       navigate('/home')
//     }


//     setEmail('')
//     setFirstName('')
//     setLastName('')
//     setPassword('')

//   }
//   return (
//     <div>
//       <div className='p-7 h-screen flex flex-col justify-between'>
//         <div>
//           <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

//           <form onSubmit={(e) => {
//             submitHandler(e)
//           }}>

//             <h3 className='text-lg w-1/2  font-medium mb-2'>What's your name</h3>
//             <div className='flex gap-4 mb-7'>
//               <input
//                 required
//                 className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
//                 type="text"
//                 placeholder='First name'
//                 value={firstName}
//                 onChange={(e) => {
//                   setFirstName(e.target.value)
//                 }}
//               />
//               <input
//                 required
//                 className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
//                 type="text"
//                 placeholder='Last name'
//                 value={lastName}
//                 onChange={(e) => {
//                   setLastName(e.target.value)
//                 }}
//               />
//             </div>

//             <h3 className='text-lg font-medium mb-2'>What's your email</h3>
//             <input
//               required
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value)
//               }}
//               className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
//               type="email"
//               placeholder='email@example.com'
//             />

//             <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

//             <input
//               className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value)
//               }}
//               required type="password"
//               placeholder='password'
//             />

//             <button
//               className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
//             >Create account</button>

//           </form>
//           <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
//         </div>
//         <div>
//           <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
//             Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
//         </div>
//       </div>
//     </div >
//   )
// }

// export default UserSignup
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import Lottie from "lottie-react";
import carAnimation from "../assets/Car.json"; // ✅ same red car as background

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newUser = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          alert(error.response.data.errors[0].msg);
        } else if (error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("Signup failed. Please try again.");
        }
      } else {
        alert("Server not reachable");
      }
    } finally {
      setLoading(false);
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen relative bg-gray-900 text-white flex flex-col lg:flex-row">
      {/* Top-left clickable Sawari */}
      <div
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 z-30 cursor-pointer text-2xl font-bold text-sky-400 hover:text-red-500 transition-colors duration-300"
      >
        Sawari
      </div>

      {/* Left: Car Animation with blue glow */}
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/30 via-sky-300/20 to-transparent blur-3xl"></div>
        <Lottie
          animationData={carAnimation}
          loop={true}
          className="w-full max-w-lg h-auto opacity-80"
        />
      </div>

      {/* Right: Signup Form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-gray-800/95 p-6 rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]">
          {/* Logo above heading */}
          <div className="flex justify-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/744/744465.png"
              alt="Car Logo"
              className="w-16 h-16"
            />
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Create Your Account
          </h2>

          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex gap-4">
              <input
                required
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-700 w-1/2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <input
                required
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-700 w-1/2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {/* Email */}
            <input
              required
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 rounded-lg px-4 py-3 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            {/* Password */}
            <input
              required
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 rounded-lg px-4 py-3 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <button
              disabled={loading}
              className="bg-sky-500 hover:bg-sky-600 transition-colors duration-300 text-white font-semibold py-3 rounded-lg"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-gray-400 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-sky-400 hover:underline">
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

export default UserSignup;
