from django.http import JsonResponse
from django.views import View

from apiv1.utils import get_all_commits, get_commit


class CommitListView(View):
    def get(self, request):
        commits = get_all_commits()

        return JsonResponse(commits, safe=False)


class CommitDetailsView(View):
    def get(self, *args, **kwargs):
        hash = kwargs.get('hash')

        return JsonResponse(get_commit(hash))