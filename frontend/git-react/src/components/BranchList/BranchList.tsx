import React, { useEffect, useState } from "react";
import { getBranches } from "../../api/api";
import { Branch } from "../../types/types";
import BranchListItem from "./BranchListItem";

const BranchList: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);

  const fetchBranches = async () => {
    const response = await getBranches();
    setBranches(response);
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <>
      <h3>Branches</h3>
      <hr />
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last Commit</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {
            branches.map((branch) => <BranchListItem branch={branch} />)
          }
        </tbody>
      </table>
    </>
  )
}

export default BranchList;