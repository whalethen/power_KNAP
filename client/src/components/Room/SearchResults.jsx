import React from 'react';
import PropTypes from 'prop-types';
import SearchResultsEntry from './SearchResultsEntry';

const SearchResults = ({ searchResults, saveToPlaylist }) => (
  <div>
    {searchResults.map(searchResult =>
      <SearchResultsEntry searchResult={searchResult} key={searchResult.etag} saveToPlaylist={saveToPlaylist} />)}
  </div>
);

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveToPlaylist: PropTypes.func.isRequired,
};

export default SearchResults;
