from django.contrib import admin
from embed_video.admin import AdminVideoMixin
from wows_mods_site.models import MLModification, MLFileInfo, MLImage, MLGameVersion, MLVideo


class MLFileInfoAdmin(admin.ModelAdmin):
    list_display = ('pk', 'ml_title', 'ml_modification', 'ml_created_by')
    search_fields = ('ml_title', 'pk')

admin.site.register(MLFileInfo, MLFileInfoAdmin)


class MLModificationAdmin(admin.ModelAdmin):
    list_display = ('pk', 'ml_name', 'ml_short_description', 'ml_created_by')
    search_fields = ('ml_name', 'pk')

admin.site.register(MLModification, MLModificationAdmin)


class MLMGameVersionAdmin(admin.ModelAdmin):
    list_display = ('pk', 'ml_title',)
    search_fields = ('ml_title', 'pk')

admin.site.register(MLGameVersion, MLMGameVersionAdmin)


class MLVideoAdmin(AdminVideoMixin, admin.ModelAdmin):
    pass

admin.site.register(MLVideo, MLVideoAdmin)

admin.site.register(MLImage)
