from rest_framework import serializers 
# from django.db.models import fields
from django.contrib.auth.models import User

from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'email', 'password']
        extra_kwargs = {
            'password':{
                "write_only":True,
                "required":True,
            }
        }
    def create(self, validated_data):
        password = validated_data.pop('password',None)
        
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
    # def create(self, validated_data):
    #     user = User.objects.create_user(
    #         email=validated_data['email'],
    #         username=validated_data['username'],
    #         first_name=validated_data['first_name'],
    #         password=validated_data['password']
    #     )
    #     return user
