// import React, { useRef, useState } from 'react'
// import { Link } from 'react-router-dom'
// import CaptainDetails from '../components/CaptainDetails'
// import RidePopUp from '../components/RidePopUp'
// import { useGSAP } from '@gsap/react'
// import gsap from 'gsap'
// import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
// import { useEffect, useContext } from 'react'
// import { SocketContext } from '../context/SocketContext'
// import { CaptainDataContext } from '../context/CapatainContext'
// import axios from 'axios'

// const CaptainHome = () => {

//     const [ ridePopupPanel, setRidePopupPanel ] = useState(false)
//     const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)

//     const ridePopupPanelRef = useRef(null)
//     const confirmRidePopupPanelRef = useRef(null)
//     const [ ride, setRide ] = useState(null)

//     const { socket } = useContext(SocketContext)
//     const { captain } = useContext(CaptainDataContext)

//     useEffect(() => {
//         socket.emit('join', {
//             userId: captain._id,
//             userType: 'captain'
//         })
//         const updateLocation = () => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(position => {

//                     socket.emit('update-location-captain', {
//                         userId: captain._id,
//                         location: {
//                             ltd: position.coords.latitude,
//                             lng: position.coords.longitude
//                         }
//                     })
//                 })
//             }
//         }

//         const locationInterval = setInterval(updateLocation, 10000)
//         updateLocation()

//         // return () => clearInterval(locationInterval)
//     }, [])

//     socket.on('new-ride', (data) => {

//         setRide(data)
//         setRidePopupPanel(true)

//     })

//     async function confirmRide() {

//         const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

//             rideId: ride._id,
//             captainId: captain._id,


//         }, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         })

//         setRidePopupPanel(false)
//         setConfirmRidePopupPanel(true)

//     }


//     useGSAP(function () {
//         if (ridePopupPanel) {
//             gsap.to(ridePopupPanelRef.current, {
//                 transform: 'translateY(0)'
//             })
//         } else {
//             gsap.to(ridePopupPanelRef.current, {
//                 transform: 'translateY(100%)'
//             })
//         }
//     }, [ ridePopupPanel ])

//     useGSAP(function () {
//         if (confirmRidePopupPanel) {
//             gsap.to(confirmRidePopupPanelRef.current, {
//                 transform: 'translateY(0)'
//             })
//         } else {
//             gsap.to(confirmRidePopupPanelRef.current, {
//                 transform: 'translateY(100%)'
//             })
//         }
//     }, [ confirmRidePopupPanel ])

//     return (
//         <div className='h-screen'>
//             <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
//                 <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
//                 <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
//                     <i className="text-lg font-medium ri-logout-box-r-line"></i>
//                 </Link>
//             </div>
//             <div className='h-3/5'>
//                 <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

//             </div>
//             <div className='h-2/5 p-6'>
//                 <CaptainDetails />
//             </div>
//             <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
//                 <RidePopUp
//                     ride={ride}
//                     setRidePopupPanel={setRidePopupPanel}
//                     setConfirmRidePopupPanel={setConfirmRidePopupPanel}
//                     confirmRide={confirmRide}
//                 />
//             </div>
//             <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
//                 <ConfirmRidePopUp
//                     ride={ride}
//                     setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
//             </div>
//         </div>
//     )
// }

// export default CaptainHome









//avg
// import React, { useRef, useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import CaptainDetails from "../components/CaptainDetails";
// import RidePopUp from "../components/RidePopUp";
// import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
// import FinishRide from "../components/FinishRide"; // ✅ Import FinishRide panel
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { SocketContext } from "../context/SocketContext";
// import { CaptainDataContext } from "../context/CapatainContext";
// import axios from "axios";
// import { CarFront, LogOut } from "lucide-react";

// const CaptainHome = () => {
//   const [ridePopupPanel, setRidePopupPanel] = useState(false);
//   const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
//   const [finishRidePanel, setFinishRidePanel] = useState(false); // ✅ new state
//   const [ride, setRide] = useState(null);
//   const [loadingConfirm, setLoadingConfirm] = useState(false);

//   const ridePopupPanelRef = useRef(null);
//   const confirmRidePopupPanelRef = useRef(null);
//   const finishRidePanelRef = useRef(null); // ✅ GSAP ref for finish panel

//   const { socket } = useContext(SocketContext);
//   const { captain } = useContext(CaptainDataContext);

