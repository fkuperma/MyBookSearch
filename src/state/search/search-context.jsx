import React, { createContext, useReducer } from "react";

export const SearchContext = createContext();

const initialState = {
  searchTerm: "",
  searchResults: [],
  clickedSearch: false,
  searchType: "intitle",
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload };
    case "SET_CLICKED_SEARCH":
      return { ...state, clickedSearch: action.payload };
    case "SET_SEARCH_TYPE":
      return { ...state, searchType: action.payload };
    default:
      return state;
  }
};

export const SearchProvider = (props) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  return (
    <SearchContext.Provider value={[state, dispatch]}>
      {props.children}
    </SearchContext.Provider>
  );
};
