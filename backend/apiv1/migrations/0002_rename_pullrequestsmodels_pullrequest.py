# Generated by Django 4.0.6 on 2022-07-10 06:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='PullRequestsModels',
            new_name='PullRequest',
        ),
    ]