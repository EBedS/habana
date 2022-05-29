# Generated by Django 4.0.4 on 2022-05-29 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usermodel',
            name='hard_score',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='usermodel',
            name='is_admin',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='usermodel',
            name='soft_score',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
