import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ updateQuery }) => (
  <div className="search bar container" >
    <input className="search bar" onKeyUp={updateQuery} />
  </div>
);

Search.propTypes = {
  updateQuery: PropTypes.func.isRequired,
};

export default Search;
