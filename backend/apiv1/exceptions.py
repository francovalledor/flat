from rest_framework.exceptions import APIException
from rest_framework import status

class MergeConflictsException(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = 'Merge conflicts'
    default_code = 'merge_conflicts'