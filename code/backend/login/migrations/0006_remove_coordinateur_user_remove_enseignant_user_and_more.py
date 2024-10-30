# Generated by Django 4.2.16 on 2024-10-08 21:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0005_rename_nom_entreprise_entreprise_nom_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coordinateur',
            name='user',
        ),
        migrations.RemoveField(
            model_name='enseignant',
            name='user',
        ),
        migrations.RemoveField(
            model_name='entreprise',
            name='user',
        ),
        migrations.DeleteModel(
            name='Apprenti',
        ),
        migrations.DeleteModel(
            name='Coordinateur',
        ),
        migrations.DeleteModel(
            name='Enseignant',
        ),
        migrations.DeleteModel(
            name='Entreprise',
        ),
        migrations.DeleteModel(
            name='Formation',
        ),
    ]