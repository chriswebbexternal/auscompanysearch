import React, { useCallback } from "react";
import "./App.css";
import { useSearchAppReducer, initialState } from "./logic/searchReducer";
import { SearchField } from "./components/SearchField";
import { SearchResults } from "./components/SearchResults";
import { CompanyDetail } from "./components/CompanyDetail";
import { useAbnSearchEffect, useCompanySearchEffect } from "./logic/effects";
import { ActionTypes } from "./logic/types";

function App() {
  // all logic for this app runs through a custom useReducer
  const [state, dispatch] = useSearchAppReducer(initialState());

  // dispatch Company search ...
  const handleCompanySearchChanged = useCallback(
    (query: string) => {
      if (query && query !== state.companySearchText) {
        dispatch({ type: ActionTypes.CompanySearchBegin, payload: query });
      }
    },
    [dispatch, state.companySearchText]
  );

  // dispatch ABN lookup search ...
  const handleAbnSearchChanged = useCallback(
    (query: string) => {
      if (query && query !== state.abnSearchText) {
        dispatch({ type: ActionTypes.AbnLookupBegin, payload: query });
      }
    },
    [dispatch, state.abnSearchText]
  );

  // custom effects trigger off changes to state to issue side effects,
  // in turn dispatching completion/error actions ...
  useCompanySearchEffect(
    state.companySearchText,
    dispatch,
    state.isFetchingCompanies
  );
  useAbnSearchEffect(state.abnSearchText, dispatch, state.isFetchingAbn);

  return (
    <div className="App">
      <h1>Company Search</h1>
      <div className="SearchContainer">
        <div className="Search">
          <SearchField
            placeholder="Company search"
            value={state.companySearchText}
            onChange={handleCompanySearchChanged}
          />
          <div className="HelpText">e.g. AMP</div>
          {state.isFetchingCompanies && <div>Loading ...</div>}
          {state.companySearchResults && (
            <SearchResults
              onResultClick={result =>
                result.Abn !== state.abnSearchText &&
                dispatch({
                  type: ActionTypes.AbnLookupBegin,
                  payload: result.Abn
                })
              }
              results={state.companySearchResults}
            />
          )}
          {state.errorCompany && <div>{state.errorCompany}</div>}
        </div>
        <div className="Detail">
          <SearchField
            placeholder="ABN search"
            value={state.abnSearchText}
            onChange={handleAbnSearchChanged}
          />
          <div className="HelpText">e.g. 74172177893</div>
          {state.isFetchingAbn && <div>Loading ...</div>}
          {state.errorAbn && <div>Error retrieving details!</div>}
          {state.companyDetail && (
            <CompanyDetail companyDetail={state.companyDetail} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
