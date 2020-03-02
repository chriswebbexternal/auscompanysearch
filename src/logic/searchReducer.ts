import { useReducer } from "react";

/** Action Types for our app's reducer */
export enum ActionTypes {
  SearchBegin = "SearchBegin",
  SearchSuccess = "SearchSuccess",
  SearchFailed = "SearchFailed",
  SearchResultSelected = "SearchResultSelected"
}

/** Simple type for a redux shaped action */
export type Action<T extends ActionTypes> = {
  type: T;
  payload: unknown;
};

/** Type to map abr.business.gov.au's results to */
export type CompanySearchResult = {
  Abn: string;
  AbnStatus: string;
  Acn: string;
  AddressDate: string;
  AddressPostcode: string;
  AddressState: string;
  BusinessName: string[];
  EntityName: string;
  EntityTypeCode: string;
  EntityTypeName: string;
  Gst: string;
  Message: string;
};

/** type state for our app */
export type SearchAppState = {
  searchText: string | null;
  isFetching: boolean;
  error: string | null;
  searchResults: CompanySearchResult[];
  selectedResultId: string;
};

/** type to declare the reducer as a lookup by ActionType */
export type ReducerMap = {
  [key in ActionTypes]: (
    state: SearchAppState,
    action: Action<ActionTypes>
  ) => SearchAppState;
};

/** The reducer map - this is equivalent to the classic
 * "switch" statement version in redux but safer
 */
export const reducerMap: ReducerMap = {
  [ActionTypes.SearchBegin]: (state: SearchAppState, action) => {
    return {
      ...state,
      error: null,
      searchResults: [],
      isFetching: true,
      searchText: action.payload as string
    };
  },
  [ActionTypes.SearchSuccess]: (state: SearchAppState, action) => {
    return {
      ...state,
      error: null,
      searchResults: action.payload as CompanySearchResult[], // assume this shape for the time being
      isFetching: false
    };
  },
  [ActionTypes.SearchFailed]: (state: SearchAppState, action) => {
    return {
      ...state,
      error: action.payload as string,
      searchResults: [],
      isFetching: false
    };
  },
  [ActionTypes.SearchResultSelected]: (state: SearchAppState, action) => {
    return {
      ...state,
      selectedResultId: action.payload as string
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
    return reducer(state, action);
  }

  throw Error(`${action.type} not defined in cartItemReducer`);
};

/**
 * Custom reducer for the application logic
 * @param initialState initial state for the application
 */
export const useSearchAppReducer = (
  initialState: SearchAppState
): [SearchAppState, React.Dispatch<Action<ActionTypes>>] =>
  useReducer(searchAppReducer, initialState);
