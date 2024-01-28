import { useState } from "react";
import AirportAutosuggest from "./AirportAutosuggest";

const SearchBox = ({ onSearch }) => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isOneWay, setIsOneWay] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const searchHandler = () => {
    if (!isOneWay && !returnDate) {
      setErrorMessage(
        "Please select your return date or use checkbox to search for one way tickets."
      );
      return;
    } else if (
      dateFormatter(departureDate).getTime() < new Date().getTime() ||
      dateFormatter(returnDate).getTime() < new Date().getTime() ||
      dateFormatter(returnDate).getTime() <
        dateFormatter(departureDate).getTime() ||
      !departureDate
    ) {
      setErrorMessage("Please select a valid date.");
      return;
    } else if (!departureAirport || !arrivalAirport) {
      setErrorMessage("Please check your airport selection");
      return;
    } else {
      onSearch({
        departureAirport,
        arrivalAirport,
        departureDate,
        returnDate,
        isOneWay,
      });
      setErrorMessage();
    }
  };

  const handleSelectDepartureAirport = (airport) => {
    setDepartureAirport(airport);
  };

  const handleSelectArrivalAirport = (airport) => {
    setArrivalAirport(airport);
  };

  const dateFormatter = (date) => {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  return (
    <div className="w-1/2 mx-auto p-4 bg-gray-200 rounded-md">
      <label className="block mb-2 text-lg font-semibold">Search Flights</label>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Departure Airport</label>
          <AirportAutosuggest onSelectAirport={handleSelectDepartureAirport} />
        </div>

        <div>
          <label className="block mb-1">Arrival Airport</label>
          <AirportAutosuggest onSelectAirport={handleSelectArrivalAirport} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block mb-1">Departure Date</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {!isOneWay && (
          <div>
            <label className="block mb-1">Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full p-2 border rounded-md"
              disabled={isOneWay}
            />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center">
        <label class="relative inline-flex items-center mb-5 cursor-pointer">
          <input
            type="checkbox"
            id="oneWayCheckbox"
            checked={isOneWay}
            onChange={() => setIsOneWay(!isOneWay)}
            class="sr-only peer"
          />

          <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3">One Way</span>
        </label>
      </div>

      {errorMessage && <p>{errorMessage}</p>}
      <button
        onClick={searchHandler}
        className="mt-4 p-2 bg-blue-500 text-white rounded-md cursor-pointer"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
