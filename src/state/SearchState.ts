import React from "react";
import { createContainer } from "unstated-next";

/* 
This is a global state container for the nav bar component.
*/

interface SearchBarState {
  searchText?: string;
}

const useSearchState = () => {
  const [searchState, setSearchState] = React.useState<SearchBarState>({
    searchText: "",
  });

  return { searchState, setSearchState };
};

export const SearchContainer = createContainer(useSearchState);
