from apiv1.libs.simple_git import SimpleGit, Commit, Branch
from apiv1.serializers import serialize_branch_simple, serialize_branch_details, serialize_commit

def get_all_branches():
    git = SimpleGit()
    result = list(map(serialize_branch_simple, git.branches))

    return result


def get_branch_with_commits(branch_name):
    git = SimpleGit()
    commits = git.list_commits(branch_name)
    branch = git.get_branch_by_name(branch_name)
    return serialize_branch_details(branch, commits)


def get_all_commits():
    git = SimpleGit()
    all_commits = git.list_commits()
    
    all_commits_serialized = list(map(serialize_commit, all_commits))
    
    return all_commits_serialized


def get_commit(commit_hash):
    git = SimpleGit()
    commit = git.get_commit(commit_hash)
    
    return serialize_commit(commit)