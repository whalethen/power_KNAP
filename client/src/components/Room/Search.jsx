import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ updateQuery }) => (
  <div className="container searchbar" >
    <input placeholder="Search for a video" onKeyUp={updateQuery} />
  </div>
);

Search.propTypes = {
  updateQuery: PropTypes.func.isRequired,
};

export default Search;
