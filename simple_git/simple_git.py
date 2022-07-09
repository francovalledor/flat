from git import GitCommandError, Repo

from simple_git.commit import Commit
from simple_git.exceptions import InvalidBranchNameException, MergeException

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
    
    
    def checkout(self, branch_name) -> None:
        self.__validate_branch_name(branch_name)
        self.__repo.branches[branch_name].checkout()
    
    
    def merge(self, source, destination) -> None:
        self.__validate_branch_name(source)
        self.__validate_branch_name(destination)
        
        current = self.active_branch

        self.checkout(destination)
        
        try:
            self.__repo.git.merge(source)
        except GitCommandError:
            if self.__are_there_conflicts():
                self.__abort_merge()

            self.checkout(current)
            raise MergeException
    

    def __validate_branch_name(self, branch_name):
        if branch_name not in self.branches:
            raise InvalidBranchNameException(branch_name)
        
    
    def __are_there_conflicts(self) -> bool:
        git_status = self.__repo.git.status(porcelain=True).split()
        
        if "UU" in git_status:
            return True
        
        return False
    

    def __abort_merge(self) -> None:
        self.__repo.git.merge('--abort')