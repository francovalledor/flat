from django.db import models

class PR_statuses(models.TextChoices):
    OPEN = 'OPEN'
    CLOSED = 'CLOSED'
    MERGED = 'MERGED'

class PullRequest(models.Model):

    source = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    message = models.TextField(default="")

    status = models.CharField(
            choices=PR_statuses.choices,
            default=PR_statuses.OPEN,
            max_length=6
        )

    author_name = models.CharField(max_length=255)
    author_email = models.CharField(max_length=255)
    