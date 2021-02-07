import { useEffect, useState, useCallback } from "react";
import {debounce} from "lodash";
import "./SearchForm.css";

/** SearchForm
 * 
 * Props:
 *  - onSearch() - parent function called
 *  - term - term that was already used to be searched by
 * 
 * State:
 *  - searchTerm
 */

function SearchForm({ onSearch, term=""}) {
  const [searchTerm, setSearchTerm] = useState(term);
  const [isSearching, setIsSearching] = useState(false);

  /** handle form submission, call parent fn onSearch */
  function handleSubmit(evt) {
    evt.preventDefault();
    let trimmed = searchTerm.trim();

    if(trimmed && isSearching) onSearch(trimmed);
    setSearchTerm('');
  }
  
  /** handle search, call parent fn onSearch */
  function search() {
    let trimmed = searchTerm.trim();
    if(trimmed && isSearching) onSearch(trimmed);
  }
  
  const delayedSearch = useCallback(debounce(search, 600), [searchTerm]);

  /** Update searchTerm state with current state */
  function handleChange(evt) {
    console.log(evt.target.value);
    setSearchTerm(evt.target.value);
    setIsSearching(true);
  }

  useEffect(() => {
    delayedSearch();
 
    // Cancel the debounce on useEffect cleanup.
    return delayedSearch.cancel;
 }, [searchTerm, delayedSearch]);
 
  return (
    <form onSubmit={handleSubmit} className="m-4">
      <div className="form-group row">
        <div className="col-11">
          <input
            id="searchTerm"
            name="searchTerm"
            value={searchTerm}
            placeholder="Enter search term..."
            className="form-control form-control-lg"
            onChange={handleChange}
          />
        </div>
        <div className="col-1">
          <button className="btn btn-primary btn-lg">Submit!</button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;