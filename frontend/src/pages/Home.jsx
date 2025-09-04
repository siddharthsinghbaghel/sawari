// import React, { useEffect, useRef, useState, useContext } from 'react';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import axios from 'axios';
// import 'remixicon/fonts/remixicon.css';
// import LocationSearchPanel from '../components/LocationSearchPanel';
// import VehiclePanel from '../components/VehiclePanel';
// import ConfirmRide from '../components/ConfirmRide';
// import LookingForDriver from '../components/LookingForDriver';
// import WaitingForDriver from '../components/WaitingForDriver';
// import { SocketContext } from '../context/SocketContext';
// import { UserDataContext } from '../context/UserContext';
// import { useNavigate } from 'react-router-dom';
// import LiveTracking from '../components/LiveTracking';

// const Home = () => {
//   const [pickup, setPickup] = useState('');
//   const [destination, setDestination] = useState('');
//   const [panelOpen, setPanelOpen] = useState(false);
//   const vehiclePanelRef = useRef(null);
//   const confirmRidePanelRef = useRef(null);
//   const vehicleFoundRef = useRef(null);
//   const waitingForDriverRef = useRef(null);
//   const panelRef = useRef(null);
//   const panelCloseRef = useRef(null);
//   const [vehiclePanel, setVehiclePanel] = useState(false);
//   const [confirmRidePanel, setConfirmRidePanel] = useState(false);
//   const [vehicleFound, setVehicleFound] = useState(false);
//   const [waitingForDriver, setWaitingForDriver] = useState(false);
//   const [pickupSuggestions, setPickupSuggestions] = useState([]);
//   const [destinationSuggestions, setDestinationSuggestions] = useState([]);
//   const [activeField, setActiveField] = useState(null);
//   const [fare, setFare] = useState({});
//   const [vehicleType, setVehicleType] = useState(null);
//   const [ride, setRide] = useState(null);

//   const navigate = useNavigate();

//   const { socket } = useContext(SocketContext);
//   const { user } = useContext(UserDataContext);

//   // ✅ Join socket room + listeners with cleanup
//   useEffect(() => {
//     if (!socket || !user) return;

//     socket.emit("join", { userType: "user", userId: user._id });

//     socket.on("ride-confirmed", (ride) => {
//       setVehicleFound(false);
//       setWaitingForDriver(true);
//       setRide(ride);
//     });

//     socket.on("ride-started", (ride) => {
//       setWaitingForDriver(false);
//       navigate("/riding", { state: { ride } });
//     });

//     return () => {
//       socket.off("ride-confirmed");
//       socket.off("ride-started");
//     };
//   }, [socket, user, navigate]);

//   const handlePickupChange = async (e) => {
//     setPickup(e.target.value);
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
//         params: { input: e.target.value },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setPickupSuggestions(response.data);
//     } catch {
//       // handle error
//     }
//   };

//   const handleDestinationChange = async (e) => {
//     setDestination(e.target.value);
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
//         params: { input: e.target.value },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setDestinationSuggestions(response.data);
//     } catch {
//       // handle error
//     }
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//   };

//   // ✅ GSAP animations with conditional states
//   useGSAP(() => {
//     gsap.to(panelRef.current, {
//       height: panelOpen ? "70%" : "0%",
//       padding: panelOpen ? 24 : 0,
//     });
//     gsap.to(panelCloseRef.current, {
//       opacity: panelOpen ? 1 : 0,
//     });
//   }, [panelOpen]);

//   useGSAP(() => {
//     gsap.to(vehiclePanelRef.current, {
//       transform: vehiclePanel ? "translateY(0)" : "translateY(100%)",
//       duration: 0.3
//     });
//   }, [vehiclePanel]);

//   useGSAP(() => {
//     gsap.to(confirmRidePanelRef.current, {
//       transform: confirmRidePanel ? "translateY(0)" : "translateY(100%)",
//       duration: 0.3
//     });
//   }, [confirmRidePanel]);

//   useGSAP(() => {
//     gsap.to(vehicleFoundRef.current, {
//       transform: vehicleFound ? "translateY(0)" : "translateY(100%)",
//       duration: 0.3
//     });
//   }, [vehicleFound]);

//   useGSAP(() => {
//     gsap.to(waitingForDriverRef.current, {
//       transform: waitingForDriver ? "translateY(0)" : "translateY(100%)",
//       duration: 0.3
//     });
//   }, [waitingForDriver]);

