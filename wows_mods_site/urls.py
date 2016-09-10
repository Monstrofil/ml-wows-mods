"""
    List of available urls.
"""
from wows_mods_site.views import angular_application
from django.conf.urls import url


urlpatterns = [
    url(r'^$', angular_application),
    url(r'^modification/(?P<id>\w+)/$', angular_application, name='index_modification'),
]
