# Generated by Django 4.2.1 on 2023-06-08 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('HR', '0008_alter_employee_address_alter_employee_adminid'),
    ]

    operations = [
        migrations.AddField(
            model_name='admin',
            name='password',
            field=models.CharField(default=0, max_length=20),
            preserve_default=False,
        ),
    ]