//   // 🚖 Join room + live location updates
//   useEffect(() => {
//     if (!socket || !captain?._id) return;

//     socket.emit("join", { userId: captain._id, userType: "captain" });

//     const updateLocation = () => {
//       if (!navigator.geolocation) return;
//       navigator.geolocation.getCurrentPosition((pos) => {
//         socket.emit("update-location-captain", {
//           userId: captain._id,
//           location: {
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           },
//         });
//       });
//     };

//     const onNewRide = (data) => {
//       setRide(data);
//       setRidePopupPanel(true);
//     };

//     updateLocation();
//     const locationInterval = setInterval(updateLocation, 10000);
//     socket.on("new-ride", onNewRide);

//     // ✅ Trigger finish ride when ride is marked as started
//     const onRideStarted = (rideObj) => {
//       setRide(rideObj);
//       setFinishRidePanel(true);
//     };
//     socket.on("ride-started", onRideStarted);

//     return () => {
//       clearInterval(locationInterval);
//       socket.off("new-ride", onNewRide);
//       socket.off("ride-started", onRideStarted);
//     };
//   }, [socket, captain?._id]);

//   // 🚖 Confirm Ride
//   async function confirmRide() {
//     if (!ride?._id || !captain?._id) return;
//     setLoadingConfirm(true);
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
//         { rideId: ride._id, captainId: captain._id },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       setRidePopupPanel(false);
//       setConfirmRidePopupPanel(true);
//     } catch (err) {
//       alert(err?.response?.data?.message || "Failed to confirm ride");
//     } finally {
//       setLoadingConfirm(false);
//     }
//   }

//   // 🚖 GSAP animations
//   useGSAP(() => {
//     gsap.to(ridePopupPanelRef.current, {
//       transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
//       duration: 0.4,
//       ease: "power3.out",
//     });
//   }, [ridePopupPanel]);

//   useGSAP(() => {
//     gsap.to(confirmRidePopupPanelRef.current, {
//       transform: confirmRidePopupPanel ? "translateY(0)" : "translateY(100%)",
//       duration: 0.4,
//       ease: "power3.out",
//     });
//   }, [confirmRidePopupPanel]);

//   useGSAP(() => {
//     gsap.to(finishRidePanelRef.current, {
//       transform: finishRidePanel ? "translateY(0)" : "translateY(100%)",
//       duration: 0.4,
//       ease: "power3.out",
//     });
//   }, [finishRidePanel]);

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-900 text-white">
//       {/* 🔝 Header */}
//       <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gray-800/70 backdrop-blur-md shadow-md">
//         <div
//           className="flex items-center gap-2 cursor-pointer"
//           onClick={() => (window.location.href = "/")}
//         >
//           <CarFront className="w-8 h-8 text-green-400" />
//           <h1 className="text-xl font-bold text-green-400">Sawari Captain</h1>
//         </div>
//         <Link
//           to="/captain-logout"
//           className="p-2 bg-white rounded-full text-gray-800 hover:bg-red-500 hover:text-white transition-colors"
//         >
//           <LogOut className="w-5 h-5" />
//         </Link>
//       </header>

//       {/* Map / Ride Preview */}
//       <div className="mt-24 px-4 flex-1">
//         <div className="h-full w-full rounded-2xl overflow-hidden shadow-lg border border-gray-700">
//           <img
//             className="h-full w-full object-cover"
//             src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
//             alt="map"
//           />
//         </div>
//       </div>

//       {/* Captain Details */}
//       <div className="px-4 py-6">
//         <div className="bg-gray-800/95 p-6 rounded-2xl shadow-lg border border-gray-700">
//           <CaptainDetails />
//         </div>
//       </div>

//       {/* Ride Popup */}
//       <div
//         ref={ridePopupPanelRef}
//         className="fixed bottom-4 left-4 right-4 z-30 translate-y-full
//              bg-white text-gray-900 px-4 py-6 rounded-2xl shadow-2xl
//              border border-gray-300 max-h-[80vh] overflow-y-auto"
//       >
//         <RidePopUp
//           ride={ride}
//           setRidePopupPanel={setRidePopupPanel}
//           setConfirmRidePopupPanel={setConfirmRidePopupPanel}
//           confirmRide={confirmRide}
//           loading={loadingConfirm}
//         />
//       </div>

