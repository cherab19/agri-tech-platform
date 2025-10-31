"""Settings package initializer.

This module selects which settings module to import based on the
DJANGO_ENV environment variable. If DJANGO_ENV is not set, it defaults
to the development settings which import from `base.py`.

Usage:
  Set DJANGO_ENV=production for production settings, DJANGO_ENV=testing
  for test settings, or leave unset (development) for local development.
"""
import os

ENV = os.getenv('DJANGO_ENV', 'development').lower()

if ENV == 'production':
	from .production import *  # noqa: F401,F403
elif ENV == 'testing':
	from .testing import *  # noqa: F401,F403
else:
	from .development import *  # noqa: F401,F403

# Expose which env was loaded for debugging/programmatic checks
LOADED_ENV = ENV
