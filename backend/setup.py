#!/usr/bin/env python
import os
import sys
import django
from django.core.management import execute_from_command_line

def setup_development():
    """Setup development environment with SQLite"""
    
    print("Setting up Agar Agritech development environment...")
    
    # Set default settings
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'agar_agritech.settings.development')
    
    try:
        # Install dependencies
        print("1. Installing dependencies...")
        os.system('pip install -r requirements/base.txt')
        
        # Make migrations for each app
        print("2. Creating migrations...")
        apps = ['users', 'products', 'orders', 'payments', 'analytics', 'notifications', 'core']
        for app in apps:
            try:
                execute_from_command_line(['manage.py', 'makemigrations', app])
                print(f"   - Created migrations for {app}")
            except Exception as e:
                print(f"   - Warning: Could not create migrations for {app}: {e}")
        
        # Run migrations
        print("3. Running migrations...")
        execute_from_command_line(['manage.py', 'migrate'])
        
        # Create superuser
        print("4. Creating superuser...")
        execute_from_command_line(['manage.py', 'createsuperuser'])
        
        # Seed initial data
        print("5. Seeding initial data...")
        execute_from_command_line(['manage.py', 'seed_data'])
        
        print("\n🎉 Development setup completed successfully!")
        print("\nNext steps:")
        print("1. Run: python manage.py runserver")
        print("2. Open: http://localhost:8000")
        print("3. Admin: http://localhost:8000/admin")
        
    except Exception as e:
        print(f"\n❌ Setup failed: {e}")
        print("\nTroubleshooting:")
        print("1. Make sure you're in the backend directory")
        print("2. Check that all required files exist")
        print("3. Try running commands manually")

if __name__ == '__main__':
    setup_development()