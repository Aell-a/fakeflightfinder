import React from "react";

const Flight = ({ flight }) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md w-72 mr-2">
      <h3 className="text-lg font-semibold mb-2">Fake Airlines</h3>
      <p className="mb-2">Departure: {flight.departureAirport.name}</p>
      <p className="mb-2">Arrival: {flight.arrivalAirport.name}</p>
      <p className="mb-2">
        Departure Time:{" "}
        {flight.departureTime.split("T")[0] +
          " " +
          flight.departureTime.substring(11, 16)}
      </p>
      <p className="mb-2">Duration: {flight.duration} hours</p>
      <p className="mb-2">Price: {flight.price}₺</p>
    </div>
  );
};

export default Flight;
