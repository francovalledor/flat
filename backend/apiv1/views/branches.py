from rest_framework.response import Response
from rest_framework import viewsets

from apiv1.utils import get_all_branches, get_commits_by_branch_name, get_branch_by_name
from apiv1.serializers.branches import BranchSerializer, serialize_branch_details

class BranchesViewSet(viewsets.ViewSet):
    lookup_value_regex = '[0-9a-zA-Z-_/]+'


    def list(self, request):
        branches = get_all_branches()
        serialized = BranchSerializer(branches, many=True).data

        return Response(serialized)


    def retrieve(self, request, pk):
        branch_name = pk
        branch = get_branch_by_name(branch_name)
        commits = get_commits_by_branch_name(branch_name)
        serialized = serialize_branch_details(branch, commits)
        return Response(serialized)