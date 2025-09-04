// import React, { useState, useContext } from 'react'
// import { Link } from 'react-router-dom'
// import { UserDataContext } from '../context/UserContext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const UserLogin = () => {
//   const [ email, setEmail ] = useState('')
//   const [ password, setPassword ] = useState('')
//   const [ userData, setUserData ] = useState({})

//   const { user, setUser } = useContext(UserDataContext)
//   const navigate = useNavigate()



//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const userData = {
//       email: email,
//       password: password
//     }

//     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

//     if (response.status === 200) {
//       const data = response.data
//       setUser(data.user)
//       localStorage.setItem('token', data.token)
//       navigate('/home')
//     }


//     setEmail('')
//     setPassword('')
//   }

//   return (
//     <div className='p-7 h-screen flex flex-col justify-between'>
//       <div>
//         <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

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
//         <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
//       </div>
//       <div>
//         <Link
//           to='/captain-login'
//           className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
//         >Sign in as Captain</Link>
//       </div>
//     </div>
//   )
// }

// export default UserLogin
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import SawariLogo from '../assets/cars.png'
import Lottie from 'lottie-react'
import carAnimation from '../assets/Car.json'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        { email, password }
      )
      if (response.status === 200) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch (error) {
      const msg =
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.message ||
        'Login failed'
      alert(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative bg-gray-900 text-white flex flex-col lg:flex-row">
      {/* Top-left brand */}
      <div 
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 z-30 cursor-pointer text-2xl font-bold text-sky-400 hover:text-red-500 transition-colors duration-300"
      >
        Sawari
      </div>

      {/* Left: Car animation with blue glow */}
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/20 via-sky-400/10 to-transparent blur-3xl"></div>
        <Lottie animationData={carAnimation} loop={true} className="w-full h-full opacity-70" />
      </div>

      {/* Right: Login Form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-gray-800/95 p-6 rounded-2xl shadow-lg overflow-y-auto">
          {/* Logo above heading */}
          <div className="flex justify-center mb-4">
            <img src={SawariLogo} alt="Sawari Logo" className="w-16 h-16" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <div>
              <label className="text-gray-300 mb-1 block">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="text-gray-300 mb-1 block">Password</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-gray-400 text-center mt-4">
            New here? <Link to="/signup" className="text-sky-400 hover:underline">Create Account</Link>
          </p>

          <Link
            to="/captain-login"
            className="block mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold text-center py-3 rounded-lg transition-colors"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserLogin




