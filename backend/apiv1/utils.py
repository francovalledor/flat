from apiv1.libs.simple_git import SimpleGit, Commit, Branch
from apiv1.serializers import serialize_branch_simple
from apiv1.serializers import serialize_branch_details


def get_all_branches():
    git = SimpleGit()
    result = list(map(serialize_branch_simple, git.branches))

    return result


def get_branch_with_commits(branch_name):
    git = SimpleGit()
    commits = git.list_commits(branch_name)
    branch = git.get_branch_by_name(branch_name)
    return serialize_branch_details(branch, commits)