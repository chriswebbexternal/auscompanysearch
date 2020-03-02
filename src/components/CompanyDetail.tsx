import React from "react";
import { AbnLookupResult } from "../logic/types";

type CompanyDetailProps = {
  companyDetail: AbnLookupResult;
};

/**
 * Shows detail of ABN Lookup or message if in type
 *
 * @param companyDetail abn lookup detail to display
 */
export const CompanyDetail = ({ companyDetail }: CompanyDetailProps) => {
  return (
    <div>
      {companyDetail.Message ? (
        <div>{companyDetail.Message}</div>
      ) : (
        <table>
          <tbody>
            {Object.keys(companyDetail)
              .filter(key => key !== "Message")
              .map((key, i) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{companyDetail[key]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
