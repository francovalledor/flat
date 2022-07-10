from django.urls import include, path
from .views.commits import CommitsViewSet
from .views.branches import BranchesViewSet
from .views.pull_requests import PullRequestViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'commits', CommitsViewSet, basename='commits')
router.register(r'branches', BranchesViewSet, basename='branches')
router.register('pull-requests', PullRequestViewSet, basename='pull-requests')

urlpatterns = [
    path('', include(router.urls)),
]