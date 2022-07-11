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
        


class PullRequestCreateSerializer(PullRequestBaseSerializer):
    def validate_status(self, status):
        status = status.upper()
        VALID_INITIAL_STATUSES = [PR_statuses.OPEN, PR_statuses.MERGED]
        
        if status not in VALID_INITIAL_STATUSES:
            raise ValidationError(f"Invalid status for new PR. Given: '{status}'. Valid: {list(map(str,VALID_INITIAL_STATUSES))}")
        
        return status
        
    
    def create(self, validated_data):
        source = validated_data.get('source')
        destination = validated_data.get('destination')
        title = validated_data.get('title')
        message = validated_data.get('message')
        status = validated_data.get('status')
        
        validate_branches_are_different(source, destination)

        if status == PR_statuses.MERGED:
            merge_branches(source, destination, message or title)
        
        return super().create(validated_data)