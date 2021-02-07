import { useEffect, useState } from "react";
import SearchForm from "../shared/SearchForm";
import JoblyApi from "../api";
import JobCardList from "../jobs/JobCardList";
import LoadingSpinner from "../shared/LoadingSpinner";


/** JobList
 * 
 * Props:
 *  - applyForJob - fn to call when applying for job called in JobCard
 * 
 * State:
 * - jobs: Array of job objects
 *    [{ id, title, salary, equity }, ...]
 * - queryTerm: string to filter the job results
 * - isLoading: boolean
 *  
 * 
 */

function JobList({applyForJob}) {

  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);


  /** get all jobs when query term or is loading changes 
 * using JoblyApi class */
  useEffect(function getAllJobsOnSearch() {
    async function getAllJobs() {
      let jobs;
      try {
        jobs = await JoblyApi.getAllJobs(title);
        setJobs(jobs);
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
    if (isLoading) getAllJobs();
  }, [title, isLoading]);

  /** Function called by the SearchForm in order to change
   *  the title for the companies AJAX request
   */
  // Alternative option here: we could move getAllJobs outside of
  // useEffect and call it here. Then, we wouldn't need to have title as a
  // variable. 
  function onSearch(term) {
    setTitle(term);
    setIsLoading(true);
  }

  if (isLoading) return <LoadingSpinner/>

  return (
    <div className="JobList m-5">
      <SearchForm onSearch={onSearch} term={title} />
      <JobCardList jobs={jobs} applyForJob={applyForJob} />
    </div>
  );
}

export default JobList;