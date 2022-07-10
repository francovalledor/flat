from rest_framework.serializers import CharField, Serializer
from .commits import CommitSerializer
from apiv1.libs.simple_git import Commit, Branch


class BranchSerializer(Serializer):
    name = CharField()
    last_commit = CommitSerializer()
    
class BranchDetailsSerializer(Serializer):
    name = CharField()
    commits = CommitSerializer(many=True)

def serialize_branch_details(branch: Branch, commits: list[Commit]):
    result = {}
    result['name'] = branch.name
    result['commits'] = CommitSerializer(commits, many = True).data
    return result