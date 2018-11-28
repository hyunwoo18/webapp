from __future__ import unicode_literals

from django.db import models


# step 1 resource
class Cred(models.Model):
    hkcred = models.CharField(max_length=200)
    hkpawd = models.CharField(max_length=200)
    def __str__(self):
        return self.hkcred

# step 2 resource
class Custid(models.Model):
    custID = models.CharField(max_length=200)
    def __str__(self):
        return self.custID


# step 6 resource
class Tempword(models.Model):
    hkword = models.CharField(max_length=200)
    hkdisp = models.CharField(max_length=200)
    def __str__(self):
        return self.hkword
class Tempsound(models.Model):
    hksoundslike = models.CharField(max_length=200)
    hkwordkey    = models.ForeignKey(Tempword, on_delete=models.CASCADE)
    def __str__(self):
        return self.hksoundslike
###################
# step 9 resource
class Word(models.Model):
    hkword = models.CharField(max_length=200)
    hkdisp = models.CharField(max_length=200)
    def __str__(self):
        return self.hkword
class Sound(models.Model):
    hksoundslike = models.CharField(max_length=200)
    hkwordkey = models.ForeignKey(Word, on_delete=models.CASCADE)
    def __str__(self):
        return self.hksoundslike

