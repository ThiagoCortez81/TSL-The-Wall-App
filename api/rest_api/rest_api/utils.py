from core.models import User
from core.serializers import JWTUserSerializer

def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': JWTUserSerializer(user, context={'request': request}).data
    }