//   async function findTrip() {
//     setVehiclePanel(true);
//     setPanelOpen(false);

//     const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
//       params: { pickup, destination },
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });

//     setFare(response.data);
//   }

//   async function createRide() {
//     await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
//       pickup,
//       destination,
//       vehicleType
//     }, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//   }

//   return (
//     <div className='h-screen relative overflow-hidden'>
//       <img
//         className='w-16 absolute left-5 top-5'
//         src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
//         alt="logo"
//       />
//       <div className='h-screen w-screen'>
//         <LiveTracking />
//       </div>

//       {/* Bottom panels */}
//       <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
//         <div className='h-[30%] p-6 bg-white relative'>
//           <h5
//             ref={panelCloseRef}
//             onClick={() => setPanelOpen(false)}
//             className='absolute opacity-0 right-6 top-6 text-2xl cursor-pointer'
//           >
//             <i className="ri-arrow-down-wide-line"></i>
//           </h5>
//           <h4 className='text-2xl font-semibold'>Find a trip</h4>

//           <form className='relative py-3' onSubmit={submitHandler}>
//             <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
//             <input
//               onClick={() => {
//                 setPanelOpen(true);
//                 setActiveField('pickup');
//               }}
//               value={pickup}
//               onChange={handlePickupChange}
//               className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
//               type="text"
//               placeholder='Add a pick-up location'
//             />
//             <input
//               onClick={() => {
//                 setPanelOpen(true);
//                 setActiveField('destination');
//               }}
//               value={destination}
//               onChange={handleDestinationChange}
//               className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
//               type="text"
//               placeholder='Enter your destination'
//             />
//           </form>

//           <button
//             onClick={findTrip}
//             className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'
//           >
//             Find Trip
//           </button>
//         </div>

//         <div ref={panelRef} className='bg-white h-0'>
//           <LocationSearchPanel
//             suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
//             setPanelOpen={setPanelOpen}
//             setVehiclePanel={setVehiclePanel}
//             setPickup={setPickup}
//             setDestination={setDestination}
//             activeField={activeField}
//           />
//         </div>
//       </div>

//       {/* Sliding Panels */}
//       <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
//         <VehiclePanel
//           selectVehicle={setVehicleType}
//           fare={fare}
//           setConfirmRidePanel={setConfirmRidePanel}
//           setVehiclePanel={setVehiclePanel}
//         />
//       </div>

//       <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
//         <ConfirmRide
//           createRide={createRide}
//           pickup={pickup}
//           destination={destination}
//           fare={fare}
//           vehicleType={vehicleType}
//           setConfirmRidePanel={setConfirmRidePanel}
//           setVehicleFound={setVehicleFound}
//         />
//       </div>

//       <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
//         <LookingForDriver
//           createRide={createRide}
//           pickup={pickup}
//           destination={destination}
//           fare={fare}
//           vehicleType={vehicleType}
//           setVehicleFound={setVehicleFound}
//         />
//       </div>

//       <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'>
//         <WaitingForDriver
//           ride={ride}
//           setVehicleFound={setVehicleFound}
//           setWaitingForDriver={setWaitingForDriver}
//           waitingForDriver={waitingForDriver}
//         />
//       </div>
//     </div>
//   );
// };

// export default Home;






// this is good code 


// import React, { useEffect, useRef, useState, useContext } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import axios from "axios";
// import "remixicon/fonts/remixicon.css";
// import LocationSearchPanel from "../components/LocationSearchPanel";
// import VehiclePanel from "../components/VehiclePanel";
// import ConfirmRide from "../components/ConfirmRide";
// import LookingForDriver from "../components/LookingForDriver";
// import WaitingForDriver from "../components/WaitingForDriver";
// import { SocketContext } from "../context/SocketContext";
// import { UserDataContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import LiveTracking from "../components/LiveTracking";

// const Home = () => {
//   const [pickup, setPickup] = useState("");
//   const [destination, setDestination] = useState("");
//   const [panelOpen, setPanelOpen] = useState(false);
//   const [vehiclePanel, setVehiclePanel] = useState(false);
//   const [confirmRidePanel, setConfirmRidePanel] = useState(false);
//   const [vehicleFound, setVehicleFound] = useState(false);
//   const [waitingForDriver, setWaitingForDriver] = useState(false);
//   const [pickupSuggestions, setPickupSuggestions] = useState([]);
//   const [destinationSuggestions, setDestinationSuggestions] = useState([]);
//   const [activeField, setActiveField] = useState(null);
//   const [fare, setFare] = useState({});
//   const [vehicleType, setVehicleType] = useState(null);
//   const [ride, setRide] = useState(null);
//   const [loadingFare, setLoadingFare] = useState(false);

