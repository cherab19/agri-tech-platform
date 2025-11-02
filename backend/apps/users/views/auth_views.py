from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView as SimpleTokenRefreshView
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import login, logout

from apps.users.models import CustomUser
from apps.users.serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    PasswordChangeSerializer,
)
from apps.common.utils.helpers import get_client_ip


class UserRegistrationView(APIView):
    """View for user registration"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            
            response_data = {
                'message': _('User registered successfully.'),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'user_type': user.user_type,
                    'phone_number': user.phone_number,
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }
            
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    """View for user login"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserLoginSerializer(
            data=request.data,
            context={'request': request}
        )
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            
            # Update admin profile if user is admin
            if user.user_type == 'ADMIN':
                admin_profile = user.get_profile()
                if admin_profile:
                    admin_profile.last_login_ip = get_client_ip(request)
                    admin_profile.login_count += 1
                    admin_profile.save()
            
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            
            # Login user (for session authentication if needed)
            login(request, user)
            
            response_data = {
                'message': _('Login successful.'),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'user_type': user.user_type,
                    'phone_number': user.phone_number,
                    'language_preference': user.language_preference,
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
        
        # Map serializer errors to clearer client-friendly responses
        errors = serializer.errors

        # Handle non-field errors (common for auth failures)
        non_field = errors.get('non_field_errors') or errors.get('__all__')
        if non_field:
            # non_field may be a list of messages
            message = non_field[0] if isinstance(non_field, (list, tuple)) and non_field else str(non_field)

            # Map common backend messages to consistent client codes/messages
            msg_lower = message.lower()
            if 'unable to log in' in msg_lower or 'invalid credentials' in msg_lower:
                return Response(
                    {'code': 'invalid_credentials', 'message': _('Invalid username or password.')},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            if 'disabled' in msg_lower or 'disabled.' in msg_lower:
                return Response(
                    {'code': 'account_disabled', 'message': _('User account is disabled.')},
                    status=status.HTTP_403_FORBIDDEN
                )
            if 'user type' in msg_lower or 'invalid user type' in msg_lower:
                return Response(
                    {'code': 'invalid_user_type', 'message': _('Invalid user type for this account.')},
                    status=status.HTTP_403_FORBIDDEN
                )

            # Generic fallback for non-field errors
            return Response({'code': 'authentication_failed', 'message': message}, status=status.HTTP_401_UNAUTHORIZED)

        # Field-specific errors (e.g., missing username/password)
        # Convert serializer field errors to a simple map for client consumption
        if isinstance(errors, dict):
            field_errors = {k: v[0] if isinstance(v, (list, tuple)) and v else str(v) for k, v in errors.items()}
            return Response({'code': 'validation_error', 'errors': field_errors}, status=status.HTTP_400_BAD_REQUEST)

        # Fallback generic response
        return Response({'code': 'authentication_failed', 'message': _('Login failed.')}, status=status.HTTP_401_UNAUTHORIZED)


class UserLogoutView(APIView):
    """View for user logout"""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        try:
            # Blacklist refresh token
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            
            # Logout user
            logout(request)
            
            return Response(
                {'message': _('Logout successful.')},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': _('Logout failed.')},
                status=status.HTTP_400_BAD_REQUEST
            )


class PasswordChangeView(APIView):
    """View for changing user password"""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = PasswordChangeSerializer(
            data=request.data,
            context={'request': request}
        )
        
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': _('Password changed successfully.')},
                status=status.HTTP_200_OK
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TokenRefreshView(SimpleTokenRefreshView):
    """Custom token refresh view with additional logging"""
    pass