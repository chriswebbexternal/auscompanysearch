import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

type SearchFieldProps = {
  placeholder?: string;
  value: string | null;
  onChange: (searchTerm: string) => void;
};

/**
 * Self debouncing text field component
 *
 * @param placeholder placeholder text for input
 * @param value initial value. note after initialisation, local state kept for text entry
 * @param onChange event for text changes
 */
export const SearchField = ({
  placeholder = "",
  value,
  onChange
}: SearchFieldProps) => {
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // trigger onChange after debounce.
  useEffect(() => {
    onChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onChange]);

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={ev => setSearchTerm(ev.target.value)}
      />
    </div>
  );
};
