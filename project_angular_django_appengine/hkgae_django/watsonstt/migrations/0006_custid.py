# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-26 01:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('watsonstt', '0005_sound'),
    ]

    operations = [
        migrations.CreateModel(
            name='Custid',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('custID', models.CharField(max_length=200)),
            ],
        ),
    ]
