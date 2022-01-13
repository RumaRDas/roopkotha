import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
     //search category Item input
  const handleSearchChange = (e) => {
    e.preventDefault(e);
    setKeyword(e.target.value.toLowerCase()); // for changing search category value to lowercase
    //
  };
  return (
    <div>
      {/* Adding search field*/}
      <input
        type="search"
        placeholder="Search By Category"
        value={keyword}
        onChange={handleSearchChange}
        className="form-control mb-4"
      />
    </div>
  );
};
export default LocalSearch;
