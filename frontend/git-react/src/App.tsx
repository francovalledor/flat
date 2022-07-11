import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import BranchList from './components/BranchList/BranchList';
import PRList from './components/PRList/PRList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import CreatePR from './components/CreatePR/CreatePR';
import { BRANCHES, COMMITS, NEW_PR, PULL_REQUESTS, UPDATE_PR } from './routes';
import CommitDetails from './components/CommitDetails/CommitDetails';
import BranchDetails from './components/BranchDetails/BranchDetails';
import CommitListContainer from './components/CommitList/CommitListContainer';
import UpdatePR from './components/UpdatePR/UpdatePR';


function App() {
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
                  <Route path={BRANCHES} element={<BranchList />} />
                  <Route path={`${BRANCHES}/:branch_name`} element={<BranchDetails />} />
                  <Route path={PULL_REQUESTS} element={<PRList />} />
                  <Route path={COMMITS} element={<CommitListContainer />} />
                  <Route path={`${COMMITS}:hash`} element={<CommitDetails />} />
                  <Route path={NEW_PR} element={<CreatePR />} />
                  <Route path={`${UPDATE_PR}:id`} element={<UpdatePR />} />
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