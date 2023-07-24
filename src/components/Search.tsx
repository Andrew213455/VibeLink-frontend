import { useSearchParams } from "react-router-dom";
import "./Search.css";
import { queryHelpers } from "@testing-library/react";

interface Props {
  query: string | null;
}

const Search = ({ query }: Props) => {
  return <div className="Search">Search works</div>;
};

export default Search;
