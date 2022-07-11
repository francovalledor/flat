import re
from rest_framework.serializers import ModelSerializer, ValidationError
from apiv1.models import PullRequest, PR_statuses
from apiv1.utils import get_branches_names, merge_branches
from apiv1.validators import validate_branch_name, validate_branches_are_different, validate_email

class PullRequestBaseSerializer(ModelSerializer):
    def validate_source(self, source):
        return validate_branch_name(source)
        
    def validate_destination(self, destination):
        return validate_branch_name(destination)
    
    def validate_author_email(self, email):
        return validate_email(email)

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