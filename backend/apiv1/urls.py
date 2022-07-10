from django.urls import include, path
from .views import branches
from .views.commits import CommitsViewSet
from .views.branches import BranchesViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'commits', CommitsViewSet, basename='commits')
router.register(r'branches', BranchesViewSet, basename='branches')


urlpatterns = [
    path('', include(router.urls)),
]