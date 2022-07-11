import React, { useEffect, useState } from "react";
import { getCommits } from "../../api/api";
import { Commit } from "../../types/types";
import CommitList from "./CommitList";

const CommitListContainer: React.FC = () => {
  const [commits, setCommits] = useState<Commit[]>([]);

  const fetchCommits = async () => {
    const _commits = await getCommits();
    setCommits(_commits);
  }

  useEffect(() => {
    fetchCommits();
  }, []);

  return <CommitList commits={commits} />
};

export default CommitListContainer;
