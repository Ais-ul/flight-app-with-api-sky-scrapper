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

  // Funcție pentru a extrage valoarea numerică din prețul formatat
  const extractNumericPrice = (formattedPrice) => {
    if (!formattedPrice) return 0;
    let numericString = formattedPrice.replace(/[^0-9.,]/g, ""); // Elimină orice caracter non-numeric
  
    // Elimină separatorii de mii
    numericString = numericString.replace(/,/g, "");
  
    return parseFloat(numericString);
  };

  // Funcție pentru a sorta zborurile în funcție de preț sau durată
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
    return 0; // Nu se sortează dacă sortBy este null
  });

  // Funcție pentru a schimba direcția de sortare
  const toggleSortOrder = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Schimbă direcția
    } else {
      setSortBy(criteria); // Setează criteriul de sortare
      setSortOrder("asc"); // Resetează direcția la crescător
    }
  };

  return (
    <div className="mt-4">
      <div className="flex gap-2 mb-4 m-4 md:md-0">
        {/* Buton pentru sortare după preț */}
        <button
          onClick={() => toggleSortOrder("price")}
          className={`px-4 py-2 rounded flex items-center gap-1 ${
            sortBy === "price" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Sort by Price
          {sortBy === "price" && (
            <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
          )}
        </button>

        {/* Buton pentru sortare după durată */}
        <button
          onClick={() => toggleSortOrder("duration")}
          className={`px-4 py-2 rounded flex items-center gap-1 ${
            sortBy === "duration" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Sort by Duration
          {sortBy === "duration" && (
            <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
          )}
        </button>

        {/* Buton pentru a șterge filtrele */}
        <button
          onClick={() => setSortBy(null)}
          className={`px-4 py-2 rounded ${
            sortBy === null ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Clear
        </button>
      </div>

      {sortedFlights.map((itinerary, index) => {
        // Verifică dacă există date valide în itinerary
        if (!itinerary.legs || !itinerary.legs[0] || !itinerary.price) {
          return null; // Ignoră zborurile cu date incomplete
        }

        const firstLeg = itinerary.legs[0];
        console.log(firstLeg); // Verifică structura unui leg

        // Extrage numele companiei aeriene în funcție de operationType
        let airlineNames = "Unknown Airline";
        if (firstLeg.carriers?.operationType === "fully_operated") {
          // Folosește marketing dacă operationType este fully_operated
          airlineNames = firstLeg.carriers?.marketing
            ?.map((carrier) => carrier.name)
            ?.join(", ");
        } else if (firstLeg.carriers?.operationType === "not_operated") {
          // Folosește operating dacă operationType este not_operated
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
          <div key={index} className=" m-4 md:p-4 border-b flex gap-2 ">
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