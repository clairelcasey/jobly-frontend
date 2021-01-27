import { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import JoblyApi from "../api";
import JobCardList from "../jobs/JobCardList";

/** Show CompanyDetail
 * 
 * Show a company's details and jobs given url param
 * 
 * State:
 * - company: the object containing all the company information
 *  { handle, name, description, numEmployees, logoUrl, jobs }
 *      where jobs is [{ id, title, salary, equity }, ...]
 * - isLoading: boolean - shows whether the component is loading
 * 
 * Params:
 *  - handle: company handle
 * 
 */

function CompanyDetail() {
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {handle} = useParams();
  
  useEffect(function getCompanyOnRender() {
    async function getCompany() {
      try {
        var company = await JoblyApi.getCompany(handle);
      } catch (err) {
        company = null;
      }
      setCompany(company);
      setIsLoading(false);
    }
    getCompany();
  }, [handle, isLoading]);
  // TODO: object to pass to Redirect called location - could do a flash message
  // (use location and see if val exists in location). 
  if (company === null) {
    return <Redirect to="/companies" />
  }

  if(isLoading) return <div>Currently loading!</div>

  return (
    <div className="CompanyDetail m-4">
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;