//   const navigate = useNavigate();
//   const { socket } = useContext(SocketContext);
//   const { user } = useContext(UserDataContext);

//   const vehiclePanelRef = useRef(null);
//   const confirmRidePanelRef = useRef(null);
//   const vehicleFoundRef = useRef(null);
//   const waitingForDriverRef = useRef(null);
//   const panelRef = useRef(null);
//   const panelCloseRef = useRef(null);

//   // 🚖 Socket events
//   useEffect(() => {
//     if (!socket || !user?._id) return;
//     socket.emit("join", { userType: "user", userId: user._id });

//     const onRideConfirmed = (rideObj) => {
//       setVehicleFound(false);
//       setWaitingForDriver(true);
//       setRide(rideObj);
//     };
//     const onRideStarted = (rideObj) => {
//       setWaitingForDriver(false);
//       navigate("/riding", { state: { ride: rideObj } });
//     };

//     socket.on("ride-confirmed", onRideConfirmed);
//     socket.on("ride-started", onRideStarted);

//     return () => {
//       socket.off("ride-confirmed", onRideConfirmed);
//       socket.off("ride-started", onRideStarted);
//     };
//   }, [socket, user?._id, navigate]);

//   const authHeader = () => ({
//     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   });

//   // 📍 Location search
//   const handlePickupChange = async (e) => {
//     const val = e.target.value;
//     setPickup(val);
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
//         { params: { input: val }, ...authHeader() }
//       );
//       setPickupSuggestions(data);
//     } catch {}
//   };

//   const handleDestinationChange = async (e) => {
//     const val = e.target.value;
//     setDestination(val);
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
//         { params: { input: val }, ...authHeader() }
//       );
//       setDestinationSuggestions(data);
//     } catch {}
//   };

//   const submitHandler = (e) => e.preventDefault();

//   // 🎬 GSAP Animations
//   useGSAP(() => {
//     gsap.to(panelRef.current, {
//       height: panelOpen ? "70%" : "0%",
//       padding: panelOpen ? 24 : 0,
//     });
//     gsap.to(panelCloseRef.current, { opacity: panelOpen ? 1 : 0 });
//   }, [panelOpen]);

//   useGSAP(() => {
//     gsap.to(vehiclePanelRef.current, {
//       transform: vehiclePanel ? "translateY(0)" : "translateY(100%)",
//     });
//   }, [vehiclePanel]);

//   useGSAP(() => {
//     gsap.to(confirmRidePanelRef.current, {
//       transform: confirmRidePanel ? "translateY(0)" : "translateY(100%)",
//     });
//   }, [confirmRidePanel]);

//   useGSAP(() => {
//     gsap.to(vehicleFoundRef.current, {
//       transform: vehicleFound ? "translateY(0)" : "translateY(100%)",
//     });
//   }, [vehicleFound]);

//   useGSAP(() => {
//     gsap.to(waitingForDriverRef.current, {
//       transform: waitingForDriver ? "translateY(0)" : "translateY(100%)",
//     });
//   }, [waitingForDriver]);

//   // 🚕 Ride functions
//   async function findTrip() {
//     if (!pickup || !destination) {
//       alert("Please enter pickup and destination");
//       return;
//     }
//     setVehiclePanel(true);
//     setPanelOpen(false);
//     setLoadingFare(true);
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
//         { params: { pickup, destination }, ...authHeader() }
//       );
//       setFare(data);
//     } catch (err) {
//       alert(err?.response?.data?.message || "Failed to calculate fare");
//     } finally {
//       setLoadingFare(false);
//     }
//   }

