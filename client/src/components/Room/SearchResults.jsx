import React from 'react';
import PropTypes from 'prop-types';
import SearchResultsEntry from './SearchResultsEntry';

const SearchResults = ({ searchResults }) => (
  <div>
    {searchResults.map(searchResult =>
      <SearchResultsEntry searchResult={searchResult} />)};
  </div>
);

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchResults;
