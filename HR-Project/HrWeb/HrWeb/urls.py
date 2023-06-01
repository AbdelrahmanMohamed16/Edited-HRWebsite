

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('HR.urls')),
    path('', include('HR.urls')),
]
