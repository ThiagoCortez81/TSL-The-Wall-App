# Generated by Django 2.1.4 on 2018-12-14 01:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='stats',
            field=models.IntegerField(default=0),
        ),
    ]
