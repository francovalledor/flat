from git import BadName, GitCommandError, Repo

from .commit import Commit
from .branch import Branch
from .exceptions import InvalidBranchNameException, InvalidCommitHashException, MergeException, UncommittedChangesException

class SimpleGit:
    CURRENT_DIRECTORY = '.'

    def __init__(self, path=CURRENT_DIRECTORY) -> None:
        self.__repo = Repo(path, search_parent_directories=True)

    
    @property
    def active_branch(self):
        return self.__repo.active_branch.name
    
    
    @property
    def branches(self):
        return [Branch(branch) for branch in self.__repo.branches]
    
    
    @property
    def branch_names(self):
        return [branch.name for branch in self.branches]
        
    
    def list_commits(self, branch_name=None):
        if branch_name is None:
            branch_name = self.active_branch
        
        self.__validate_branch_name(branch_name)

        branch = self.__repo.branches[branch_name]
        commits = map(Commit, self.__repo.iter_commits(branch))

        return list(commits)
    
    
    def checkout(self, branch_name) -> None:
        self.__validate_branch_name(branch_name)
        self.__validate_uncommitted_changes()

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
    
    def get_commit(self, hash: str) -> Commit:
        try:
            commit = self.__repo.commit(hash)
            return Commit(commit)
        except BadName:
            raise InvalidCommitHashException(hash)
    
    def get_branch_by_name(self, branch_name: str) -> Branch:
        self.__validate_branch_name(branch_name)
        
        return Branch(self.__repo.branches[branch_name])

    def __validate_branch_name(self, branch_name):
        if branch_name not in self.branch_names:
            raise InvalidBranchNameException(branch_name)

    
    def __are_there_conflicts(self) -> bool:
        git_status = self.__get_modified_files_states()
        
        if GitStatuses.UNMERGED_BOTH_MODIFIED in git_status:
            return True
        
        return False
    

    def __abort_merge(self) -> None:
        self.__repo.git.merge('--abort')
    
   
    def __are_there_uncommitted_changes(self) -> None:
        modified_files_descriptor = self.__get_modified_files_states()
       
        return len(modified_files_descriptor) > 0  


    def __validate_uncommitted_changes(self) -> None:
        if self.__are_there_uncommitted_changes():
            raise UncommittedChangesException

   
    def __get_modified_files_states(self) -> list:
        git_modified_files_with_status = self.__repo.git.status(porcelain=True).split('\n')
        stripped = list(map(str.strip, git_modified_files_with_status))
        
        result = []
        
        for file in stripped:
            first_space_index = file.index(' ')
            status_descriptor = file[:first_space_index]
            result.append(status_descriptor)
            
        return result
            

class GitStatuses:
    UNMERGED_BOTH_MODIFIED = 'UU'