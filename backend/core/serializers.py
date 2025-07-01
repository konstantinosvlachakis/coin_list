from rest_framework import serializers
from .models import Alarm


class AlarmSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Alarm
        fields = ['id', 'time_triggered', "date_triggered"]  # Specify the fields you want to include in the serialized output

    def create(self, validated_data):
        """
        Create and return a new Alarm instance, given the validated data.
        """
        return Alarm.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing Alarm instance, given the validated data.
        """
        instance.time_triggered = validated_data.get('time_triggered', instance.time_triggered)
        instance.save()
        return instance
    
    def delete(self, instance):
        """
        Delete the Alarm instance.
        """
        instance.delete()
        return instance
