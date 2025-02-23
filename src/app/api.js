export async function searchAirport(query) {
  const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${query}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3ee3e5cffemsh8731aa79c786075p1e090bjsnc2ea85818494",
      "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error("Error fetching airports:", error);
    return null;
  }
}
export async function fetchFlights(originSkyId, destinationSkyId, date, originEntityId, destinationEntityId) {
  const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=${originEntityId}&destinationEntityId=${destinationEntityId}&date=${date}&cabinClass=economy&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3ee3e5cffemsh8731aa79c786075p1e090bjsnc2ea85818494",
      "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    return null;
  }
}