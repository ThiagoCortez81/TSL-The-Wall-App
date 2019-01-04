from django.db import models
from django.contrib.auth.models import User

class Wall(models.Model):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post_date = models.DateTimeField(null = True)

    def __str__(self):
        return self.content