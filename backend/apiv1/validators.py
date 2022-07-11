import re
from rest_framework.serializers import ValidationError
from apiv1.models import PR_statuses

from apiv1.utils import get_branches_names


def validate_branch_name(branch_name):
    branches = get_branches_names()
    if branch_name not in branches:
        raise ValidationError(f"Branch does not exist: '{branch_name}'")
    
    return branch_name


def validate_branches_are_different(source, destination):
    if source == destination:
        raise ValidationError(f"Source ({source}) and destination ({destination}) should be different")

    return source, destination


def validate_email(email):
    regex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"

    if not re.search(regex, email):
        raise ValidationError(f"Invalid email: '{email}'")

    return email


def validate_readonly_status(current_status):
    READ_ONLY_STATUSES = [PR_statuses.CLOSED, PR_statuses.MERGED]
    
    if current_status in READ_ONLY_STATUSES:
        raise ValidationError(f"{current_status.lower().capitalize()} PRs can't be modified")
        
    