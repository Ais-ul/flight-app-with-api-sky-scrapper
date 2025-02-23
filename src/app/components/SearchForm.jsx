import { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(origin, destination, date);
  };

  return (
    <form onSubmit={handleSubmit} className="m-12 md:m-0 p-4 md:flex gap-2 bg-white shadow-md rounded-lg">
      <div className="mb-2">
        <label className="block text-gray-700">From:</label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-2">
        <label className="block text-gray-700">To:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-2">
        <label className="block text-gray-700">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

<div className="relative md:top-6">
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md ">
        Search Flights
      </button></div>
    </form>
  );
}