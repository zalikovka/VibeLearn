from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserSerializer,
    ChangePasswordSerializer
)


class RegisterView(generics.CreateAPIView):
    """
    API endpoint for user registration
    """
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response({
            'message': 'User registered successfully',
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """
    API endpoint for user login
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )

        if user is None:
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)

        login(request, user)
        
        return Response({
            'message': 'Login successful',
            'user': UserSerializer(user).data
        })


class LogoutView(APIView):
    """
    API endpoint for user logout
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({
            'message': 'Logged out successfully'
        })


class ProfileView(generics.RetrieveUpdateAPIView):
    """
    API endpoint for user profile (get and update)
    """
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(APIView):
    """
    API endpoint for password change
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        
        if not user.check_password(serializer.validated_data['old_password']):
            return Response({
                'error': 'Invalid old password'
            }, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(serializer.validated_data['new_password'])
        user.save()

        return Response({
            'message': 'Password changed successfully'
        })


@api_view(['GET'])
@permission_classes([AllowAny])
def check_auth(request):
    """
    Check if user is authenticated
    """
    if request.user.is_authenticated:
        return Response({
            'authenticated': True,
            'user': UserSerializer(request.user).data
        })
    return Response({
        'authenticated': False
    })
