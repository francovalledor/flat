import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommit } from "../../api/api";
import { Commit } from "../../types/types";
import { formatDate } from "../../utils/dates";

const CommitDetails: React.FC = () => {
  const [commit, setCommit] = useState<Commit | undefined>(undefined);
  let { hash } = useParams<string>();


  const fetchCommit = async () => {
    const _commit = await getCommit(hash || '');
    setCommit(_commit);
  };

  useEffect(() => {
    fetchCommit();
  }, []);





  const AffectedFiles: React.FC = () => {
    const fileNames = Object.keys(commit?.affected_files || {});

    return (
      <ul className="list-group list-group-flush">
        {fileNames.map(fn => (
          <li className="list-group-item">
            <strong>{fn}</strong>
            - insertions: {commit?.affected_files[fn].insertions}
            - deletions: {commit?.affected_files[fn].deletions}
            - lines: {commit?.affected_files[fn].lines}
          </li>
        ))}
      </ul>
    );
  }

  if (!commit) return null;

  return (
    <div>
      <h2>Commit details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{commit.message}</h5>
          <p className="card-text">{commit.author.name} - {commit.author.email}</p>
        </div>
        <AffectedFiles />

        <div className="card-body">
        <p className="card-text">{formatDate(commit.datetime)}</p>
        </div>
      </div>
    </div>
  )
}

export default CommitDetails;