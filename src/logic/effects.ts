import { useEffect } from "react";
import fetchJsonp from "fetch-jsonp";
import { AbnLookupResult, ActionTypes, Action } from "./types";

const SEARCH_GUID = "b6242120-5bce-4b10-9839-d3045a7682da";

const encodeUri = (str: string) => window.encodeURIComponent(str);

/**
 * custom useEffect hook to run ABN search when query changes.
 *
 * @param query query to run
 * @param dispatch parent app's dispatch func
 */
export const useAbnSearchEffect = (
  query: string | null,
  dispatch: React.Dispatch<Action<ActionTypes>>,
  fetching: boolean
) =>
  useEffect(() => {
    if (!query || !fetching) {
      // never run empty query
      return;
    }

    // IIFE the fetch to get async/await ...
    (async () => {
      try {
        const result = await fetchJsonp(
          `https://abr.business.gov.au/json/AbnDetails.aspx?abn=${encodeUri(
            query
          )}&guid=${SEARCH_GUID}`
        );

        if (result.ok) {
          const data = await result.json();
          dispatch({
            type: ActionTypes.AbnLookupSuccess,
            payload: (data as unknown) as AbnLookupResult
          });
        } else {
          dispatch({ type: ActionTypes.AbnLookupFailed, payload: "Error!" });
        }
      } catch (e) {
        console.error(e);
        dispatch({ type: ActionTypes.AbnLookupFailed, payload: "Error!" });
      }
    })();
  }, [query, dispatch, fetching]);

/**
 * custom useEffect hook to run search when query changes.
 *
 * @param query query to run
 * @param dispatch parent app's dispatch func
 */
export const useCompanySearchEffect = (
  query: string | null,
  dispatch: React.Dispatch<Action<ActionTypes>>,
  fetching: boolean
) =>
  useEffect(() => {
    if (!query || !fetching) {
      // never run empty query
      return;
    }

    // IIFE the fetch to get async/await ...
    (async () => {
      try {
        const result = await fetchJsonp(
          `https://abr.business.gov.au/json/MatchingNames.aspx?name=${encodeUri(
            query
          )}&guid=${SEARCH_GUID}`,
          {
            jsonpCallback: "callback"
          }
        );

        if (result.ok) {
          const data = await result.json();

          if (data.Message) {
            dispatch({
              type: ActionTypes.CompanySearchFailed,
              payload: data.Message
            });
          } else {
            dispatch({
              type: ActionTypes.CompanySearchSuccess,
              payload: data.Names
            });
          }
        } else {
          dispatch({
            type: ActionTypes.CompanySearchFailed,
            payload: "Error!"
          });
        }
      } catch (e) {
        console.error(e);
        dispatch({
          type: ActionTypes.CompanySearchFailed,
          payload: "Error!"
        });
      }
    })();
  }, [query, dispatch, fetching]);
