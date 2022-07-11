import React from "react";
import { FaEdit, FaRegTimesCircle, FaTrash } from "react-icons/fa";

import { PullRequest } from "../../types/types";
import { truncate } from "../../utils/strings";


const PRListItem: React.FC<{PR: PullRequest}> = ({ PR }) => {
  const handleEdit = () => {
    console.log('Edit PR', PR.id)
  }

  const handleClose = () => {
    console.log('Close PR', PR.id)
  }

  return (
    <tr>
      <td className="text-capitalize text-start">{PR.id}</td>
      <td className="text-capitalize text-start">{PR.title}</td>
      <td className="text-capitalize text-start">{truncate(PR.message, 60)}</td>
      <td className="text-start"><span className="text-capitalize">{PR.author_name}</span> - {PR.author_email}</td>
      <td className="text-start">{PR.status}</td>
      <td className="text-start">{PR.created_date}</td>
      <td>
        <div className="btn-group btn-group-sm">
          <button className="btn btn-primary" onClick={handleEdit}>
            <FaEdit title="Edit PR" />
          </button>
          <button onClick={handleClose} className="btn btn-danger">
            <FaRegTimesCircle title="Close PR"/>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default PRListItem;