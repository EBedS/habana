# Generated by Django 4.0.4 on 2022-05-29 06:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('habanaforms', '0004_rename_habana_form_response_habanaformresponse_habana_form_field_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='habanaformresponse',
            name='value',
            field=models.TextField(default=None),
        ),
    ]
