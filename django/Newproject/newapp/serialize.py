from dataclasses import field
from rest_framework import serializers
from newapp.models import Account,DailyTask


from rest_framework.serializers import ModelSerializer


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields="__all__"




class DailyTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=DailyTask
        fields="__all__"

