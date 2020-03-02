import { useReducer } from "react";
import {
  ReducerMap,
  SearchAppState,
  ActionTypes,
  AbnLookupResult,
  Action,
  CompanySearchResult
} from "./types";

export const initialState = (): SearchAppState => ({
  errorAbn: null,
  errorCompany: null,
  isFetchingAbn: false,
  isFetchingCompanies: false,
  companySearchResults: null,
  companyDetail: null,
  abnSearchText: "",
  companySearchText: "",
  selectedCompanyAbn: null
});

/** The reducer map - this is equivalent to the classic
 * "switch" statement version in redux but safer
 */
export const reducerMap: ReducerMap = {
  [ActionTypes.AbnLookupBegin]: (state: SearchAppState, action) => {
    return {
      ...state,
      errorAbn: null,
      companyDetail: null,
      isFetchingAbn: true,
      abnSearchText: action.payload as string
    };
  },
  [ActionTypes.AbnLookupSuccess]: (state: SearchAppState, action) => {
    return {
      ...state,
      errorAbn: null,
      companyDetail: action.payload as AbnLookupResult, // assume this shape for the time being
      isFetchingAbn: false
    };
  },
  [ActionTypes.AbnLookupFailed]: (state: SearchAppState, action) => {
    return {
      ...state,
      errorAbn: action.payload as string,
      companyDetail: null,
      isFetchingAbn: false
    };
  },

  [ActionTypes.CompanySearchBegin]: (state: SearchAppState, action) => {
    return {
      ...state,
      errorCompany: null,
      isFetchingCompanies: true,
      companySearchText: action.payload as string,
      companySearchResults: null
    };
  },
  [ActionTypes.CompanySearchSuccess]: (state: SearchAppState, action) => {
    return {
      ...state,
      errorCompany: null,
      isFetchingCompanies: false,
      companySearchResults: action.payload as CompanySearchResult[]
    };
  },
  [ActionTypes.CompanySearchFailed]: (state: SearchAppState, action) => {
    return {
      ...state,
      errorCompany: action.payload as string,
      companySearchResults: null,
      isFetchingCompanies: false
    };
  }
};

/*
raw reducer function exported separately from the useReducer 
- this just means we can test it without renderHooks ceremony
*/
export const searchAppReducer = (
  state: SearchAppState,
  action: Action<ActionTypes>
) => {
  const reducer = reducerMap[action.type];

  if (reducer !== undefined) {
    // console.log(action.type, action.payload, state);
    return reducer(state, action);
  }

  throw Error(`${action.type} not defined in reducer`);
};

/**
 * Custom reducer for the application logic
 * @param initialState initial state for the application
 */
export const useSearchAppReducer = (
  initialState: SearchAppState
): [SearchAppState, React.Dispatch<Action<ActionTypes>>] =>
  useReducer(searchAppReducer, initialState);
