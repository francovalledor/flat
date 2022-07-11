import { PR_STATUSES } from "../constants";
import { Branch, BranchDetails, Commit, CreatePullRequestData, PullRequest, UpdatePullRequestData } from "../types/types";
import { get, patch, post } from "../utils/fetch";
import { BRANCHES, COMMITS, PULL_REQUESTS } from "./endpoints";

export const getCommits = async (): Promise<Commit[]> => await get(COMMITS);
export const getCommit = async (hash: string): Promise<Commit> => await get(`${COMMITS}${hash}/`)

export const getBranches = async (): Promise<Branch[]> => await get(BRANCHES);
export const getBranch = async (branch_name: string): Promise<BranchDetails> => await get(`${BRANCHES}${branch_name}/`);

export const getPullRequests = async (): Promise<PullRequest[]> => await get(PULL_REQUESTS);
export const getPullRequest = async (id: number): Promise<PullRequest> => await get(`${PULL_REQUESTS}${id}/`);

export const createPullRequest = async (pr: CreatePullRequestData) => await post(PULL_REQUESTS, pr);
export const updatePullRequest = async (id: number, data: UpdatePullRequestData) => await patch(`${PULL_REQUESTS}${id}/`, data)
export const closePullRequest = async (id: number) => await patch(`${PULL_REQUESTS}${id}/`, { status: PR_STATUSES.CLOSED})
export const mergePullRequest = async (id: number) => await patch(`${PULL_REQUESTS}${id}/`, { status: PR_STATUSES.MERGED})