//   async function createRide() {
//     if (!vehicleType) {
//       alert("Please select a vehicle");
//       return;
//     }
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/rides/create`,
//         { pickup, destination, vehicleType },
//         authHeader()
//       );
//       setConfirmRidePanel(false);
//       setVehicleFound(true);
//     } catch (err) {
//       alert(err?.response?.data?.message || "Failed to create ride");
//     }
//   }

//   return (
//     <div className="h-screen relative overflow-hidden bg-gray-900 text-white">
//       {/* 🔝 Header with Logo */}
//       <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
//         <img
//           className="w-12"
//           src="/src/assets/cars.png" // ✅ Sawari sky blue logo
//           alt="Sawari"
//         />
//         <h1 className="text-xl font-bold text-sky-400">Sawari</h1>
//       </div>

//       {/* 🗺️ Map */}
//       <div className="h-screen w-screen">
//         <LiveTracking />
//       </div>

//       {/* 🚖 Main Bottom Card */}
//       <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
//         <div className="h-[35%] p-6 bg-gray-800/95 rounded-t-3xl shadow-xl relative flex flex-col items-center">
//           <h5
//             ref={panelCloseRef}
//             onClick={() => setPanelOpen(false)}
//             className="absolute opacity-0 right-6 top-6 text-2xl cursor-pointer"
//           >
//             <i className="ri-arrow-down-wide-line"></i>
//           </h5>

//           {/* ✅ Centered Title */}
//           <h4 className="text-2xl font-bold text-sky-400 mb-4 text-center">
//             Find a Trip
//           </h4>

//           {/* Input Fields */}
//           <form className="w-full space-y-3" onSubmit={submitHandler}>
//             <input
//               onClick={() => {
//                 setPanelOpen(true);
//                 setActiveField("pickup");
//               }}
//               value={pickup}
//               onChange={handlePickupChange}
//               className="bg-gray-700 text-white px-4 py-3 text-lg rounded-lg w-full placeholder-gray-400"
//               type="text"
//               placeholder="Add a pick-up location"
//             />
//             <input
//               onClick={() => {
//                 setPanelOpen(true);
//                 setActiveField("destination");
//               }}
//               value={destination}
//               onChange={handleDestinationChange}
//               className="bg-gray-700 text-white px-4 py-3 text-lg rounded-lg w-full placeholder-gray-400"
//               type="text"
//               placeholder="Enter your destination"
//             />
//           </form>

//           {/* CTA Button */}
//           <button
//             onClick={findTrip}
//             disabled={loadingFare}
//             className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-3 rounded-xl mt-4 w-full disabled:opacity-70"
//           >
//             {loadingFare ? "Calculating…" : "Find Trip"}
//           </button>
//         </div>

//         {/* Expandable Search Panel */}
//         <div ref={panelRef} className="bg-gray-800/95 h-0 rounded-t-3xl">
//           <LocationSearchPanel
//             suggestions={
//               activeField === "pickup"
//                 ? pickupSuggestions
//                 : destinationSuggestions
//             }
//             setPanelOpen={setPanelOpen}
//             setVehiclePanel={setVehiclePanel}
//             setPickup={setPickup}
//             setDestination={setDestination}
//             activeField={activeField}
//           />
//         </div>
//       </div>

//       {/* Floating Panels */}
//       <div
//         ref={vehiclePanelRef}
//         className="fixed w-full z-10 bottom-0 translate-y-full bg-gray-800/95 px-3 py-10 pt-12 rounded-t-3xl"
//       >
//         <VehiclePanel
//           selectVehicle={setVehicleType}
//           fare={fare}
//           setConfirmRidePanel={setConfirmRidePanel}
//           setVehiclePanel={setVehiclePanel}
//         />
//       </div>

//       <div
//         ref={confirmRidePanelRef}
//         className="fixed w-full z-10 bottom-0 translate-y-full bg-gray-800/95 px-3 py-6 pt-12 rounded-t-3xl"
//       >
//         <ConfirmRide
//           createRide={createRide}
//           pickup={pickup}
//           destination={destination}
//           fare={fare}
//           vehicleType={vehicleType}
//           setConfirmRidePanel={setConfirmRidePanel}
//           setVehicleFound={setVehicleFound}
//         />
//       </div>

//       <div
//         ref={vehicleFoundRef}
//         className="fixed w-full z-10 bottom-0 translate-y-full bg-gray-800/95 px-3 py-6 pt-12 rounded-t-3xl"
//       >
//         <LookingForDriver
//           createRide={createRide}
//           pickup={pickup}
//           destination={destination}
//           fare={fare}
//           vehicleType={vehicleType}
//           setVehicleFound={setVehicleFound}
//         />
//       </div>

//       <div
//         ref={waitingForDriverRef}
//         className="fixed w-full z-10 bottom-0 bg-gray-800/95 px-3 py-6 pt-12 rounded-t-3xl"
//       >
//         <WaitingForDriver
//           ride={ride}
//           setVehicleFound={setVehicleFound}
//           setWaitingForDriver={setWaitingForDriver}
//           waitingForDriver={waitingForDriver}
//         />
//       </div>
//     </div>
//   );
// };

// export default Home;





// this is imp  and then see uber video


// import React, { useEffect, useRef, useState, useContext } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import axios from "axios";
// import "remixicon/fonts/remixicon.css";
// import LocationSearchPanel from "../components/LocationSearchPanel";
// import VehiclePanel from "../components/VehiclePanel";
// import ConfirmRide from "../components/ConfirmRide";
// import LookingForDriver from "../components/LookingForDriver";
// import WaitingForDriver from "../components/WaitingForDriver";
// import { SocketContext } from "../context/SocketContext";
// import { UserDataContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import LiveTracking from "../components/LiveTracking";

// const Home = () => {
//   const [pickup, setPickup] = useState("");
//   const [destination, setDestination] = useState("");
//   const [tripPanelOpen, setTripPanelOpen] = useState(true); // Find My Trip toggle
//   const [vehiclePanel, setVehiclePanel] = useState(false);
//   const [confirmRidePanel, setConfirmRidePanel] = useState(false);
//   const [vehicleFound, setVehicleFound] = useState(false);
//   const [waitingForDriver, setWaitingForDriver] = useState(false);
//   const [pickupSuggestions, setPickupSuggestions] = useState([]);
//   const [destinationSuggestions, setDestinationSuggestions] = useState([]);
//   const [activeField, setActiveField] = useState(null);
//   const [fare, setFare] = useState({});
//   const [vehicleType, setVehicleType] = useState(null);
//   const [ride, setRide] = useState(null);
//   const [loadingFare, setLoadingFare] = useState(false);
//   const [searchHistory, setSearchHistory] = useState([]);

//   const navigate = useNavigate();
//   const { socket } = useContext(SocketContext);
//   const { user } = useContext(UserDataContext);

//   // Refs for animations
//   const tripPanelRef = useRef(null);
//   const vehiclePanelRef = useRef(null);
//   const confirmRidePanelRef = useRef(null);
//   const vehicleFoundRef = useRef(null);
//   const waitingForDriverRef = useRef(null);

//   // Load & Save search history
//   useEffect(() => {
//     const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
//     setSearchHistory(storedHistory);
//   }, []);
//   useEffect(() => {
//     localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
//   }, [searchHistory]);

//   // Socket Events
//   useEffect(() => {
//     if (!socket || !user?._id) return;
//     socket.emit("join", { userType: "user", userId: user._id });

//     const onRideConfirmed = (rideObj) => {
//       setVehicleFound(false);
//       setWaitingForDriver(true);
//       setRide(rideObj);
//     };
//     const onRideStarted = (rideObj) => {
//       setWaitingForDriver(false);
//       navigate("/riding", { state: { ride: rideObj } });
//     };

//     socket.on("ride-confirmed", onRideConfirmed);
//     socket.on("ride-started", onRideStarted);

//     return () => {
//       socket.off("ride-confirmed", onRideConfirmed);
//       socket.off("ride-started", onRideStarted);
//     };
//   }, [socket, user?._id, navigate]);

//   const authHeader = () => ({
//     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   });

//   // Fetch Location Suggestions
//   const handlePickupChange = async (e) => {
//     const val = e.target.value;
//     setPickup(val);
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
//         { params: { input: val }, ...authHeader() }
//       );
//       setPickupSuggestions(data);
//     } catch {}
//   };
//   const handleDestinationChange = async (e) => {
//     const val = e.target.value;
//     setDestination(val);
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
//         { params: { input: val }, ...authHeader() }
//       );
//       setDestinationSuggestions(data);
//     } catch {}
//   };

//   // Animations
//   useGSAP(() => {
//     gsap.to(tripPanelRef.current, {
//       height: tripPanelOpen ? "60%" : "70px", // collapses to small bar
//       duration: 0.4,
//       ease: "power2.inOut",
//     });
//   }, [tripPanelOpen]);

//   useGSAP(() => {
//     gsap.to(vehiclePanelRef.current, {
//       transform: vehiclePanel ? "translateY(0)" : "translateY(100%)",
//     });
//   }, [vehiclePanel]);

//   useGSAP(() => {
//     gsap.to(confirmRidePanelRef.current, {
//       transform: confirmRidePanel ? "translateY(0)" : "translateY(100%)",
//     });
//   }, [confirmRidePanel]);

//   useGSAP(() => {
//     gsap.to(vehicleFoundRef.current, {
//       transform: vehicleFound ? "translateY(0)" : "translateY(100%)",
//     });
//   }, [vehicleFound]);

//   useGSAP(() => {
//     gsap.to(waitingForDriverRef.current, {
//       transform: waitingForDriver ? "translateY(0)" : "translateY(100%)",
//     });
//   }, [waitingForDriver]);

//   // Ride Logic
//   async function findTrip() {
//     if (!pickup || !destination) {
//       alert("Please enter pickup and destination");
//       return;
//     }
//     const newSearch = {
//       pickup,
//       destination,
//       time: new Date().toLocaleString(),
//     };
//     setSearchHistory([newSearch, ...searchHistory].slice(0, 10));
//     setVehiclePanel(true);
//     setTripPanelOpen(false);
//     setLoadingFare(true);
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
//         { params: { pickup, destination }, ...authHeader() }
//       );
//       setFare(data);
//     } catch (err) {
//       alert(err?.response?.data?.message || "Failed to calculate fare");
//     } finally {
//       setLoadingFare(false);
//     }
//   }

//   async function createRide() {
//     if (!vehicleType) {
//       alert("Please select a vehicle");
//       return;
//     }
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/rides/create`,
//         { pickup, destination, vehicleType },
//         authHeader()
//       );
//       setConfirmRidePanel(false);
//       setVehicleFound(true);
//     } catch (err) {
//       alert(err?.response?.data?.message || "Failed to create ride");
//     }
//   }

