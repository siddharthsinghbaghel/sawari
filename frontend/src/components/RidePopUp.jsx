// import React from 'react'

// const RidePopUp = (props) => {
//     return (
//         <div>
//             <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
//                 props.setRidePopupPanel(false)
//             }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
//             <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
//             <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
//                 <div className='flex items-center gap-3 '>
//                     <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
//                     <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
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
//                 <div className='mt-5 w-full '>
//                     <button onClick={() => {
//                         props.setConfirmRidePopupPanel(true)
//                         props.confirmRide()

//                     }} className=' bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg'>Accept</button>

//                     <button onClick={() => {
//                         props.setRidePopupPanel(false)

//                     }} className='mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg'>Ignore</button>


//                 </div>
//             </div>
//         </div>
//     )
// }

// export default RidePopUp


// import React from 'react';

// const vehicleImages = {
//   car: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
//   moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
//   auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
// };

// const RidePopUp = ({ ride, setRidePopupPanel, setConfirmRidePopupPanel, confirmRide }) => {
//   return (
//     <div>
//       <h5
//         className="p-1 text-center w-[93%] absolute top-0"
//         onClick={() => setRidePopupPanel(false)}
//       >
//         <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
//       </h5>

//       <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>

//       <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
//         <div className="flex items-center gap-3">
//           <img
//             className="h-12 rounded-full object-cover w-12"
//             src={ride?.user?.avatar || "https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"}
//             alt="User"
//           />
//           <h2 className="text-lg font-medium capitalize">
//             {ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}
//           </h2>
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

//         <div className="mt-5 w-full">
//           <button
//             onClick={() => {
//               setConfirmRidePopupPanel(true);
//               confirmRide();
//             }}
//             className="bg-green-600 w-full text-white font-semibold p-3 rounded-lg"
//           >
//             Accept
//           </button>
//           <button
//             onClick={() => setRidePopupPanel(false)}
//             className="mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-3 rounded-lg"
//           >
//             Ignore
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RidePopUp;

// import React from 'react';

// const RidePopUp = (props) => {
//   return (
//     <div>
//       <h5
//         className="p-1 text-center w-[93%] absolute top-0"
//         onClick={() => {
//           props.setRidePopupPanel(false);
//         }}
//       >
//         <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
//       </h5>
//       <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
//       <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
//         <div className="flex items-center gap-3 ">
//           <img
//             className="h-12 rounded-full object-cover w-12"
//             src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
//             alt=""
//           />
//           <h2 className="text-lg font-medium">
//             {props.ride?.user.fullname.firstname + ' ' + props.ride?.user.fullname.lastname}
//           </h2>
//         </div>
//         <h5 className="text-lg font-semibold">2.2 KM</h5>
//       </div>
//       <div className="flex gap-2 justify-between flex-col items-center">
//         <div className="w-full mt-5">
//           <div className="flex items-center gap-5 p-3 border-b-2">
//             <i className="ri-map-pin-user-fill"></i>
//             <div>
//               <h3 className="text-lg font-medium">562/11-A</h3>
//               <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-5 p-3 border-b-2">
//             <i className="text-lg ri-map-pin-2-fill"></i>
//             <div>
//               <h3 className="text-lg font-medium">562/11-A</h3>
//               <p className="text-sm -mt-1 text-gray-600">{props.ride?.destination}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-5 p-3">
//             <i className="ri-currency-line"></i>
//             <div>
//               <h3 className="text-lg font-medium">₹{props.ride?.fare} </h3>
//               <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
//             </div>
//           </div>
//         </div>
//         <div className="mt-5 w-full ">
//           <button
//             onClick={() => {
//               props.setConfirmRidePopupPanel(true);
//               props.confirmRide();
//             }}
//             className="bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg"
//           >
//             Accept
//           </button>

//           <button
//             onClick={() => {
//               props.setRidePopupPanel(false);
//             }}
//             className="mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg"
//           >
//             Ignore
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RidePopUp;

import React from 'react';

const RidePopUp = (props) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={() => props.setRidePopupPanel(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto flex flex-col relative p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={() => props.setRidePopupPanel(false)}
          aria-label="Close popup"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>

        <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>

        <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg flex-shrink-0">
          <div className="flex items-center gap-3">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
              alt="User"
            />
            <h2 className="text-lg font-medium">
              {props.ride?.user.fullname.firstname} {props.ride?.user.fullname.lastname}
            </h2>
          </div>
          <h5 className="text-lg font-semibold">2.2 KM</h5>
        </div>

        <div className="mt-5 space-y-4 flex-grow overflow-y-auto">
          <div className="flex items-center gap-5 border-b pb-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm mt-1 text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 border-b pb-2">
            <i className="ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm mt-1 text-gray-600">{props.ride?.destination}</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">Fare</h3>
              <p className="text-sm mt-1 text-gray-600">₹{props.ride?.fare}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-2 flex-shrink-0">
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(true);
              props.confirmRide();
            }}
            className="bg-green-600 w-full text-white font-semibold p-3 rounded-lg hover:bg-green-700 transition"
          >
            Accept
          </button>

          <button
            onClick={() => props.setRidePopupPanel(false)}
            className="w-full bg-gray-300 text-gray-700 font-semibold p-3 rounded-lg hover:bg-gray-400 transition"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
