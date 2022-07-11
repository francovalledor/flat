from rest_framework.response import Response
from rest_framework import viewsets

from apiv1.serializers.commits import CommitSerializer
from apiv1.utils import get_all_commits, get_commit


class CommitsViewSet(viewsets.ViewSet):   
    def list(self, request):
        commits = get_all_commits()
        serialized = CommitSerializer(commits, many=True).data
        
        return Response(serialized)


    def retrieve(self, request, pk):
        commit = get_commit(pk)
        serialized = CommitSerializer(commit).data

        return Response(serialized)