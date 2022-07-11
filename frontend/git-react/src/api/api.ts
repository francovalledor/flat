import { PR_STATUSES } from "../constants";
import { get, patch, post } from "../utils/fetch";
import { BRANCHES, COMMITS, PULL_REQUESTS } from "./endpoints";

export const getCommits = async () => await get(COMMITS);
export const getCommit = async (hash: string) => await get(`${COMMITS}${hash}/`)

export const getBranches = async () => await get(BRANCHES);
export const getBranch = async (branch_name: string) => await get(`${BRANCHES}${branch_name}/`);

export const getPullRequests = async () => await get(PULL_REQUESTS);
export const getPullRequest = async (id: number) => await get(`${PULL_REQUESTS}${id}/`);

export const createPullRequest = async (pr: any) => await post(PULL_REQUESTS, pr);
export const updatePullRequest = async (id: number, data: any) => await patch(`${PULL_REQUESTS}${id}/`, data)
export const closePullRequest = async (id: number) => await patch(`${PULL_REQUESTS}${id}/`, { status: PR_STATUSES.CLOSED})
export const mergePullRequest = async (id: number) => await patch(`${PULL_REQUESTS}${id}/`, { status: PR_STATUSES.MERGED})
