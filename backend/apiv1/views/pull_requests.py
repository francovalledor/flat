from rest_framework.viewsets import mixins, GenericViewSet
from apiv1.models import PullRequest
from apiv1.serializers.pull_requests import PullRequestBaseSerializer

class PullRequestViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
    ):
    queryset = PullRequest.objects.all()
    serializer_class = PullRequestBaseSerializer