//       {/* Confirm Ride Popup */}
//       <div
//         ref={confirmRidePopupPanelRef}
//         className="fixed bottom-4 left-4 right-4 z-30 translate-y-full
//              bg-white text-gray-900 px-4 py-6 rounded-2xl shadow-2xl
//              border border-gray-300 max-h-[85vh] overflow-y-auto"
//       >
//         <ConfirmRidePopUp
//           ride={ride}
//           setConfirmRidePopupPanel={setConfirmRidePopupPanel}
//           setRidePopupPanel={setRidePopupPanel}
//         />
//       </div>

//       {/* Finish Ride Panel */}
//       <div
//         ref={finishRidePanelRef}
//         className="fixed bottom-4 left-4 right-4 z-40 translate-y-full"
//       >
//         {ride && (
//           <FinishRide ride={ride} setFinishRidePanel={setFinishRidePanel} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default CaptainHome;


//improved

// import React, { useRef, useState, useEffect, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import CaptainDetails from "../components/CaptainDetails";
// import RidePopUp from "../components/RidePopUp";
// import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
// import FinishRide from "../components/FinishRide";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { SocketContext } from "../context/SocketContext";
// import { CaptainDataContext } from "../context/CapatainContext";
// import axios from "axios";
// import { CarFront, LogOut } from "lucide-react";

// const CaptainHome = () => {
//   const [ridePopupPanel, setRidePopupPanel] = useState(false);
//   const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
//   const [finishRidePanel, setFinishRidePanel] = useState(false);
//   const [ride, setRide] = useState(null);
//   const [loadingConfirm, setLoadingConfirm] = useState(false);

//   const ridePopupPanelRef = useRef(null);
//   const confirmRidePopupPanelRef = useRef(null);
//   const finishRidePanelRef = useRef(null);

//   const { socket } = useContext(SocketContext);
//   const { captain } = useContext(CaptainDataContext);
//   const navigate = useNavigate();

//   // 🚖 Vehicle images mapping
//   const vehicleImages = {
//     car: 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg',
//     moto: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
//     auto: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png'
//   };

//   const getVehicleImage = () => vehicleImages[ride?.vehicleType] || vehicleImages.car;

//   // 🚖 Join room + live location updates
//   useEffect(() => {
//     if (!socket || !captain?._id) return;

//     socket.emit("join", { userId: captain._id, userType: "captain" });

//     const updateLocation = () => {
//       if (!navigator.geolocation) return;
//       navigator.geolocation.getCurrentPosition((pos) => {
//         socket.emit("update-location-captain", {
//           userId: captain._id,
//           location: { lat: pos.coords.latitude, lng: pos.coords.longitude },
//         });
//       });
//     };

//     const onNewRide = (data) => {
//       setRide(data);
//       setRidePopupPanel(true);
//     };

//     const onRideStarted = (rideObj) => {
//       setRide(rideObj);
//       setFinishRidePanel(true);
//     };

//     updateLocation();
//     const locationInterval = setInterval(updateLocation, 10000);
//     socket.on("new-ride", onNewRide);
//     socket.on("ride-started", onRideStarted);

//     return () => {
//       clearInterval(locationInterval);
//       socket.off("new-ride", onNewRide);
//       socket.off("ride-started", onRideStarted);
//     };
//   }, [socket, captain?._id]);

//   // 🚖 Confirm Ride
//   const confirmRide = async () => {
//     if (!ride?._id || !captain?._id) return;
//     setLoadingConfirm(true);
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
//         { rideId: ride._id, captainId: captain._id },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       setRidePopupPanel(false);
//       setConfirmRidePopupPanel(true);
//     } catch (err) {
//       alert(err?.response?.data?.message || "Failed to confirm ride");
//     } finally {
//       setLoadingConfirm(false);
//     }
//   };

//   // 🚖 GSAP animations
//   useGSAP(() => {
//     gsap.to(ridePopupPanelRef.current, {
//       transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
//       duration: 0.4,
//       ease: "power3.out",
//     });
//   }, [ridePopupPanel]);

//   useGSAP(() => {
//     gsap.to(confirmRidePopupPanelRef.current, {
//       transform: confirmRidePopupPanel ? "translateY(0)" : "translateY(100%)",
//       duration: 0.4,
//       ease: "power3.out",
//     });
//   }, [confirmRidePopupPanel]);

