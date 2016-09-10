from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import list_route

from wows_mods_api.permissions import IsOwnerOrReadOnly
from wows_mods_api.serializers import MLModificationSerializerGET, MLModificationSerializerSET, MLFileUploadSerializer, \
    MLVideoSerializer, MLImageSerializer
from wows_mods_site.models import MLModification, MLFileInfo, MLVideo, MLImage


class MLModificationViewSet(viewsets.ModelViewSet):  # FIXME: delete -> hide
    """
        Modification view.

        Allows to create, edit and remove modification.
    """
    queryset = MLModification.objects.filter(ml_visible=True)
    serializer_class = MLModificationSerializerSET
    permission_classes = (IsOwnerOrReadOnly, )

    serializer_action_classes = {
        'list': MLModificationSerializerGET,
        'retrieve': MLModificationSerializerGET,
    }

    def get_serializer_class(self):
        """
        Look for serializer class in self.serializer_action_classes, which
        should be a dict mapping action name (key) to serializer class (value),
        i.e.:

        class MyViewSet(MultiSerializerViewSetMixin, ViewSet):
            serializer_class = MyDefaultSerializer
            serializer_action_classes = {
               'list': MyListSerializer,
               'my_action': MyActionSerializer,
            }

            @action
            def my_action:
                ...

        If there's no entry for that action then just fallback to the regular
        get_serializer_class lookup: self.serializer_class, DefaultSerializer.

        Thanks gonz: http://stackoverflow.com/a/22922156/11440

        """
        try:
            return self.serializer_action_classes[self.action]
        except (KeyError, AttributeError):
            return super(MLModificationViewSet, self).get_serializer_class()

    def perform_create(self, serializer):
        serializer.save(ml_created_by=self.request.user)


class MLFileViewSet(viewsets.ModelViewSet):
    """
        File view. Allows to create, edit and delete files.

        Modification id needed to create file, then only modification owner can remove files.
    """
    queryset = MLFileInfo.objects.all()
    serializer_class = MLFileUploadSerializer
    permission_classes = (IsOwnerOrReadOnly, )

    def perform_create(self, serializer):
        serializer.save(ml_created_by=self.request.user)


class MLVideoViewSet(viewsets.ModelViewSet):
    """
        Video view. Allows to create, edit and delete videos.

        Modification id needed to create video.
    """
    queryset = MLVideo.objects.all()
    serializer_class = MLVideoSerializer
    #permission_classes = (IsOwnerOrReadOnly, ) TODO: permissions


class MLImageViewSet(viewsets.ModelViewSet):
    """
        Image methods. Allows to create, edit and delete images.

        Modification id needed to create video.
    """
    queryset = MLImage.objects.all()
    serializer_class = MLImageSerializer
    #permission_classes = (IsOwnerOrReadOnly, ) TODO: permissions
