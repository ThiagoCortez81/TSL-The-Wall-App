from rest_framework import serializers
from core.models import Wall
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_jwt.settings import api_settings

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class UserSerializerWithPassword(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']
    def validate_password(self, value: str) -> str :
        return make_password(value)

class WallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wall
        ordering = ('post_date',)
        fields = '__all__'

    #search the content of FK only when need visual representation of the data
    def to_representation(self, instance):
        self.fields['user'] = UserSerializer()
        return super(WallSerializer, self).to_representation(instance)

# JWT
class JWTUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'first_name', 'last_name', 'email')