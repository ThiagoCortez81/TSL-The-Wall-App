# Generated by Django 2.1.4 on 2018-12-14 02:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_auto_20181214_0200'),
    ]

    operations = [
        migrations.RenameField(
            model_name='wall',
            old_name='usr_id',
            new_name='user',
        ),
    ]
