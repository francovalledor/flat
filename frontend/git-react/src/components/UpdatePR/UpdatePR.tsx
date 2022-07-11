import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBranches, getPullRequest, updatePullRequest } from "../../api/api";
import { PR_STATUSES } from "../../constants";
import { PULL_REQUESTS } from "../../routes";
import { Branch, UpdatePullRequestData, PullRequest } from "../../types/types";
import { toastError, toastSuccess } from "../../utils/toasts";
import Select from "../Select/Select";

const VALID_INITIAL_STATUSES = [ PR_STATUSES.OPEN, PR_STATUSES.MERGED];

const UpdatePR: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const [PR, setPR] = useState<PullRequest | undefined>(undefined);
  const [branches, setBranches] = useState<Branch[]>([]);

  const goToPRList = () => navigate(PULL_REQUESTS);


  const branchNames = useMemo(
      () => branches.map((b) => b.name), [branches]
    );

  const fetch = async () => {
    const response = await getBranches();
    setBranches(response);

    const _pr = await getPullRequest(Number(id) || -1);
    setPR(_pr);
  }

  useEffect(() => {
    fetch();
  }, [])

  const tryGetInvalidFieldsResponse = (error: any) => {
    let invalidFields: string[] = [];
    const data = error?.response?.data;

    if (!data) return "";


    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        invalidFields.push(key);
      }
    }

    return `Invalid: ${invalidFields.join(', ')}`;
  };

  const goToPRs = () => navigate(PULL_REQUESTS);

  const updatePR = async (pr: UpdatePullRequestData) => {
    try {
      const response = await updatePullRequest(PR?.id || -1, pr);
      toastSuccess('Pull request updated.');
      goToPRs();
    } catch (error: any) {
      const invalidFields = tryGetInvalidFieldsResponse(error)
      toastError(invalidFields || error.response.statusText);
    }
  }


  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const new_pr: UpdatePullRequestData = {
      source: formData.get("source") as string,
      destination: formData.get("destination") as string,
      title: formData.get("title") as string,
      status: formData.get("status") as PR_STATUSES,
      message: formData.get("message") as string,
      author_name: formData.get("author_name") as string,
      author_email: formData.get("author_email") as string,
    }

    if (new_pr.source == new_pr.destination) {
      toastError('Error: source and destination should be different branches');
      return;
    }

    updatePR(new_pr);
  }

  return (
    <div>
      <h3 className="mb-4">Create Pull Request</h3>
      <form onSubmit={handleOnSubmit}>
        <div className="row">
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text">Source</span>
              <Select name="source" defaultValue={PR?.source || ""} options={branchNames.map(bn => ({name: bn, value: bn}))} />
            </div>
          </div>
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text">Destination</span>
              <Select name="destination" defaultValue={PR?.destination || ""} options={branchNames.map(bn => ({name: bn, value: bn}))} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3 input-group">
              <label className="input-group-text">Title:</label>
              <input type="text" className="form-control" name="title" defaultValue={PR?.title} />
            </div>
          </div>
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text">Initial Status</span>
              <Select name="status" defaultValue={PR?.status || ""} options={VALID_INITIAL_STATUSES.map(st => ({name: st, value: st}))} />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="form-floating">
            <textarea className="form-control" defaultValue={PR?.message} placeholder="Leave a comment here" id="floatingTextarea" name="message"></textarea>
            <label htmlFor="floatingTextarea">Message</label>
          </div>
        </div>

        <fieldset>
          <legend>Author</legend>
          <div className="row">
            <div className="col">
              <div className="mb-3 input-group">
                <label className="input-group-text">Name:</label>
                <input type="text" className="form-control" name="author_name" defaultValue={PR?.author_name}  minLength={3}/>
              </div>
            </div>
            <div className="col">
              <div className="mb-3 input-group">
                <label className="input-group-text">Email:</label>
                <input type="email" className="form-control" name="author_email"  defaultValue={PR?.author_email}/>
              </div>
            </div>
          </div>
        </fieldset>
          <div className="row">
            <div className="col" />
            <div className="col">
              <div className="d-grid col-12 mx-auto mt-3">
                <button type="button" onClick={goToPRList} className="btn btn-secondary">Cancel</button>
              </div>
            </div>
            <div className="col">
              <div className="d-grid col-12 mx-auto mt-3">
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </div>
            <div className="col" />
        </div>
      </form>
    </div>
  )
}

export default UpdatePR;
