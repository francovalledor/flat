from rest_framework.serializers import DateTimeField, Serializer, DictField, CharField, EmailField


class AuthorSerializer(Serializer):
    name = CharField()
    email = EmailField()

class CommitSerializer(Serializer):
    author = AuthorSerializer(many=False)
    datetime = DateTimeField()
    message = CharField()
    hash = CharField()
    affected_files = DictField()