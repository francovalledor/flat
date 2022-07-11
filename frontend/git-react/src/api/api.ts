import { get } from "../utils/fetch";
import { BRANCHES, COMMITS, PULL_REQUESTS } from "./endpoints";

export const getCommits = async () => await get(COMMITS);
export const getCommit = async (hash: string) => await get(`${COMMITS}${hash}/`)

export const getBranches = async () => await get(BRANCHES);
export const getBranch = async (branch_name: string) => await get(`${BRANCHES}${branch_name}/`);

export const getPullRequests = async () => await get(PULL_REQUESTS);
export const getPullRequest = async (id: number) => await get(`${PULL_REQUESTS}${id}/`);