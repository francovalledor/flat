import React, { useEffect } from 'react';
import { get } from "./utils/fetch";
import logo from './logo.svg';
import './App.css';
import { closePullRequest, createPullRequest, getBranch, getBranches, getCommit, getCommits, getPullRequest, getPullRequests, mergePullRequest, updatePullRequest } from './api/api';

function App() {

  const fetch_commits = async () => {
    const pull_request = {
      author_email: 'francovalledor@gmail.com',
      author_name: 'Franco Valledor',
      destination: 'frontend',
      source: 'master',
      title: 'Hola mundo'
    }
    const response = await updatePullRequest(4, { id: 2, author_name: 'Yo' });
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
