from __future__ import annotations

from git import Head

from .commit import Commit


class Branch:
    def __init__(self, head: Head) -> None:
        self.__head = head

        primitive_commit = self.__head.commit

        self.__last_commit = Commit(primitive_commit) if primitive_commit else None


    @property
    def name(self):
        return self.__head.name


    @property
    def last_commit(self):
        return self.__last_commit


    def is_more_recently_updated_than(self, other: Branch):
        return self.last_commit.is_newer_than(other.last_commit)


    def __str__(self) -> str:
        return self.name
