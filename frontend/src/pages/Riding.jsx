// import React, { useEffect } from 'react';
// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import LiveTracking from '../components/LiveTracking';

// const Riding = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const ride = location.state?.ride;

//   useEffect(() => {
//     if (!ride) {
//       // Redirect to home if ride data is missing
//       navigate('/home', { replace: true });
//     }
//   }, [ride, navigate]);

//   if (!ride) {
//     return <div>Loading ride details...</div>; // Optionally a spinner or loading UI
//   }

//   return (
//     <div className="h-screen">
//       <Link
//         to="/home"
//         className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
//       >
//         <i className="text-lg font-medium ri-home-5-line"></i>
//       </Link>

//       <div className="h-1/2">
//         <LiveTracking />
//       </div>

//       <div className="h-1/2 p-4">
//         <div className="flex items-center justify-between">
//           <img
//             className="h-12"
//             src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
//             alt="Captain vehicle"
//           />
//           <div className="text-right">
//             <h2 className="text-lg font-medium capitalize">
//               {ride.captain.fullname.firstname} {ride.captain.fullname.lastname}
//             </h2>
//             <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride.captain.vehicle.plate}</h4>
//             <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
//           </div>
//         </div>

//         <div className="flex gap-2 justify-between flex-col items-center">
//           <div className="w-full mt-5">
//             <div className="flex items-center gap-5 p-3 border-b-2">
//               <i className="text-lg ri-map-pin-2-fill"></i>
//               <div>
//                 <h3 className="text-lg font-medium">562/11-A</h3>
//                 <p className="text-sm -mt-1 text-gray-600">{ride.destination}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-5 p-3">
//               <i className="ri-currency-line"></i>
//               <div>
//                 <h3 className="text-lg font-medium">₹{ride.fare}</h3>
//                 <p className="text-sm -mt-1 text-gray-600">Cash</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
//           Make a Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Riding;

// import React, { useEffect, useContext } from 'react'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { SocketContext } from '../context/SocketContext'
// import LiveTracking from '../components/LiveTracking'

// const Riding = () => {
//   const location = useLocation()
//   const ride = location.state?.ride
//   const { socket } = useContext(SocketContext)
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!socket) return
//     const onRideEnded = () => navigate('/home')
//     socket.on('ride-ended', onRideEnded)
//     return () => socket.off('ride-ended', onRideEnded)
//   }, [socket, navigate])

//   return (
//     <div className='h-screen'>
//       <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
//         <i className="text-lg font-medium ri-home-5-line"></i>
//       </Link>

//       <div className='h-1/2'>
//         <LiveTracking />
//       </div>

//       <div className='h-1/2 p-4'>
//         <div className='flex items-center justify-between'>
//           <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
//           <div className='text-right'>
//             <h2 className='text-lg font-medium capitalize'>{ride?.captain?.fullname?.firstname}</h2>
//             <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate}</h4>
//             <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
//           </div>
//         </div>

//         <div className='flex gap-2 justify-between flex-col items-center'>
//           <div className='w-full mt-5'>
//             <div className='flex items-center gap-5 p-3 border-b-2'>
//               <i className="text-lg ri-map-pin-2-fill"></i>
//               <div>
//                 <h3 className='text-lg font-medium'>562/11-A</h3>
//                 <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
//               </div>
//             </div>
//             <div className='flex items-center gap-5 p-3'>
//               <i className="ri-currency-line"></i>
//               <div>
//                 <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
//                 <p className='text-sm -mt-1 text-gray-600'>Cash</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>
//           Make a Payment
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Riding
// import React, { useEffect } from 'react';
// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import LiveTracking from '../components/LiveTracking';

// const Riding = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const ride = location.state?.ride;

//   useEffect(() => {
//     if (!ride) {
//       // Redirect to home if ride data is missing
//       navigate('/home', { replace: true });
//     }
//   }, [ride, navigate]);

//   if (!ride) {
//     return <div>Loading ride details...</div>; // Optionally a spinner or loading UI
//   }

//   return (
//     <div
//       className="flex flex-col h-screen"  // Full viewport height and flex layout
//       style={{ backgroundColor: '#f8fafc' }}
//     >
//       <Link
//         to="/home"
//         className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full z-50"
//       >
//         <i className="text-lg font-medium ri-home-5-line"></i>
//       </Link>

//       {/* Live Tracking expands to half the screen height */}
//       <div
//         className="flex-grow min-h-[50vh]"
//         style={{ border: '2px dashed #0ea5e9' }} // Debug border to visualize layout
//       >
//         <LiveTracking />
//       </div>

//       {/* Ride info panel fixed to remaining half screen */}
//       <div
//         className="p-4 h-1/2 overflow-auto"
//         style={{ border: '2px dotted #f43f5e' }} // Debug border
//       >
//         <div className="flex items-center justify-between">
//           <img
//             className="h-12 rounded-md"
//             src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
//             alt="Captain vehicle"
//           />
//           <div className="text-right">
//             <h2 className="text-lg font-medium capitalize">
//               {ride.captain.fullname.firstname} {ride.captain.fullname.lastname}
//             </h2>
//             <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride.captain.vehicle.plate}</h4>
//             <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
//           </div>
//         </div>

//         <div className="mt-5 space-y-4">
//           <div className="flex items-center gap-5 border-b-2 pb-2">
//             <i className="text-lg ri-map-pin-2-fill"></i>
//             <div>
//               <h3 className="text-lg font-medium">562/11-A</h3>
//               <p className="text-sm -mt-1 text-gray-600">{ride.destination}</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-5">
//             <i className="ri-currency-line"></i>
//             <div>
//               <h3 className="text-lg font-medium">₹{ride.fare}</h3>
//               <p className="text-sm -mt-1 text-gray-600">Cash</p>
//             </div>
//           </div>
//         </div>

//         <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
//           Make a Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Riding;

import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Riding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ride = location.state?.ride;

  useEffect(() => {
    if (!ride) {
      navigate('/home', { replace: true });
    }
  }, [ride, navigate]);

  if (!ride) {
    return <div>Loading ride details...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-4 relative overflow-y-auto">
      <Link
        to="/home"
        className="fixed right-4 top-4 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow z-50"
      >
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>

      <div className="flex-grow min-h-[50vh] border border-blue-400 rounded overflow-hidden">
        <LiveTracking />
      </div>

      <div className="mt-4 bg-white rounded shadow p-4 overflow-auto">
        <div className="flex items-center justify-between">
          <img
            className="h-12 rounded-md flex-shrink-0"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt="Captain vehicle"
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">
              {ride.captain.fullname.firstname} {ride.captain.fullname.lastname}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride.captain.vehicle.plate}</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex items-center gap-5 border-b pb-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm mt-1 text-gray-600">{ride.destination}</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">Fare</h3>
              <p className="text-sm mt-1 text-gray-600">₹{ride.fare}</p>
            </div>
          </div>
        </div>

        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg hover:bg-green-700 transition">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