//   useGSAP(() => {
//     gsap.to(finishRidePanelRef.current, {
//       transform: finishRidePanel ? "translateY(0)" : "translateY(100%)",
//       duration: 0.4,
//       ease: "power3.out",
//     });
//   }, [finishRidePanel]);

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-900 text-white">
//       {/* Header */}
//       <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gray-800/70 backdrop-blur-md shadow-md">
//         <div
//           className="flex items-center gap-2 cursor-pointer"
//           onClick={() => (window.location.href = "/")}
//         >
//           <CarFront className="w-8 h-8 text-green-400" />
//           <h1 className="text-xl font-bold text-green-400">Sawari Captain</h1>
//         </div>
//         <Link
//           to="/captain-logout"
//           className="p-2 bg-white rounded-full text-gray-800 hover:bg-red-500 hover:text-white transition-colors"
//         >
//           <LogOut className="w-5 h-5" />
//         </Link>
//       </header>

//       {/* Map */}
//       <div className="mt-24 px-4 flex-1">
//         <div className="h-full w-full rounded-2xl overflow-hidden shadow-lg border border-gray-700">
//           <img
//             className="h-full w-full object-cover"
//             src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
//             alt="map"
//           />
//         </div>
//       </div>

//       {/* Captain Details */}
//       <div className="px-4 py-6">
//         <div className="bg-gray-800/95 p-6 rounded-2xl shadow-lg border border-gray-700">
//           <CaptainDetails />
//         </div>
//       </div>

//       {/* Ride Popup */}
//       <div
//         ref={ridePopupPanelRef}
//         className="fixed bottom-4 left-4 right-4 z-30 translate-y-full
//                    bg-white text-gray-900 px-4 py-6 rounded-2xl shadow-2xl
//                    border border-gray-300 max-h-[80vh] overflow-y-auto"
//       >
//         <RidePopUp
//           ride={ride}
//           setRidePopupPanel={setRidePopupPanel}
//           setConfirmRidePopupPanel={setConfirmRidePopupPanel}
//           confirmRide={confirmRide}
//           loading={loadingConfirm}
//           vehicleImage={getVehicleImage()}
//         />
//       </div>

//       {/* Confirm Ride Popup */}
//       <div
//         ref={confirmRidePopupPanelRef}
//         className="fixed bottom-4 left-4 right-4 z-30 translate-y-full
//                    bg-white text-gray-900 px-4 py-6 rounded-2xl shadow-2xl
//                    border border-gray-300 max-h-[85vh] overflow-y-auto"
//       >
//         <ConfirmRidePopUp
//           ride={ride}
//           setConfirmRidePopupPanel={setConfirmRidePopupPanel}
//           setRidePopupPanel={setRidePopupPanel}
//           vehicleImage={getVehicleImage()}
//         />
//       </div>

//       {/* Finish Ride Panel */}
//       <div
//         ref={finishRidePanelRef}
//         className="fixed bottom-4 left-4 right-4 z-40 translate-y-full"
//       >
//         {ride && (
//           <FinishRide
//             ride={ride}
//             setFinishRidePanel={setFinishRidePanel}
//             vehicleImage={getVehicleImage()}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default CaptainHome;


import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!captain) return;

    socket.emit('join', {
      userId: captain._id,
      userType: 'captain',
    });

    const handleNewRide = (data) => {
      console.log('New ride received:', data);
      setRide(data);
      setRidePopupPanel(true);
    };

    socket.on('new-ride', handleNewRide);

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    updateLocation();
    const locationInterval = setInterval(updateLocation, 10000);

    return () => {
      socket.off('new-ride', handleNewRide);
      clearInterval(locationInterval);
    };
  }, [captain, socket]);

  const confirmRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.status === 200) {
        setRidePopupPanel(false);
        setConfirmRidePopupPanel(true);
      }
    } catch (error) {
      console.error('Error confirming ride:', error);
    }
  };

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen relative">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen bg-white z-30 shadow">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Logo"
        />
        <Link to="/captain-home" className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow">
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5 mt-20">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Ride animation"
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-40 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 shadow-lg"
        style={{ transition: 'transform 0.3s ease' }}
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-50 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 shadow-lg overflow-auto"
        style={{ transition: 'transform 0.3s ease' }}
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
