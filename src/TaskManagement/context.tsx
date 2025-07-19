import React from "react";

interface IFilterContext {
  filters: { status: string; priority: string };
  setFilters: (filters: { status: string; priority: string }) => void;
}

export const FilterContext = React.createContext<IFilterContext>({
  filters: { status: "", priority: "" },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setFilters: (_filters: { status: string; priority: string }) => {},
});