//   return (
//     <div className="h-screen relative overflow-hidden bg-gray-900 text-white">
//       {/* Logo */}
//       <div
//         className="absolute top-5 left-5 z-20 flex items-center gap-2 cursor-pointer"
//         onClick={() => navigate("/")}
//       >
//         <img className="w-12" src="/src/assets/cars.png" alt="Sawari" />
//         <h1 className="text-xl font-bold text-sky-400">Sawari</h1>
//       </div>

//       {/* Map */}
//       <div className="h-screen w-screen">
//         <LiveTracking />
//       </div>

//       {/* 🔽 FIND MY TRIP PANEL */}
//       <div
//         ref={tripPanelRef}
//         className="absolute bottom-0 left-0 w-full bg-gray-800/95 rounded-t-3xl shadow-lg overflow-hidden transition-all"
//       >
//         {/* Header */}
//         <div
//           className="flex justify-between items-center px-6 py-3 border-b border-gray-700 cursor-pointer"
//           onClick={() => setTripPanelOpen(!tripPanelOpen)}
//         >
//           <h4 className="text-lg font-bold text-sky-400">Find My Trip</h4>
//           <i
//             className={`ri-arrow-${tripPanelOpen ? "down" : "up"}-s-line text-2xl`}
//           ></i>
//         </div>

