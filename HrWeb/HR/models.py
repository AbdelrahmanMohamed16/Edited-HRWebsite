from django.db import models
class Employee(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    id = models.CharField(max_length=20,primary_key = 'True')
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    approved_vacation = models.IntegerField()
    available_vacation = models.IntegerField()
    salary = models.DecimalField(max_digits=15, decimal_places=2)
    dob = models.DateField()
    gender = models.CharField(max_length=10)
    martial_status = models.CharField(max_length=20)
    def __str__(self):
        return self.name
# Create your models here.

class Vacations(models.Model):
    vacID = models.CharField(max_length=255)
    start = models.DateField()
    end = models.DateField()
    reason = models.TextField(max_length=255)
    def __str__(self):
        return self.vacID
