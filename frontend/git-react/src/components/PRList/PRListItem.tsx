import React from "react";
import { FaCheckCircle, FaEdit, FaRegTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { closePullRequest, mergePullRequest } from "../../api/api";
import { PR_STATUSES } from "../../constants";
import { UPDATE_PR } from "../../routes";

import { PullRequest } from "../../types/types";
import { formatDate } from "../../utils/dates";
import { truncate } from "../../utils/strings";
import { toastError, toastSuccess } from "../../utils/toasts";


const PRListItem: React.FC<{PR: PullRequest, refresh: () => void}> = ({ PR, refresh }) => {
  const navigate = useNavigate();

  const goToEditPR = () => navigate(`${UPDATE_PR}${PR.id}`)

  const handleEdit = () => {
    goToEditPR();
  }

  const handleClose = async () => {
    try {
      await closePullRequest(PR.id);
      toastSuccess('PR Closed.');
    } catch (error: any) {
      toastError(error?.response?.data?.detail || 'Error');
    } finally {
      refresh();
    }
  }

  const handleMerge = async () => {
    try {
      await mergePullRequest(PR.id);
      toastSuccess('PR Merged.');
    } catch (error: any) {
      toastError(error?.response?.data?.detail || 'Error');
    } finally {
      refresh();
    }
  }

  const areButtonsDisabled = PR.status != PR_STATUSES.OPEN;

  return (
    <tr>
      <td className="text-capitalize text-start">{PR.id}</td>
      <td className="text-capitalize text-start">{PR.title}</td>
      <td className="text-capitalize text-start">{truncate(PR.message, 60)}</td>
      <td className="text-start"><span className="text-capitalize">{PR.author_name}</span> - {PR.author_email}</td>
      <td className="text-start">{PR.status}</td>
      <td className="text-start">{formatDate(PR.created_date)}</td>
      <td>
        <div className="btn-group btn-group-sm">
          <button className="btn btn-primary" onClick={handleEdit} disabled={areButtonsDisabled}>
            <FaEdit title="Edit PR" />
          </button>
          <button onClick={handleMerge} className="btn btn-success" disabled={areButtonsDisabled}>
            <FaCheckCircle title="Merge"/>
          </button>
          <button onClick={handleClose} className="btn btn-danger" disabled={areButtonsDisabled}>
            <FaRegTimesCircle title="Close PR"/>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default PRListItem;