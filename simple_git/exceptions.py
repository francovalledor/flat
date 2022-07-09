class InvalidBranchNameException(Exception):
    def __init__(self, branch_name) -> None:
        self.branch_name = branch_name
        super().__init__()
    
    def __str__(self) -> str:
        return f"Invalid branch name: '{self.branch_name}'."
    
    
class MergeException(Exception):
    def __str__(self) -> str:
        return "Merge exception, no changes."
    