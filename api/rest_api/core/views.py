from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.template.loader import render_to_string
from django.core.mail import send_mail
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, WallSerializer, JWTUserSerializer, UserSerializerWithToken, UserSerializerWithPassword
from .models import User, Wall
from rest_framework.permissions import AllowAny
from rest_framework import HTTP_HEADER_ENCODING

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserPasswordViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializerWithPassword

class WallViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)

    queryset = Wall.objects.all().order_by('-post_date')
    serializer_class = WallSerializer

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = JWTUserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            email_user(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def email_user(request):
    msg_html = render_to_string('../templates/email.html', {'name': request['first_name']})
    template_email_text = ''
    print(send_mail('Welcome to the Wall APP', template_email_text, 'thiago.cortez81@gmail.com', ['Thiago Cortez', request['email']], html_message=msg_html, fail_silently=False))
    return True