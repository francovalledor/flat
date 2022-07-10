from django.urls import path
from .views import branches, commits

urlpatterns = [
    path("branches/", branches.BranchListView.as_view(), name="branches"),
    path("branches/<str:branch_name>", branches.BranchDetailsView.as_view(), name="branch_details"),
    path("commits/", commits.CommitListView.as_view(), name="commits")
]