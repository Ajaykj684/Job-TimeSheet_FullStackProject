from django.contrib import admin
from newapp.models import Account,DailyTask



class AccountAdmin(admin.ModelAdmin):
    pass

admin.site.register(Account,AccountAdmin)
admin.site.register(DailyTask)
