import React, { useEffect, useState } from "react";
import { getPullRequests } from "../../api/api";
import { PullRequest } from "../../types/types";
import PRListItem from "./PRListItem";

const PRList: React.FC = () => {
  const [PRs, setPRs] = useState<PullRequest[]>([]);

  const fetchPRs = async () => {
    const _prs = await getPullRequests();
    setPRs(_prs);
  }

  useEffect(() => {
    fetchPRs();
  }, []);

  return (
    <>
      <h3>Pull Requests</h3>
      <hr />
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" className="text-start">ID</th>
            <th scope="col" className="text-start">Title</th>
            <th scope="col" className="text-start">Message</th>
            <th scope="col" className="text-start">Author</th>
            <th scope="col" className="text-start">Status</th>
            <th scope="col" className="text-start">Date</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {
            PRs.map((PR) => <PRListItem PR={PR} refresh={fetchPRs} />)
          }
        </tbody>
      </table>
    </>
  )
}

export default PRList;