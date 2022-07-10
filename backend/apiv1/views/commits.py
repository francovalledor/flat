from django.http import JsonResponse
from django.views import View

from apiv1.utils import get_all_commits


class CommitListView(View):
    def get(self, request):
        commits = get_all_commits()

        return JsonResponse(commits, safe=False)
