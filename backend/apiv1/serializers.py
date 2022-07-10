from apiv1.libs.simple_git import Commit, Branch
from rest_framework import serializers


def serialize_branch_details(branch: Branch, commits: list[Commit]):
    result = {}
    result['name'] = branch.name
    result['commits'] = CommitSerializer(commits, many = True).data
    return result

class AuthorSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()

class CommitSerializer(serializers.Serializer):
    author = AuthorSerializer(many=False)
    datetime = serializers.DateTimeField()
    message = serializers.CharField()
    hash = serializers.CharField()
    affected_files = serializers.DictField()
    
class BranchSerializer(serializers.Serializer):
    name = serializers.CharField()
    last_commit = CommitSerializer()
    
class BranchesSerializer(serializers.Serializer):
    branches = BranchSerializer(many=True)
    
class BranchDetailsSerializer(serializers.Serializer):
    name = serializers.CharField()
    commits = CommitSerializer(many=True)