from django.db import models
import datetime
import unicodedata
import re

def remove_accents(input_str):
    nfkd_form = unicodedata.normalize('NFKD', input_str)
    return u"".join([c for c in nfkd_form if not unicodedata.combining(c)])

def path_and_rename(instance, filename):
    newfilename = remove_accents(filename)
    newfilename = re.sub(r"\s+", '_', newfilename)
    now = datetime.datetime.now()
    path = 'storage/{0}-{1}-{2}-{3}-{4}-{5}'.format(now.year, now.month, now.day, instance.name, instance.firstname, newfilename)
    return path

# Create your models here.
class Demand(models.Model): 
    name= models.CharField(max_length=50)
    firstname= models.CharField(max_length=50)
    phoneNumber= models.CharField(max_length=50)
    building= models.CharField(max_length=50)
    filename= models.CharField(max_length=50, blank=True)
    email= models.CharField(max_length=60)
    file= models.FileField(upload_to=path_and_rename)
    minimumDate= models.DateField(max_length=50)
    height= models.FloatField(max_length=50)
    width= models.FloatField(max_length=50)
    comment= models.CharField(max_length=500, blank=True)

    def __str__(self):
        return "name : {0}, firstname: {1}".format(self.name, self.firstname)
    