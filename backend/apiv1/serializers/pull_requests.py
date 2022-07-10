from rest_framework.serializers import ModelSerializer, ValidationError
from apiv1.models import PullRequest


class PullRequestSerializer(ModelSerializer):
    def validate_source(self, source):
        raise ValidationError("Branch name does not exist")
    
    def validate_destination(self, source):
        raise ValidationError("Branch name does not exist")
    
    class Meta:
        model = PullRequest
        fields = [
            'id',
            'source',
            'destination',
            'title',
            'message',
            'status',
            'author_name',
            'author_email',
            'created_date',
            'merged_date',
            'closed_date',
        ]