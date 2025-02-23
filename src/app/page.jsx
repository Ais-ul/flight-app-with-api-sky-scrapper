'use client';
import { useState } from "react";
import SearchForm from "./components/SearchForm";
import FlightResults from "./components/FlightResults";
import { fetchFlights } from "./api";
import { searchAirport } from './api'; 

function Page() {
  const [flights, setFlights] = useState([]);

  const handleSearch = async (origin, destination, date) => {
    const originData = await searchAirport(origin);
    const originEntityId = originData?.data[0]?.entityId;

    const destinationData = await searchAirport(destination);
    const destinationEntityId = destinationData?.data[0]?.entityId;

    if (originEntityId && destinationEntityId) {
      const data = await fetchFlights(origin, destination, date, originEntityId, destinationEntityId);
      setFlights(data?.data?.itineraries || []);
    } else {
      console.error("Could not find entityId for origin or destination");
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[url('/travel.png')] bg-cover bg-left md:bg-none">
   
      <video 
        className="hidden md:block absolute top-0 left-0 w-full h-full object-cover"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/travel.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

    
      <div className="relative z-10 text-white text-center ">
        <h1 className="text-2xl font-bold mb-4">Your Flight</h1>
        <SearchForm onSearch={handleSearch} />
        <div className="md:max-h-[80vh] max-h-[30vh] overflow-y-auto overflow-x-hidden w-full bg-white bg-opacity-20 md:px-4 px-2 rounded-lg">

          <FlightResults flights={flights} />
        </div>
      </div>
    </div>
  );
}

export default Page;
