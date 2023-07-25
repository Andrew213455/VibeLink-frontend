import { useSearchParams } from "react-router-dom";
import "./Search.css";
import { queryHelpers } from "@testing-library/react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");
  console.log(query);

  return <div className="Search">Search works</div>;
};

export default Search;
