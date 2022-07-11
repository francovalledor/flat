import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBranch, getCommit } from "../../api/api";
import { BranchDetails as BranchDetailsType, Commit } from "../../types/types";
import { formatDate } from "../../utils/dates";
import CommitList from "../CommitList/CommitList";

const BranchDetails: React.FC = () => {
  const [branch, setBranch] = useState<BranchDetailsType | undefined>(undefined);
  let { branch_name } = useParams<string>();

  console.log({branch_name});

  const fetchBranch = async () => {
    const _branch = await getBranch(branch_name || '');

    setBranch(_branch);
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  return (
      <div>
        <h1>Branch details: {branch?.name}</h1>
        <CommitList commits={branch?.commits || []} />
      </div>
    );
};

export default BranchDetails;
