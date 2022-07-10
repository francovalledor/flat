import re
from rest_framework.serializers import ModelSerializer, ValidationError
from apiv1.models import PullRequest, PR_statuses
from apiv1.utils import get_branches_names


def validate_branch_name(branch_name):
    branches = get_branches_names()
    if branch_name not in branches:
        raise ValidationError(f"Branch does not exist: '{branch_name}'")

def validate_branches_are_different(source, destination):
    if source == destination:
        raise ValidationError(f"Source ({source}) and destination ({destination}) should be different")

class PullRequestSerializer(ModelSerializer):
    def validate_source(self, source):
        validate_branch_name(source)
        
    def validate_destination(self, destination):
        validate_branch_name(destination)
    
    def validate_author_email(self, email):
        regex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
        
        if not re.search(regex, email):
            raise ValidationError(f"Invalid email: '{email}'")

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