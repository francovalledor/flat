import React from "react";
import { Branch } from "../../types/types";
import BranchListItem from "./BranchListItem";

const BranchList: React.FC<{ branches: Branch[] }> = ({ branches }) => {
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