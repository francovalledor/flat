from rest_framework.viewsets import mixins, GenericViewSet
from apiv1.models import PullRequest
from apiv1.serializers.pull_requests import PullRequestBaseSerializer, PullRequestCreateSerializer, PullRequestUpdateSerializer

class PullRequestViewSet(
        mixins.CreateModelMixin,
        mixins.RetrieveModelMixin,
        mixins.UpdateModelMixin,
        mixins.ListModelMixin,
        GenericViewSet,
    ):
    queryset = PullRequest.objects.all()
    http_method_names = ['get', 'post', 'patch', 'head']
    
    def get_serializer_class(self):
        DEFAULT_SERIALIZER = PullRequestBaseSerializer

        SERIALIZERS_MAP = {
            'POST': PullRequestCreateSerializer,
            'PATCH': PullRequestUpdateSerializer,
            }

        request_method = self.request.method
        serializer = SERIALIZERS_MAP.get(request_method, DEFAULT_SERIALIZER)
        return serializer