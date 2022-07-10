from apiv1.libs.simple_git import SimpleGit, Commit, Branch
from apiv1.serializers import serialize_branch_details, BranchSerializer, CommitSerializer
from apiv1.libs.simple_git.exceptions import InvalidBranchNameException, InvalidCommitHashException
from rest_framework.exceptions import NotFound
from apiv1.serializers import CommitSerializer



git = SimpleGit()

def get_all_branches():
    return BranchSerializer(git.branches, many=True).data


def get_branch_with_commits(branch_name):
    try:
        branch = git.get_branch_by_name(branch_name)
        commits = git.list_commits(branch_name)
    except InvalidBranchNameException as error:
        raise NotFound(f"branch: '{branch_name}'")

    return serialize_branch_details(branch, commits)


def get_all_commits():
    all_commits = git.list_commits()

    return CommitSerializer(all_commits, many=True).data


def get_branches_names() -> list[str]:
    return git.branch_names

def get_commit(commit_hash):
    try:
        commit = git.get_commit(commit_hash)
    except InvalidCommitHashException as error:
        raise NotFound(f"Commit hash: '{commit_hash}'")
    
    return CommitSerializer(commit).data