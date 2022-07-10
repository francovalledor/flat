from apiv1.libs.simple_git import SimpleGit, Commit, Branch
from apiv1.serializers import serialize_branch_simple, serialize_branch_details, serialize_commit
from apiv1.libs.simple_git.exceptions import InvalidBranchNameException, InvalidCommitHashException
from rest_framework.exceptions import NotFound


git = SimpleGit()

def get_all_branches():
    return list(map(serialize_branch_simple, git.branches))


def get_branch_with_commits(branch_name):
    try:
        branch = git.get_branch_by_name(branch_name)
        commits = git.list_commits(branch_name)
    except InvalidBranchNameException as error:
        raise NotFound(f"branch: '{branch_name}'")

    return serialize_branch_details(branch, commits)


def get_all_commits():
    all_commits = git.list_commits()
    all_commits_serialized = list(map(serialize_commit, all_commits))
    
    return all_commits_serialized


def get_commit(commit_hash):
    try:
        commit = git.get_commit(commit_hash)
    except InvalidCommitHashException as error:
        raise NotFound(f"Commit hash: '{commit_hash}'")
    
    return serialize_commit(commit)