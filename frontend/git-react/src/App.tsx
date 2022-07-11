import React, { useEffect } from 'react';
import { get } from "./utils/fetch";
import logo from './logo.svg';
import './App.css';
import { getBranch, getBranches, getCommit, getCommits, getPullRequest, getPullRequests } from './api/api';

function App() {

  const fetch_commits = async () => {
    const response = await getCommit('a5400a3ad1c6074267e8cd1c57fac3ef52a5cda8');
    console.log(response);
  }

  useEffect(() => {
    fetch_commits();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
