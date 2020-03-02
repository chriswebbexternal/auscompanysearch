/** Action Types for our app's reducer */
export enum ActionTypes {
  AbnLookupBegin = "AbnLookupBegin",
  AbnLookupSuccess = "AbnLookupSuccess",
  AbnLookupFailed = "AbnLookupFailed",
  CompanySearchBegin = "CompanySearchBegin",
  CompanySearchSuccess = "CompanySearchSuccess",
  CompanySearchFailed = "CompanySearchFailed"
}

/** Simple type for a redux shaped action */
export type Action<T extends ActionTypes> = {
  type: T;
  payload: unknown;
};

/** Type to map abr.business.gov.au's results to */
export type AbnLookupResult = {
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
  [key: string]: string | string[]; // index signature => https://stackoverflow.com/questions/32968332/how-do-i-prevent-the-error-index-signature-of-object-type-implicitly-has-an-an
};

export type CompanySearchResult = {
  Abn: string;
  AbnStatus: string;
  IsCurrent: boolean;
  Name: string;
  NameType: string;
  Postcode: string;
  Score: number;
  State: string;
};

/** type state for our app */
export type SearchAppState = {
  abnSearchText: string | null;
  companySearchText: string | null;
  isFetchingAbn: boolean;
  isFetchingCompanies: boolean;
  errorAbn: string | null;
  errorCompany: string | null;
  companyDetail: AbnLookupResult | null;
  companySearchResults: CompanySearchResult[] | null;
  selectedCompanyAbn: string | null;
};

/** type to declare the reducer as a lookup by ActionType */
export type ReducerMap = {
  [key in ActionTypes]: (
    state: SearchAppState,
    action: Action<ActionTypes>
  ) => SearchAppState;
};
