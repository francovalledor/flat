from rest_framework.viewsets import ModelViewSet
from apiv1.models import PullRequest
from apiv1.serializers import PullRequestSerializer

class PullRequestViewSet(ModelViewSet):
    queryset = PullRequest.objects.all()
    serializer_class = PullRequestSerializer