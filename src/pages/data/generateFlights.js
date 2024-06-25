function generateMockFlights(searchParams) {
  const getRandomHour = () => Math.floor(Math.random() * 24);
  const getRandomMinute = () => Math.floor(Math.random() * 60);

  const parseDate = (date) => {
    if (date) {
      const [year, month, day] = date.split("-");
      return new Date(year, month - 1, day);
    }
  };

  const setHours = (date, hours) => {
    const newDate = new Date(date);
    newDate.setHours(hours);
    return newDate;
  };

  const setMinutes = (date, minutes) => {
    const newDate = new Date(date);
    newDate.setMinutes(minutes);
    return newDate;
  };

  const generateUserInputFlight = (
    departureAirport,
    arrivalAirport,
    departureDate
  ) => {
    const departureTime = setMinutes(
      setHours(departureDate, getRandomHour()),
      getRandomMinute()
    );

    const duration = Math.floor(Math.random() * 6) + 1;

    const arrivalTime = setHours(
      new Date(departureTime),
      departureTime.getHours() + duration
    );
    arrivalTime.setMinutes(departureTime.getMinutes() + duration * 60);

    return {
      departureAirport,
      arrivalAirport,
      departureTime: departureTime.toISOString(),
      arrivalTime: arrivalTime.toISOString(),
      duration,
      price: Math.floor(Math.random() * 200) + 400,
    };
  };

  const generateFlights = (departureAirport, arrivalAirport, date) => {
    const flights = [];

    for (let i = 0; i < 5; i++) {
      const flight = generateUserInputFlight(
        departureAirport,
        arrivalAirport,
        parseDate(date)
      );
      flights.push(flight);
    }

    return flights;
  };

  // Extract search parameters
  const {
    departureAirport,
    arrivalAirport,
    departureDate,
    isOneWay,
    returnDate,
  } = searchParams;

  // Initialize an empty response object
  const responseBodyData = { flights: [] };

  // Generate mock flights based on user input
  if (isOneWay) {
    responseBodyData.flights = generateFlights(
      departureAirport,
      arrivalAirport,
      departureDate
    );
  } else {
    const departingFlights = generateFlights(
      departureAirport,
      arrivalAirport,
      departureDate
    );
    const returningFlights = generateFlights(
      arrivalAirport,
      departureAirport,
      returnDate
    );
    responseBodyData.flights = [...departingFlights, ...returningFlights];
  }

  // Return the generated flights
  return responseBodyData;
}

export default generateMockFlights;
