import { searchAppReducer } from "../logic/searchReducer";

describe("Company search app", () => {
  describe("Search text field", () => {
    it.todo("should show a list of matching companies");
    it.todo(
      "should not flood the search lookup service with excessive requests"
    );

    describe("Search results", () => {
      it.todo("should display results from the lookup service");
      it.todo("should display 'no results' if no matches");
      it.todo("should load company details when clicking on an item");
      it.todo(
        "should load company details automatically if there is one result matching an ABN search"
      );
    });
  });
});
