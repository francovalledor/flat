import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get } from "./utils/fetch";
import './App.css';
import { closePullRequest, createPullRequest, getBranch, getBranches, getCommit, getCommits, getPullRequest, getPullRequests, mergePullRequest, updatePullRequest } from './api/api';
import { Branch, Commit, PullRequest } from './types/types';
import BranchList from './components/BranchList/BranchList';
import CommitList from './components/CommitList/CommitList';
import PRList from './components/PRList/PRList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import CreatePR from './components/CreatePR/CreatePR';
import { BRANCHES, COMMITS, NEW_PR, PULL_REQUESTS } from './routes';
import CommitDetails from './components/CommitDetails/CommitDetails';


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
        <ToastContainer />
        <Router>
          <NavBar />
          <div className="row">
            <div className="col-md-12 mx-auto">
              <div>
                <Routes>
                  <Route path={BRANCHES} element={<BranchList branches={branches} />} />
                  <Route path={PULL_REQUESTS} element={<PRList />} />
                  <Route path={COMMITS} element={<CommitList commits={commits} />} />
                  <Route path={`${COMMITS}:hash`} element={<CommitDetails />} />
                  <Route path={NEW_PR} element={<CreatePR />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;