//         {/* Inputs + Search History */}
//         {tripPanelOpen && (
//           <div className="px-6 py-4 space-y-3">
//             <input
//               onClick={() => setActiveField("pickup")}
//               value={pickup}
//               onChange={handlePickupChange}
//               placeholder="Add a pick-up location"
//               className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg"
//             />
//             <input
//               onClick={() => setActiveField("destination")}
//               value={destination}
//               onChange={handleDestinationChange}
//               placeholder="Enter your destination"
//               className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg"
//             />
//             <button
//               onClick={findTrip}
//               disabled={loadingFare}
//               className="w-full bg-sky-500 hover:bg-sky-600 py-3 rounded-lg font-semibold disabled:opacity-70"
//             >
//               {loadingFare ? "Calculating..." : "Find Trip"}
//             </button>

//             {/* Scrollable Search History */}
//             {searchHistory.length > 0 && (
//               <div className="mt-3 max-h-32 overflow-y-auto space-y-2">
//                 {searchHistory.map((entry, index) => (
//                   <div
//                     key={index}
//                     className="bg-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-600"
//                     onClick={() => {
//                       setPickup(entry.pickup);
//                       setDestination(entry.destination);
//                     }}
//                   >
//                     <p className="text-sm">
//                       <strong>From:</strong> {entry.pickup}
//                     </p>
//                     <p className="text-sm">
//                       <strong>To:</strong> {entry.destination}
//                     </p>
//                     <p className="text-xs text-gray-400">{entry.time}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Panels Overlay */}
//       <div
//         ref={vehiclePanelRef}
//         className="fixed w-full z-20 bottom-0 translate-y-full bg-gray-800/95 px-3 py-10 pt-12 rounded-t-3xl"
//       >
//         <VehiclePanel
//           selectVehicle={setVehicleType}
//           fare={fare}
//           setConfirmRidePanel={setConfirmRidePanel}
//           setVehiclePanel={setVehiclePanel}
//         />
//       </div>

