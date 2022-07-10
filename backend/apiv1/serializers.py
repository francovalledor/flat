from unittest import result
from apiv1.libs.simple_git import Commit, Branch


def serialize_branch_simple(branch: Branch) -> dict:
    result = {}
    result['name'] = branch.name
    result['last_commit'] = serialize_commit(branch.last_commit)
    
    return result
    

def serialize_commit(commit: Commit) -> dict:
    result = {}
    result['author'] = {'name': commit.author.name, 'email': commit.author.email}
    result['datetime'] = str(commit.datetime)
    result['hash'] = commit.hash
    result['affected_files'] = commit.affected_files
    result['message'] = commit.message
    
    return result


def serialize_branch_details(branch: Branch, commits: list[Commit]):
    result = {}
    result['name'] = branch.name
    result['commits'] = list(map(serialize_commit, commits))
    
    return result