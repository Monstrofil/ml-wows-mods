from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse
from django.db import models
from imagekit.models import ProcessedImageField
from pilkit.processors import AddBorder, Thumbnail

from embed_video.backends import detect_backend
from embed_video.fields import EmbedVideoField


class MLGameVersion(models.Model): # TODO: auto-update version from WGAPI
    """
        World of Warhships version table.
    """
    ml_title = models.CharField(max_length=20, help_text='Game version')

    def __unicode__(self):
        return self.ml_title


class MLModification(models.Model):
    """
        Main table with modification info.

        Since only admin allowed to add modification,
        there's no validation for count of files, images, videos etc...
    """
    ml_name = models.CharField(max_length=255, help_text='Type modification name here', verbose_name='Name')
    ml_description = models.TextField(help_text='Description', verbose_name='Description')
    ml_installation = models.TextField(help_text='Install description', verbose_name='Description how to install modification')
    ml_short_description = models.CharField(max_length=128, verbose_name='Small description',
                                            help_text='Only 128 characters allowed')
    ml_preview = ProcessedImageField(upload_to='modification/previews',
                                     processors=[Thumbnail(594), AddBorder(2)],
                                     format='PNG',
                                     options={'quality': 100})

    ml_game_version = models.ForeignKey(MLGameVersion, verbose_name='Game version', help_text='Select game version')

    ml_created_by = models.ForeignKey(settings.AUTH_USER_MODEL, blank=True, help_text='User who uploaded modification')

    ml_visible = models.BooleanField(default=True, help_text='Is modification visible for users')

    ml_created_at = models.DateTimeField(auto_now_add=True, blank=True)
    ml_updated_at = models.DateTimeField(auto_now=True, blank=True)

    @property
    def ml_url(self):
        return reverse('index_modification', kwargs={'id': self.pk})

    @property
    def ml_preview_template(self): # FIXME: remove this
        return "ml_wows_mods/ml_modification/ml_preview/ml_default.html"

    def get_absolute_url(self):
        return self.ml_url

    class Meta:
        ordering = ['-ml_created_at']

    def __unicode__(self):
        return self.ml_name


class MLFileInfo(models.Model):
    """
        Downloadable files for modification.
    """
    ml_title = models.CharField(max_length=255, verbose_name='File title')
    ml_file = models.FileField()

    ml_modification = models.ForeignKey(MLModification, related_name='ml_files')

    ml_created_by = models.ForeignKey(settings.AUTH_USER_MODEL, blank=True)

    @property
    def ml_size(self):
        return self.ml_file.size


class MLImage(models.Model):
    """
        Viewable images for modification.

        While upload, image is being automatically converted to JPEG.
    """
    ml_image = ProcessedImageField(upload_to='modification/images/previews',
                                   processors=[],
                                   format='JPEG',
                                   options={'quality': 100})
    ml_modification = models.ForeignKey(MLModification, related_name='ml_screenshots')


class MLVideo(models.Model):
    """
        Video model.

        Available video hosts: Vimeo, Youtube, SoundCloud.
    """
    ml_video = EmbedVideoField()
    ml_modification = models.ForeignKey(MLModification, related_name='ml_videos')

    @property
    def hq_thumbnail(self):
        my_video = detect_backend(self.ml_video)
        return my_video.hq_thumbnail

    @property
    def max_thumbnail(self):
        my_video = detect_backend(self.ml_video)
        return my_video.max_thumbnail

    @property
    def ml_code(self):
        my_video = detect_backend(self.ml_video)
        return my_video.code

