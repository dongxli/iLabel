from django.shortcuts import render

from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

class User(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class Registration(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        validated = serializer.is_valid(raise_exception=False)
        user = serializer.save()

        # can't register
        if validated==False:
            return Response({
                "valid": False,
                "user": UserSerializer(user).data,
                "token": AuthToken.objects.create(user)[1],
                "response_message": "Can not register, please change your username or email"
            })
        else:
            return Response({
                "valid": True,
                "user": UserSerializer(user).data,
                "token": AuthToken.objects.create(user)[1],
                "response_message": "Registered"
            })

class Login(generics.GenericAPIView):
    serializer_class = LoginSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        validated = serializer.is_valid(raise_exception=False)

        # if no users are found
        if validated==False:
            return Response({
                "valid": False,
                "user": "",
                "token": "",
                "resposne_message": "User does not exists or wrong credentials"
            })

        user = serializer.validated_data
        return Response({
            "valid": True,
            "user": UserSerializer(user).data,
            "token": AuthToken.objects.create(user)[1],
            "resposne_message": "User found, logging in"
        })
