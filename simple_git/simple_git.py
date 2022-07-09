from git import Repo

class SimpleGit:
    CURRENT_DIRECTORY = '.'

    def __init__(self, path=CURRENT_DIRECTORY) -> None:
        self.__repo = Repo(path)

