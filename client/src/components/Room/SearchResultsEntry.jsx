import React from 'react';
import PropTypes from 'prop-types';

const SearchResultsEntry = ({ searchResult }) => (
  <div>
    <img alt="" src={searchResult.snippet.thumbnails.default.url} />
    <div>{searchResult.snippet.title}</div>
    <div>{searchResult.snippet.description}</div>
    <button id="plus">+</button>
  </div>
);

SearchResultsEntry.propTypes = {
  searchResult: PropTypes.object.isRequired,
};

export default SearchResultsEntry;
