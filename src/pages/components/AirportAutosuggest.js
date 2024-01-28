import airportData from "../data/airportData.json";
import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

const AirportAutosuggest = ({ onSelectAirport }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (inputValue) => {
    const lowercaseInput = inputValue.toLowerCase();
    const filteredAirports = Object.values(airportData).filter((airport) => {
      const matchConditions =
        airport.city.toLowerCase().includes(lowercaseInput) ||
        airport.iata.toLowerCase().includes(lowercaseInput);

      return matchConditions;
    });

    return filteredAirports.slice(0, 10).map((airport) => ({
      code: airport.iata,
      name: airport.name,
    }));
  };
  const getSuggestionValue = (suggestion) =>
    `${suggestion.code} - ${suggestion.name}`;

  const renderSuggestion = (suggestion) => (
    <div>{suggestion.code + " - " + suggestion.name}</div>
  );

  const onChange = (_, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const suggestions = getSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    onSelectAirport(suggestion);
  };

  const inputProps = {
    placeholder: "Enter a city or airport code",
    value,
    onChange,
  };

  const theme = {
    input: {
      width: "100%",
      height: 40,
      borderRadius: 5,
      padding: 10,
    },
  };

  return (
    <Autosuggest
      theme={theme}
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={onSuggestionSelected}
    />
  );
};

export default AirportAutosuggest;
