import React from "react";
import { Branch } from "../../types/types";
import { formatDate } from "../../utils/dates";


const BranchListItem: React.FC<{branch: Branch}> = ({ branch }) => {
  const handleCreatePR = () => {
    console.log('Create PR ', branch.name);
  }

  return (
    <tr>
      <th className="text-capitalize text-start" scope="row">
        {branch.name}
      </th>
      <td className="text-capitalize text-start"> {branch.last_commit.message}</td>
      <td className="text-capitalize text-start"> {formatDate(branch.last_commit.datetime)}</td>
      <td>
        <div className="btn-group btn-group-sm">
          <button className="btn btn-success" onClick={handleCreatePR}>
            PR
          </button>
        </div>
      </td>
    </tr>
  )
}

export default BranchListItem;