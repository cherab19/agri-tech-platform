import os
import sys
# Ensure project package is importable (add project root to sys.path)
sys.path.insert(0, r'C:/agri-tech-platform/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
import django
django.setup()
from django.urls import get_resolver
res = get_resolver(None)
print('djdt in namespaces:', 'djdt' in getattr(res, 'namespace_dict', {}))
print('Registered namespaces:', list(getattr(res, 'namespace_dict', {}).keys())[:20])
