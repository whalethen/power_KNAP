import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ updateQuery, searchOnEnter }) => (
  <div className="search bar container" >
    <input className="search bar" onChange={updateQuery} onKeyPress={searchOnEnter} />
  </div>
);

Search.propTypes = {
  updateQuery: PropTypes.func.isRequired,
  searchOnEnter: PropTypes.func.isRequired,
};

export default Search;
