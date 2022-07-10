from rest_framework.response import Response
from rest_framework import viewsets

from apiv1.utils import get_all_branches, get_branch_with_commits

class BranchesViewSet(viewsets.ViewSet):   
    def list(self, request):
        branches = get_all_branches()

        return Response(branches)


    def retrieve(self, request, pk):
        branch_name = pk
        branch = get_branch_with_commits(branch_name)

        return Response(branch)