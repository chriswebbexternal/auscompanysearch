import React from "react";
import { CompanySearchResult } from "../logic/types";

type SearchResultsProps = {
  results: CompanySearchResult[];
  onResultClick: (result: CompanySearchResult) => void;
};

/**
 * Simple component to render results
 *
 * @param results array of result items to display
 * @param onResultClick event for search result item clicked
 */
export const SearchResults = ({
  results,
  onResultClick
}: SearchResultsProps) => {
  return (
    <div>
      {results ? (
        results.map(result => (
          <div
            key={result.Abn}
            className="SearchResult"
            onClick={() => onResultClick(result)}
          >
            <div>
              <strong>{result.Name}</strong>
            </div>
            {result.Abn}
          </div>
        ))
      ) : (
        <div>No results</div>
      )}
    </div>
  );
};
