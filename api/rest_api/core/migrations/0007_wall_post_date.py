# Generated by Django 2.1.4 on 2018-12-14 02:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20181214_0218'),
    ]

    operations = [
        migrations.AddField(
            model_name='wall',
            name='post_date',
            field=models.DateTimeField(null=True),
        ),
    ]
