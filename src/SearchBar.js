import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function SearchBar(props) {
  const [term, setTerm] = useState("");
  const [apiterm, setAPITerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const debounced = useDebouncedCallback(
    // function
    (debouncedTerm) => {
      setAPITerm(debouncedTerm);
      props.onTermChange(debouncedTerm);
      if (!searchHistory.find((item) => item === debouncedTerm)) {
        setSearchHistory((prev) => [...prev, debouncedTerm]);
      }
    },
    // delay in ms
    1000
  );

  return (
    <div className="search">
      <input
        value={term}
        autoFocus={true}
        onChange={(e) => {
          const value = e.target.value;
          setTerm(value);
          debounced(value);
        }}
      />
      <ul className="search-results">
        {searchHistory.map((item) => (
          <li
            className="result-item"
            className={term === item ? "match" : ""}
            onClick={() => {
              setTerm(item);
              props.onTermChange(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
