from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
# from rest_framework_jwt.serializers import JSONWebTokenSerializer
# from rest_framework_jwt.views import ObtainJSONWebToken
from django.contrib.auth.models import User



from .serializer import *

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.username
        # ...

        return token


# Create your views here.


# class LoginView(ObtainJSONWebToken):
#     serializer_class = JSONWebTokenSerializer
   
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home(request):
    return Response({'message':'Homepage'})

@api_view(['POST'])
def user_signup(request):
    
    if request.method == 'POST':
        print(request.data)
        serializer_data = UserSerializer(data = request.data)
        
        # print(serializer_data.is_valid(),request.data['username'])
        # try:
        #     User.objects.filter(username=request.data['username'])
        # except:
        #     return Response({'error':'Already in use'},status=200)
        if User.objects.filter(username=request.data['username']).exists():
             return Response({'error':'Already in use'}, status=200)
        if serializer_data.is_valid():
            serializer_data.save()
            return Response(serializer_data.data, status=201)
    
    return Response(serializer_data.errors, status=400)

@api_view(['post'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        print('in',request.data['refresh_token'])
        refresh_token = request.data['refresh_token']
        token = RefreshToken(refresh_token)
        print('pass token')
        print(token)
        try:
            token.blacklist()
        except Exception as e:
            print('e',e)
        
        print('bla')
        # print(token.blacklist())
        return Response({'message': 'Successfully logged out'})
        
    except Exception as e:
        return Response({'error': "Invalid token or token doesn't exists"})
        


