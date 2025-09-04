// // import { createContext, useState, useContext } from 'react';

// // export const CaptainDataContext = createContext();

// // const CaptainContext = ({ children }) => {
// //     const [ captain, setCaptain ] = useState(null);
// //     const [ isLoading, setIsLoading ] = useState(false);
// //     const [ error, setError ] = useState(null);

// //     const updateCaptain = (captainData) => {
// //         setCaptain(captainData);
// //     };

// //     const value = {
// //         captain,
// //         setCaptain,
// //         isLoading,
// //         setIsLoading,
// //         error,
// //         setError,
// //         updateCaptain
// //     };

// //     return (
// //         <CaptainDataContext.Provider value={value}>
// //             {children}
// //         </CaptainDataContext.Provider>
// //     );
// // };

// // export default CaptainContext;

// import React, { createContext, useState } from 'react';

// export const CaptainDataContext = createContext();

// const CaptainContext = ({ children }) => {
//   const [captain, setCaptain] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const updateCaptain = (captainData) => {
//     setCaptain(captainData);
//   };

//   return (
//     <CaptainDataContext.Provider
//       value={{
//         captain,
//         setCaptain,
//         updateCaptain,
//         isLoading,
//         setIsLoading,
//         error,
//         setError,
//       }}
//     >
//       {children}
//     </CaptainDataContext.Provider>
//   );
// };

// export default CaptainContext;


import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  // ... other states ...

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;

