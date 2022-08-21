from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
from django.utils import timezone





class MyAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, username, email, phone, password = None):
        if not email:
            raise ValueError("user must have an email address")

        if not username:
            raise ValueError("User must have username")

        user = self.model(
            email = self.normalize_email(email),
            username = username,
            phone=phone,
           
        )
        try:
            user.first_name=first_name
            user.last_name=last_name
        except:
            pass

        user.is_active = True
        user.set_password(password)
        user.save(using= self._db)
        return user   
    
    def create_superuser(self, email, username, phone,password):
        user = self.create_user(
            email = self.normalize_email(email),
            username = username,
            password = password,
            first_name="",
            last_name="",
            
            phone=phone,
        )
        user.is_admin =True
        user.is_active = True
        user.is_staff = True
        user.is_superadmin = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    
    username =  models.CharField(max_length=50 , unique = True)
    email = models.EmailField(max_length=100 , unique=True)
    phone = models.CharField(max_length=50,null = True, blank=True)

    is_admin =  models.BooleanField(default=False)

    USERNAME_FIELD ='email'
    REQUIRED_FIELDS = ['username','phone']

   
    is_admin =  models.BooleanField(default=False)
    is_staff =  models.BooleanField(default=False)
    is_active =  models.BooleanField(default=False)
    is_superadmin =  models.BooleanField(default=False)

    objects = MyAccountManager()
    
    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, add_label):
        return True




class DailyTask(models.Model):
    user = models.ForeignKey(Account,on_delete=models.CASCADE)
    task =  models.TextField()
    time = models.TimeField()
    Date= models.DateField(default=timezone.now)



