import { PR_STATUSES } from "../constants";

export interface PullRequest {
    id: number;
    author_email: string;
    author_name: string;
    destination: string;
    message: string;
    source: string;
    status: PR_STATUSES;
    title: string;
    created_date: string;
    closed_date?: string;
    merged_date?: string;
}


export type CreatePullRequestData = Omit<PullRequest, "id" | "created_date" | "merged_date" | "closed_date">

export type UpdatePullRequestData = Partial<CreatePullRequestData>


export interface Commit {
    hash: string;
    message: string;
    datetime: string;

    author: {
        email: string;
        name: string;
    }

    affected_files: {
        [filename: string]: {
            deletions: number,
            insertions: number,
            lines: number,
        }
    }
}

export interface Branch {
    name: string;
    last_commit: Commit;
}

export interface BranchDetails {
    name: string;
    commits: Commit[];
}