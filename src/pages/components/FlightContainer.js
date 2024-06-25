import React from "react";
import Flight from "./Flight";

const FlightContainer = ({ flights, returnFlights }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Available Flights</h2>

      {/* Outbound Flights */}
      <div className="flex flex-wrap mb-4 mx-auto">
        {flights &&
          flights.map((flight, index) => (
            <Flight key={index} flight={flight} />
          ))}
      </div>

      {/* Return Flights */}
      {returnFlights && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Return Flights</h2>
          <div className="flex flex-wrap mx-auto">
            {returnFlights.map((flight, index) => (
              <Flight key={index} flight={flight} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightContainer;
