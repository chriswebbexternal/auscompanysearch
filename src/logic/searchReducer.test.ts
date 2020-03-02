import { ActionTypes } from "./types";
import { reducerMap, initialState } from "./searchReducer";

const runReducer = (actionType: ActionTypes, payload: unknown) => {
  return reducerMap[actionType](initialState(), {
    type: actionType,
    payload: payload
  });
};

describe("ABN lookup", () => {
  it("should reset loading flag and results on begin", () => {
    const newState = runReducer(ActionTypes.AbnLookupBegin, "1234567");
    expect(newState.isFetchingAbn).toBe(true);
    expect(newState.companyDetail).toBe(null);
  });

  it("should populate companyDetail and reset loading on completion", () => {
    const newState = runReducer(ActionTypes.AbnLookupSuccess, {});
    expect(newState.isFetchingAbn).toBe(false);
    expect(newState.companyDetail).not.toBe(null);
  });
});

describe("Company search", () => {
  it("should reset loading flag and results on begin", () => {
    const newState = runReducer(ActionTypes.CompanySearchBegin, "AMP");
    expect(newState.companySearchResults).toBe(null);
    expect(newState.isFetchingCompanies).toBe(true);
  });

  it("should populate companySearchResults and reset loading on completion", () => {
    const newState = runReducer(ActionTypes.CompanySearchSuccess, []);
    expect(newState.isFetchingCompanies).toBe(false);
    expect(newState.companySearchResults).not.toBe(null);
  });
});
