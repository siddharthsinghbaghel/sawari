import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [ isLoading, setIsLoading ] = useState(true)




    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        })
            .catch(err => {

                localStorage.removeItem('token')
                navigate('/captain-login')
            })
    }, [ token ])

    

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }



    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper


// import React, { useContext, useEffect, useState } from 'react'
// import { CaptainDataContext } from '../context/CapatainContext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const CaptainProtectWrapper = ({ children }) => {
//   const navigate = useNavigate()
//   const { setCaptain } = useContext(CaptainDataContext)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     if (!token) {
//       navigate('/captain-login')
//       return
//     }
//     axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => {
//         // backend might return { captain } or the object directly
//         setCaptain(res.data?.captain || res.data)
//         setIsLoading(false)
//       })
//       .catch(() => {
//         localStorage.removeItem('token')
//         navigate('/captain-login')
//       })
//   }, [navigate, setCaptain])

//   if (isLoading) return <div className='p-6'>Loading…</div>
//   return <>{children}</>
// }

// export default CaptainProtectWrapper
