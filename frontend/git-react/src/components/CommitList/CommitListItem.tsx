import React from "react";
import { Commit } from "../../types/types";
import { formatDate } from "../../utils/dates";
import { truncate } from "../../utils/strings";


const CommitListItem: React.FC<{commit: Commit}> = ({ commit }) => {
  return (
    <tr>
      <td className="text-capitalize text-start">
        {truncate(commit.message, 60)}
      </td>
      <td className="text-capitalize text-start"> {formatDate(commit.datetime)}</td>
      <td className="text-start"><span className="text-capitalize">{commit.author.name}</span> - {commit.author.email}</td>
    </tr>
  )
}

export default CommitListItem;