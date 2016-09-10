from rest_framework import serializers
from wows_mods_site.models import MLModification, MLGameVersion, MLVideo, MLImage, MLFileInfo


class MLFileInfoSerializer(serializers.ModelSerializer):
    """
        Generic file info serializer.
    """
    class Meta:
        model = MLFileInfo
        fields = ('ml_file', 'ml_title', 'ml_size', 'id')


class MLFileUploadSerializer(serializers.ModelSerializer):
    """
        Serializer used ONLY to CREATE files.
    """
    class Meta:
        model = MLFileInfo


class MLVideoSerializer(serializers.ModelSerializer):
    """
        Generic video serializer (read && write).
    """
    class Meta:
        model = MLVideo
        fields = ('id', 'ml_video', 'hq_thumbnail', 'max_thumbnail', 'ml_code', 'ml_modification')


class MLImageSerializer(serializers.ModelSerializer):
    """
        Generic image serializer (read && write).
    """
    class Meta:
        model = MLImage
        fields = ('id', 'ml_image', 'ml_modification')


class MLGameVersionSerializer(serializers.ModelSerializer):
    """
        Generic game version serializer (read && write).
    """
    class Meta:
        model = MLGameVersion


class MLModificationSerializerGET(serializers.ModelSerializer):
    """
        Modification serializer used to GET modification info.
    """
    ml_files = MLFileInfoSerializer(many=True)
    ml_screenshots = MLImageSerializer(many=True)
    ml_videos = MLVideoSerializer(many=True)
    ml_url = serializers.CharField()
    ml_game_version_title = serializers.StringRelatedField(source='ml_game_version')

    class Meta:
        model = MLModification


class MLModificationSerializerSET(serializers.ModelSerializer):
    """
        Modification serializer used to WRITE modification info.
    """
    class Meta:
        model = MLModification
