# Generated by Django 4.2.16 on 2024-10-07 19:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='apprenti',
            name='promotion',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='login.formation'),
        ),
    ]
