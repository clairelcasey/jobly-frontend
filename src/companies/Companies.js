import { useEffect, useState } from "react";
import CompaniesList from "./CompaniesList";
import SearchForm from "../shared/SearchForm";
import JoblyApi from "../api";
import LoadingSpinner from "../shared/LoadingSpinner";

/** Show companies
 * 
 * 
 * State:
 * - companies: Array of company objects
 *    [ { handle, name, description, numEmployees, logoUrl }, ...]
 * - queryTerm: string to filter the companies results
 * - isLoading: boolean
 */

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState(""); 
  const [isLoading, setIsLoading] = useState(true);

  /** get all companies when query term or is loading changes 
   * using JoblyApi class */
  useEffect(function getAllCompaniesOnSearch() {
    async function getAllCompanies() {
      let companies;
      try {
        companies = await JoblyApi.getAllCompanies(name);
        setCompanies(companies);
        setIsLoading(false);
      } catch (err) {
        // Maybe we want to let the user know what the error was
        // and redirect to some error page or ask the user to 
        // refresh the page?
        // Redirect and perhaps use the location object to hold
        // an error message
        return;
      }
    }
    if (isLoading) getAllCompanies();
  }, [name, isLoading]);

  /** Function called by the SearchForm in order to change
   *  the name for the companies AJAX request
   */

  // Alternative option here: we could move getAllJobs outside of
  // useEffect and call it here. Then, we wouldn't need to have name as a
  // variable. 
  function onSearch(term) {
    setName(term);
    setIsLoading(true);
  }

  if (isLoading) return <LoadingSpinner/>

  return (
    <div className="Companies m-5">
      <SearchForm onSearch={onSearch} term={name} />
      <CompaniesList companies={companies} />
    </div>
  );
}

export default Companies;