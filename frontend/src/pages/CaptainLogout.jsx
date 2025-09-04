
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const CaptainLogout = () => {
    const token = localStorage.getItem('captain-token')
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('captain-token')
            navigate('/captain-login')
        }
    })

    return (
        <div>CaptainLogout</div>
    )
}

export default CaptainLogout


// import React, { useEffect } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const CaptainLogout = () => {
//   const navigate = useNavigate()

//   useEffect(() => {
//     const logoutCaptain = async () => {
//       try {
//         const token = localStorage.getItem('token')
//         await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true, // in case backend uses cookies
//         })

//         // ✅ Clear local token
//         localStorage.removeItem('token')

//         // ✅ Redirect
//         navigate('/captain-login')
//       } catch (error) {
//         // even if API fails, logout locally
//         localStorage.removeItem('token')
//         navigate('/captain-login')
//       }
//     }

//     logoutCaptain()
//   }, [navigate])

//   return <p>Logging out…</p>
// }

// export default CaptainLogout
