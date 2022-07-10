from apiv1.libs.simple_git import SimpleGit, Commit, Branch

from apiv1.libs.simple_git.exceptions import InvalidBranchNameException, InvalidCommitHashException, MergeException
from rest_framework.exceptions import NotFound
from apiv1.exceptions import MergeConflictsException


git = SimpleGit()

def get_all_branches() -> list[Branch]:
    return git.branches


def get_commits_by_branch_name(branch_name):
    try:
        commits = git.list_commits(branch_name)
    except InvalidBranchNameException:
        raise NotFound(f"branch: '{branch_name}'")
    
    return commits


def get_branch_by_name(branch_name) -> Branch:
    try:
        branch = git.get_branch_by_name(branch_name)
    except InvalidBranchNameException:
        raise NotFound(f"branch: '{branch_name}'")
    
    return branch


def get_all_commits() -> list[Commit]:
    return git.list_commits()


def get_branches_names() -> list[str]:
    return git.branch_names


def get_commit(commit_hash) -> Commit:
    try:
        commit = git.get_commit(commit_hash)
    except InvalidCommitHashException as error:
        raise NotFound(f"Commit hash: '{commit_hash}'")
    
    return commit


def merge_branches(source, destination):
    try:
        git.merge(source, destination)
    except MergeException:
        raise MergeConflictsException