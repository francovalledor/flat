from __future__ import annotations

from git import Commit as RepoCommit

class Commit:
    def __init__(self, repo_commit: RepoCommit) -> None:
        self.__commit = repo_commit

    @property
    def author(self):
        name = self.__commit.author.name
        email = self.__commit.author.email

        return Author(name, email)

    @property
    def hash(self):
        return self.__commit.hexsha

    @property
    def message(self):
        return self.__commit.message.strip()

    @property
    def datetime(self):
        return self.__commit.authored_datetime

    @property
    def affected_files(self):
        return self.__commit.stats.files
    
    @property
    def total_changes(self):
        return self.__commit.stats.total

    def is_newer_than(self, other: Commit) -> bool:
        return self.datetime > other.datetime
    
    def __str__(self) -> str:
        return f"\nMessage: {self.message}\nAuthor: {self.author.name} - {self.author.email}\nDate: {self.datetime}\nHash: {self.hash}\n"
    
    def __repr__(self) -> str:
        return self.__str__()


class Author:
    def __init__(self, name, email) -> None:
        self.name = name
        self.email = email