# Generated by Django 2.1.4 on 2018-12-14 01:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_wall'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wall',
            name='usr_id',
            field=models.ForeignKey(db_column='user', on_delete=django.db.models.deletion.CASCADE, to='core.User'),
        ),
    ]
