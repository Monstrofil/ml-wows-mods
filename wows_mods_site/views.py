from django.shortcuts import render
from wows_mods_site.models import MLGameVersion


def angular_application(request, *args, **kwargs):
    """
        This view is binded to all accessible urls, because angularJS manages routing.
    """
    return render(request, "ml_wows_mods/ml_base.html", {'versions': MLGameVersion.objects.all()})
