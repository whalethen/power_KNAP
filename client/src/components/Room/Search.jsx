import React from 'react';
import PropTypes from 'prop-types';


const Search = ({ updateQuery, search }) => (
  <div>
    <input onChange={updateQuery} />
    <button onClick={search}>Search</button>
  </div>
);

Search.propTypes = {
  updateQuery: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

export default Search;
