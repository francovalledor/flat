import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { createPullRequest, getBranches } from "../../api/api";
import { PR_STATUSES } from "../../constants";
import { Branch, CreatePullRequestData } from "../../types/types";
import { toastError, toastSuccess } from "../../utils/toasts";
import Select from "../Select/Select";

const VALID_INITIAL_STATUSES = [ PR_STATUSES.OPEN, PR_STATUSES.MERGED];

const CreatePR: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);

  const branchNames = useMemo(
      () => branches.map((b) => b.name), [branches]
    );

  const fetchBranches = async () => {
    const response = await getBranches();
    setBranches(response);
  }

  useEffect(() => {
    fetchBranches();
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

  const createPR = async (pr: CreatePullRequestData) => {
    try {
      const response = await createPullRequest(pr)
      toastSuccess('Pull request created.')
    } catch (error: any) {
      const invalidFields = tryGetInvalidFieldsResponse(error)
      toastError(invalidFields || error.response.statusText);
    }
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    console.log({formData});

    const new_pr: CreatePullRequestData = {
      source: formData.get("source") as string,
      destination: formData.get("destination") as string,
      title: formData.get("title") as string,
      status: formData.get("status") as string,
      message: formData.get("message") as string,
      author_name: formData.get("author_name") as string,
      author_email: formData.get("author_email") as string,
    }

    if (new_pr.source == new_pr.destination) {
      toast.error('Error: source and destination should be different branches', {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      return;
    }

    createPR(new_pr);
  }

  return (
    <div>
      <h3 className="mb-4">Create Pull Request</h3>
      <form onSubmit={handleOnSubmit}>
        <div className="row">
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text">Source</span>
              <Select name="source" defaultValue="" options={branchNames.map(bn => ({name: bn, value: bn}))} />
            </div>
          </div>
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text">Destination</span>
              <Select name="destination" defaultValue="" options={branchNames.map(bn => ({name: bn, value: bn}))} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3 input-group">
              <label className="input-group-text">Title:</label>
              <input type="text" className="form-control" name="title" />
            </div>
          </div>
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text">Initial Status</span>
              <Select name="status" defaultValue="" options={VALID_INITIAL_STATUSES.map(st => ({name: st, value: st}))} />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="form-floating">
            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" name="message"></textarea>
            <label htmlFor="floatingTextarea">Message</label>
          </div>
        </div>

        <fieldset>
          <legend>Author</legend>
          <div className="row">
            <div className="col">
              <div className="mb-3 input-group">
                <label className="input-group-text">Name:</label>
                <input type="text" className="form-control" name="author_name"  minLength={3}/>
              </div>
            </div>
            <div className="col">
              <div className="mb-3 input-group">
                <label className="input-group-text">Email:</label>
                <input type="email" className="form-control" name="author_email" />
              </div>
            </div>
          </div>
        </fieldset>
        <div className="d-grid gap-2 col-3 mx-auto mt-3">
          <button type="submit" className="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePR;
