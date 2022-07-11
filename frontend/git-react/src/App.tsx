import React, { useEffect, useState } from 'react';
import { get } from "./utils/fetch";
import logo from './logo.svg';
import './App.css';
import { closePullRequest, createPullRequest, getBranch, getBranches, getCommit, getCommits, getPullRequest, getPullRequests, mergePullRequest, updatePullRequest } from './api/api';
import { Branch, Commit, PullRequest } from './types/types';
import BranchList from './components/BranchList/BranchList';
import CommitList from './components/CommitList/CommitList';
import PRList from './components/PRList/PRList';

function App() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [commits, setCommits] = useState<Commit[]>([])
  const [PRs, setPRs] = useState<PullRequest[]>([]);

  const fetch_commits = async () => {
    const pull_request = {
      author_email: 'francovalledor@gmail.com',
      author_name: 'Franco Valledor',
      destination: 'frontend',
      source: 'master',
      title: 'Hola mundo'
    }
    const response = await getBranches();
    console.log(response);
    setBranches(response);

    const _commits = await getCommits();
    setCommits(_commits);

    const _prs = await getPullRequests();
    setPRs(_prs);
  }

  useEffect(() => {
    fetch_commits();
  }, []);

  return (
    <div className="App">
      <div className="container p-4 mt-4 shadow">
        <div className="row">
            <div className="col-md-12 mx-auto">
              <PRList PRs={PRs} />
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
