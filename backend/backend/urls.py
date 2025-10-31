from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # API Routes
    path('api/auth/', include('apps.users.urls')),
    path('api/products/', include('apps.products.urls')),
    # Other app routes are disabled in this workspace snapshot. Add them
    # back when the corresponding modules are available.
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)