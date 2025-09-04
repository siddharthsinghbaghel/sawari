// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const ConfirmRidePopUp = (props) => {
//     const [ otp, setOtp ] = useState('')
//     const navigate = useNavigate()

//     const submitHander = async (e) => {
//         e.preventDefault()

//         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
//             params: {
//                 rideId: props.ride._id,
//                 otp: otp
//             },
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         })

//         if (response.status === 200) {
//             props.setConfirmRidePopupPanel(false)
//             props.setRidePopupPanel(false)
//             navigate('/captain-riding', { state: { ride: props.ride } })
//         }


//     }
//     return (
//         <div>
//             <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
//                 props.setRidePopupPanel(false)
//             }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
//             <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
//             <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
//                 <div className='flex items-center gap-3 '>
//                     <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
//                     <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
//                 </div>
//                 <h5 className='text-lg font-semibold'>2.2 KM</h5>
//             </div>
//             <div className='flex gap-2 justify-between flex-col items-center'>
//                 <div className='w-full mt-5'>
//                     <div className='flex items-center gap-5 p-3 border-b-2'>
//                         <i className="ri-map-pin-user-fill"></i>
//                         <div>
//                             <h3 className='text-lg font-medium'>562/11-A</h3>
//                             <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
//                         </div>
//                     </div>
//                     <div className='flex items-center gap-5 p-3 border-b-2'>
//                         <i className="text-lg ri-map-pin-2-fill"></i>
//                         <div>
//                             <h3 className='text-lg font-medium'>562/11-A</h3>
//                             <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
//                         </div>
//                     </div>
//                     <div className='flex items-center gap-5 p-3'>
//                         <i className="ri-currency-line"></i>
//                         <div>
//                             <h3 className='text-lg font-medium'>₹{props.ride?.fare} </h3>
//                             <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='mt-6 w-full'>
//                     <form onSubmit={submitHander}>
//                         <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />

//                         <button className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
//                         <button onClick={() => {
//                             props.setConfirmRidePopupPanel(false)
//                             props.setRidePopupPanel(false)

//                         }} className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button>

//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ConfirmRidePopUp










// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const vehicleImages = {
//   car: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
//   moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
//   auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
// };

// const ConfirmRidePopUp = ({ ride, setConfirmRidePopupPanel, setRidePopupPanel }) => {
//   const [otp, setOtp] = useState('');
//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
//         params: { rideId: ride._id, otp },
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });

//       if (response.status === 200) {
//         setConfirmRidePopupPanel(false);
//         setRidePopupPanel(false);
//         navigate('/captain-riding', { state: { ride } });
//       }
//     } catch (err) {
//       alert(err?.response?.data?.message || "Failed to start ride");
//     }
//   };

//   return (
//     <div>
//       <h5
//         className="p-1 text-center w-[93%] absolute top-0"
//         onClick={() => setRidePopupPanel(false)}
//       >
//         <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
//       </h5>

//       <h3 className="text-2xl font-semibold mb-5">Confirm this ride to Start</h3>

//       <div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4">
//         <div className="flex items-center gap-3">
//           <img
//             className="h-12 rounded-full object-cover w-12"
//             src={ride?.user?.avatar || "https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"}
//             alt="User"
//           />
//           <h2 className="text-lg font-medium capitalize">{ride?.user?.fullname?.firstname}</h2>
//         </div>
//         <h5 className="text-lg font-semibold">{ride?.distance || "N/A"} KM</h5>
//       </div>

//       <div className="flex gap-2 justify-between flex-col items-center">
//         <img
//           className="h-20 mt-4"
//           src={vehicleImages[ride?.vehicleType] || vehicleImages.car}
//           alt={ride?.vehicleType}
//         />

//         <div className="w-full mt-5">
//           <div className="flex items-center gap-5 p-3 border-b-2">
//             <i className="ri-map-pin-user-fill"></i>
//             <div>
//               <h3 className="text-lg font-medium">Pickup</h3>
//               <p className="text-sm -mt-1 text-gray-600">{ride?.pickup}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-5 p-3 border-b-2">
//             <i className="text-lg ri-map-pin-2-fill"></i>
//             <div>
//               <h3 className="text-lg font-medium">Destination</h3>
//               <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-5 p-3">
//             <i className="ri-currency-line"></i>
//             <div>
//               <h3 className="text-lg font-medium">
//                 ₹{ride?.fare?.[ride?.vehicleType] || ride?.fare || "N/A"}
//               </h3>
//               <p className="text-sm -mt-1 text-gray-600">Cash</p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6 w-full">
//           <form onSubmit={submitHandler}>
//             <input
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               type="text"
//               className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3"
//               placeholder="Enter OTP"
//             />

//             <button className="w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg">
//               Confirm
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setConfirmRidePopupPanel(false);
//                 setRidePopupPanel(false);
//               }}
//               className="w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg"
//             >
//               Cancel
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmRidePopUp;









// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ConfirmRidePopUp = ({ ride, setConfirmRidePopupPanel, setRidePopupPanel, vehicleImage }) => {
//   const [otp, setOtp] = useState('');
//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
//       params: { rideId: ride._id, otp },
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//     });
//     if (response.status === 200) {
//       setConfirmRidePopupPanel(false);
//       setRidePopupPanel(false);
//       navigate('/captain-riding', { state: { ride } });
//     }
//   };

//   return (
//     <div>
//       <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => setRidePopupPanel(false)}>
//         <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
//       </h5>
//       <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>

//       <div className='flex flex-col items-center gap-3'>
//         <img className='h-20' src={vehicleImage} alt="vehicle" />

//         <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg w-full'>
//           <div className='flex items-center gap-3'>
//             <img className='h-12 w-12 rounded-full object-cover' src={ride?.user.profilePic} alt="" />
//             <h2 className='text-lg font-medium capitalize'>{ride?.user.fullname.firstname}</h2>
//           </div>
//           <h5 className='text-lg font-semibold'>{ride?.distance || "2.2 KM"}</h5>
//         </div>

//         <form onSubmit={submitHandler} className='w-full mt-5 flex flex-col gap-3'>
//           <input 
//             type="text" 
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full'
//           />
//           <button type="submit" className='w-full bg-green-600 text-white p-3 rounded-lg font-semibold'>Confirm</button>
//           <button type="button" onClick={() => { setConfirmRidePopupPanel(false); setRidePopupPanel(false); }} className='w-full bg-red-600 text-white p-3 rounded-lg font-semibold'>Cancel</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ConfirmRidePopUp;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const submitHander = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
          rideId: props.ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        props.setConfirmRidePopupPanel(false);
        props.setRidePopupPanel(false);
        navigate('/captain-riding', { state: { ride: props.ride } });
      }
    } catch (error) {
      console.error('Failed to start ride:', error);
      // Optionally, handle error feedback in UI here
    }
  };

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm this ride to Start</h3>
      <div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">{props.ride?.user.fullname.firstname}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare} </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <form onSubmit={submitHander}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3"
              placeholder="Enter OTP"
            />

            <button className="w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg">
              Confirm
            </button>
            <button
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
              }}
              className="w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg"
              type="button"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
