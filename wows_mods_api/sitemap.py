from django.contrib.sitemaps import Sitemap
from wows_mods_site.models import MLModification


class ModificationsSitemap(Sitemap):
    """
        Sitemap generator for modifications.
    """
    changefreq = "never"
    priority = 0.7

    def items(self):
        return MLModification.objects.filter(ml_visible=True)

    def lastmod(self, obj):
        return obj.ml_updated_at
