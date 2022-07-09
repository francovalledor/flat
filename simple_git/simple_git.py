from git import Repo

from simple_git.commit import Commit
from simple_git.exceptions import InvalidBranchNameException

class SimpleGit:
    CURRENT_DIRECTORY = '.'

    def __init__(self, path=CURRENT_DIRECTORY) -> None:
        self.__repo = Repo(path)

    
    @property
    def active_branch(self):
        return self.__repo.active_branch.name
    
    
    @property
    def branches(self):
        return [branch.name for branch in self.__repo.branches]
    
    
    def list_commits(self, branch_name=None):
        if branch_name is None:
            branch_name = self.active_branch
        
        self.__validate_branch_name(branch_name)

        branch = self.__repo.branches[branch_name]
        commits = map(Commit, self.__repo.iter_commits(branch))

        return list(commits)
    
    
    def __validate_branch_name(self, branch_name):
        if branch_name not in self.branches:
            raise InvalidBranchNameException(branch_name)