//       <div
//         ref={confirmRidePanelRef}
//         className="fixed w-full z-20 bottom-0 translate-y-full bg-gray-800/95 px-3 py-6 pt-12 rounded-t-3xl"
//       >
//         <ConfirmRide
//           createRide={createRide}
//           pickup={pickup}
//           destination={destination}
//           fare={fare}
//           vehicleType={vehicleType}
//           setConfirmRidePanel={setConfirmRidePanel}
//           setVehicleFound={setVehicleFound}
//         />
//       </div>

//       <div
//         ref={vehicleFoundRef}
//         className="fixed w-full z-20 bottom-0 translate-y-full bg-gray-800/95 px-3 py-6 pt-12 rounded-t-3xl"
//       >
//         <LookingForDriver
//           pickup={pickup}
//           destination={destination}
//           fare={fare}
//           vehicleType={vehicleType}
//           setVehicleFound={setVehicleFound}
//         />
//       </div>

//       <div
//         ref={waitingForDriverRef}
//         className="fixed w-full z-20 bottom-0 translate-y-full bg-gray-800/95 px-3 py-6 pt-12 rounded-t-3xl"
//       >
//         <WaitingForDriver
//           ride={ride}
//           setVehicleFound={setVehicleFound}
//           setWaitingForDriver={setWaitingForDriver}
//           waitingForDriver={waitingForDriver}
//         />
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
  // Location inputs and suggestion state
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);

  // UI panels visibility and refs for animation
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);

  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);

  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);

  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null);

  // Ride details related state
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  // Setup socket listeners and join user room on mount
  useEffect(() => {
    if (!socket || !user) return;

    socket.emit('join', { userType: 'user', userId: user._id });

    socket.on('ride-confirmed', (ride) => {
      setVehicleFound(false);
      setWaitingForDriver(true);
      setRide(ride);
    });

    socket.on('ride-started', (ride) => {
      setWaitingForDriver(false);
      navigate('/riding', { state: { ride } });
    });

    return () => {
      socket.off('ride-confirmed');
      socket.off('ride-started');
    };
  }, [socket, user, navigate]);

  // Input handlers with minimum length validation before API call
  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);

    if (value.length >= 3) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPickupSuggestions(response.data);
      } catch {
        setPickupSuggestions([]);
      }
    } else {
      setPickupSuggestions([]);
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);

    if (value.length >= 3) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDestinationSuggestions(response.data);
      } catch {
        setDestinationSuggestions([]);
      }
    } else {
      setDestinationSuggestions([]);
    }
  };

  // Dummy form submit handler (prevent default)
  const submitHandler = (e) => {
    e.preventDefault();
  };

  // GSAP animations for sliding panels based on visibility state
  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? '70%' : '0%',
      padding: panelOpen ? 24 : 0,
    });
    gsap.to(panelCloseRef.current, {
      opacity: panelOpen ? 1 : 0,
    });
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3,
    });
  }, [vehiclePanel]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3,
    });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3,
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3,
    });
  }, [waitingForDriver]);

  // Fetch fare estimate based on pickup and destination
  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setFare(response.data);
    } catch (error) {
      console.error('Error fetching fare:', error);
      setFare({});
    }
  }

  // Create ride API call with pickup, destination and vehicle type
  async function createRide() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup, destination, vehicleType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    } catch (error) {
      console.error('Error creating ride:', error);
    }
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="logo"
      />
      <div className="h-screen w-screen">
        <LiveTracking />
      </div>

      {/* Bottom panels */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 right-6 top-6 text-2xl cursor-pointer"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>

          <form className="relative py-3" onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField('pickup');
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField('destination');
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>

          <button onClick={findTrip} className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full">
            Find Trip
          </button>
        </div>

        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {/* Sliding Panels */}
      <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12">
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;


