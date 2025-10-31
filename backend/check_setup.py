#!/usr/bin/env python
import os
import sys
import django
from django.conf import settings

def check_environment():
    """Check if the environment is properly set up"""
    
    print("Checking environment setup...")
    
    # Check if we're in a virtual environment
    if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print("✓ Virtual environment detected")
    else:
        print("✗ Not in a virtual environment")
        return False
    
    # Check if Django settings can be loaded
    try:
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'agar_agritech.settings.development')
        django.setup()
        print("✓ Django settings loaded successfully")
    except Exception as e:
        print(f"✗ Failed to load Django settings: {e}")
        return False
    
    # Check database configuration
    try:
        from django.db import connection
        connection.ensure_connection()
        print("✓ Database connection successful")
    except Exception as e:
        print(f"✗ Database connection failed: {e}")
        return False
    
    # Check required environment variables
    required_vars = ['SECRET_KEY']
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        print(f"✗ Missing environment variables: {', '.join(missing_vars)}")
        return False
    else:
        print("✓ All required environment variables are set")
    
    print("Environment setup check completed successfully!")
    return True

if __name__ == '__main__':
    check_environment()