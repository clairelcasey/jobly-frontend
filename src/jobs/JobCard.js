import "./JobCard.css";

/** Show JobCard
 * 
 * Prop:
 * - id, title, salary, equity, companyHandle, companyName
 * - hasApplied: boolean 
 *  - applyForJob - fn to call when applying for job
 */

function JobCard({ id, title, salary, equity, companyHandle, companyName, hasApplied=false, applyForJob }) {
  
  function onClick() {
    applyForJob(id);
  }

  let applicationBtn = (hasApplied) 
    ? <button className="btn disabled btn-danger">APPLIED</button>
    : <button onClick={onClick} className="btn btn-danger">APPLY</button>;

  return (
    <div className="JobCard">
      <div className="card text-left m-4">
        <div className="card-body">
          <h4>{title}</h4>
          <h3>{companyName}</h3>
          <p>Salary: {salary}</p>
          <p>Equity: {equity}</p>
          {applicationBtn}
        </div>
      </div>
    </div>
  );
}

export default JobCard;