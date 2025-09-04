// import React from 'react'

// const LookingForDriver = (props) => {
//     return (
//         <div>
//             <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
//                 props.setVehicleFound(false)
//             }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
//             <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>

//             <div className='flex gap-2 justify-between flex-col items-center'>
//                 <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
//                 <div className='w-full mt-5'>
//                     <div className='flex items-center gap-5 p-3 border-b-2'>
//                         <i className="ri-map-pin-user-fill"></i>
//                         <div>
//                             <h3 className='text-lg font-medium'>562/11-A</h3>
//                             <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
//                         </div>
//                     </div>
//                     <div className='flex items-center gap-5 p-3 border-b-2'>
//                         <i className="text-lg ri-map-pin-2-fill"></i>
//                         <div>
//                             <h3 className='text-lg font-medium'>562/11-A</h3>
//                             <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
//                         </div>
//                     </div>
//                     <div className='flex items-center gap-5 p-3'>
//                         <i className="ri-currency-line"></i>
//                         <div>
//                             <h3 className='text-lg font-medium'>₹{props.fare[ props.vehicleType ]} </h3>
//                             <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default LookingForDriver


// import React from "react";

// const vehicleImages = {
//   car: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
//   moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
//   auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
// };

// const LookingForDriver = (props) => {
//   return (
//     <div className="bg-gray-800/95 px-6 py-8 pt-12 rounded-t-3xl shadow-xl text-white">
//       {/* Close button */}
//       <h5
//         className="p-1 text-center absolute top-4 right-6 cursor-pointer opacity-80 hover:opacity-100 transition"
//         onClick={() => props.setVehicleFound(false)}
//       >
//         <i className="text-3xl ri-arrow-down-wide-line"></i>
//       </h5>

//       {/* Title */}
//       <h3 className="text-2xl font-bold text-center mb-6">Looking for a Driver</h3>

//       {/* Vehicle Image */}
//       <div className="flex justify-center mb-6">
//         <img
//           className="h-28 rounded-lg shadow-lg"
//           src={vehicleImages[props.vehicleType] || vehicleImages.car}
//           alt={props.vehicleType}
//         />
//       </div>

//       {/* Ride details */}
//       <div className="space-y-3">
//         <div className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg">
//           <i className="ri-map-pin-user-fill text-xl"></i>
//           <div>
//             <h4 className="font-medium">{props.pickup}</h4>
//             <p className="text-sm text-gray-300">Pickup location</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg">
//           <i className="ri-map-pin-2-fill text-xl"></i>
//           <div>
//             <h4 className="font-medium">{props.destination}</h4>
//             <p className="text-sm text-gray-300">Destination</p>
//           </div>
//         </div>

//         <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
//           <div className="flex items-center gap-4">
//             <i className="ri-currency-line text-xl"></i>
//             <div>
//               <h4 className="font-semibold text-lg">₹{props.fare[props.vehicleType]}</h4>
//               <p className="text-sm text-gray-300">Cash</p>
//             </div>
//           </div>
//           <span className="bg-sky-500 px-3 py-1 rounded-full text-sm font-medium">
//             {props.vehicleType?.toUpperCase()}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LookingForDriver;


import React from 'react';

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]} </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
