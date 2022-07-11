import re
from rest_framework.serializers import ValidationError

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