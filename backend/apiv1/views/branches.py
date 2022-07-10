from django.http import JsonResponse
from django.views import View

from apiv1.utils import get_all_branches, get_branch_with_commits


class BranchListView(View):
    def get(self):
        branches = get_all_branches()

        return JsonResponse(branches, safe=False)


class BranchDetailsView(View):
    def get(self, *args, **kwargs):
        branch_name = kwargs.get('branch_name')
        return JsonResponse(get_branch_with_commits(branch_name))
