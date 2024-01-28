import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import generateMockFlights from "./data/generateFlights";
import FlightContainer from "./components/FlightContainer";

export default function Home() {
  const [searchInfo, setSearchInfo] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [flights, setFlights] = useState();
  const [returnFlights, setReturnFlights] = useState();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (searchInfo) {
        setReturnFlights();
        generateResponses();
      }
      setIsLoading(false);
    }, 2000);
  }, [searchInfo]);

  const handleSearch = (searchParams) => {
    setSearchInfo(searchParams);
  };

  const generateResponses = () => {
    const flights = generateMockFlights(searchInfo);
    if (flights.flights.length > 5) {
      setFlights(flights.flights.slice(0, 5));
      setReturnFlights(flights.flights.slice(5));
    } else {
      setFlights(flights.flights);
    }
  };

  return (
    <div className="w-screen h-screen mx-auto">
      <Header />
      <SearchBox onSearch={handleSearch} />
      {flights && (
        <FlightContainer flights={flights} returnFlights={returnFlights} />
      )}
    </div>
  );
}
