from rest_framework.exceptions import APIException
from rest_framework import status


class MergeConflictsException(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = 'Merge conflicts'
    default_code = 'merge_conflicts'


class UncommittedChangesAPIException(APIException):
    status_code = status.HTTP_412_PRECONDITION_FAILED
    default_detail = 'You have uncommitted changes, please clean your workspace and try again'
    default_code = 'uncommitted_changes'