from django.urls import path
from .views import branches

urlpatterns = [
    path("branches/", branches.BranchListView.as_view(), name="branches"),
    path("branches/<str:branch_name>", branches.BranchDetailsView.as_view(), name="branch_details"),
]