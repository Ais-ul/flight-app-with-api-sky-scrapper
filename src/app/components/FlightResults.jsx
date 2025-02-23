import { useEffect, useState } from "react";

export default function FlightResults({ flights }) {
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(null); // null, 'price', sau 'duration'
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' sau 'desc'

  useEffect(() => {
    if (flights && flights.length > 0) {
      setLoading(false);
    }
  }, [flights]); // Se reactivează când se schimbă flights

  if (loading) {
    return <p className="text-blue-500">Here will show your flights</p>;
  }

  if (!flights || flights.length === 0) {
    return <p className="text-gray-500">No flights found.</p>;
  }

 
  const extractNumericPrice = (formattedPrice) => {
    if (!formattedPrice) return 0;
    let numericString = formattedPrice.replace(/[^0-9.,]/g, ""); 
  
   
    numericString = numericString.replace(/,/g, "");
  
    return parseFloat(numericString);
  };

  
  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === "price") {
      const priceA = extractNumericPrice(a.price.formatted);
      const priceB = extractNumericPrice(b.price.formatted);
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    } else if (sortBy === "duration") {
      const durationA = a.legs[0].durationInMinutes;
      const durationB = b.legs[0].durationInMinutes;
      return sortOrder === "asc" ? durationA - durationB : durationB - durationA;
    }
    return 0; 
  });


  const toggleSortOrder = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc"); 
    } else {
      setSortBy(criteria); // Setează criteriul de sortare
      setSortOrder("asc"); // Resetează direcția la crescător
    }
  };

  return (
    <div className="mt-4 ">
      <div className="flex gap-2 mb-4 m-4  md:md-0">
      
        <button
          onClick={() => toggleSortOrder("price")}
          className={`px-2 py-2 rounded flex items-center gap-1 ${
            sortBy === "price" ? "bg-blue-500 text-white" : "bg-gray-800"
          }`}
        >
          Sort by Price
          {sortBy === "price" && (
            <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
          )}
        </button>

  
        <button
          onClick={() => toggleSortOrder("duration")}
          className={`px-2 py-2 rounded flex items-center gap-1 ${
            sortBy === "duration" ? "bg-blue-500 text-white" : "bg-gray-800"
          }`}
        >
          Sort by Duration
          {sortBy === "duration" && (
            <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
          )}
        </button>

      
        <button
          onClick={() => setSortBy(null)}
          className={`px-2 py-2 rounded ${
            sortBy === null ? "bg-blue-500 text-white" : "bg-gray-800"
          }`}
        >
          Clear
        </button>
      </div>

      {sortedFlights.map((itinerary, index) => {
       
        if (!itinerary.legs || !itinerary.legs[0] || !itinerary.price) {
          return null; 
        }

        const firstLeg = itinerary.legs[0];
        console.log(firstLeg); 

        let airlineNames = "Unknown Airline";
        if (firstLeg.carriers?.operationType === "fully_operated") {
          
          airlineNames = firstLeg.carriers?.marketing
            ?.map((carrier) => carrier.name)
            ?.join(", ");
        } else if (firstLeg.carriers?.operationType === "not_operated") {
          
          airlineNames = firstLeg.carriers?.operating
            ?.map((carrier) => carrier.name)
            ?.join(", ");
        }

        const departureTime = firstLeg.departure
          ? firstLeg.departure.replace("T", " - ")
          : "Unknown Departure";
        const arrivalTime = firstLeg.arrival
          ? firstLeg.arrival.replace("T", " - ")
          : "Unknown Arrival";
        const priceAmount = itinerary.price.formatted || "Unknown Price";
        const durationInMinutes = firstLeg.durationInMinutes;
        let duration = "Unknown duration";

        if (durationInMinutes) {
          const hours = Math.floor(durationInMinutes / 60);
          const minutes = durationInMinutes % 60;
          duration = `${hours} hours ${minutes} mins`;
        }

        return (
          <div key={index} className=" m-4  md:p-4 border-b flex gap-2 flex flex-col md:flex-row ">
            <p>
              <strong>Airline:</strong> {airlineNames}
            </p>
            <p>
              <strong>Price:</strong> {priceAmount}
            </p>
            <p>
              <strong>Departure:</strong> {departureTime}
            </p>
            <p>
              <strong>Arrival:</strong> {arrivalTime}
            </p>
            <p>
              <strong>Duration:</strong> {duration}
            </p>
          </div>
        );
      })}
    </div>
  );
}