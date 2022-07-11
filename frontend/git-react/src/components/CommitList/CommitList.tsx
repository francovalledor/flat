import React from "react";
import { Commit } from "../../types/types";
import CommitListItem from "./CommitListItem";

const CommitList: React.FC<{ commits: Commit[] }> = ({ commits: commits }) => {
  return (
    <>
      <h3>Commits</h3>
      <hr />
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" className="text-start">Message</th>
            <th scope="col" className="text-start">Date</th>
            <th scope="col" className="text-start">Author</th>
          </tr>
        </thead>
        <tbody>
          {
            commits.map((commit) => <CommitListItem commit={commit} />)
          }
        </tbody>
      </table>
    </>
  )
}

export default CommitList;