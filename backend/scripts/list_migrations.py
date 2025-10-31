import sqlite3, os, sys
p = r'C:/agri-tech-platform/backend/db.sqlite3'
print('DB path:', p)
if not os.path.exists(p):
    print('No DB file at', p)
    sys.exit(0)
con = sqlite3.connect(p)
cur = con.cursor()
try:
    cur.execute("SELECT app, name, applied FROM django_migrations ORDER BY applied")
    rows = cur.fetchall()
    if not rows:
        print('No rows in django_migrations')
    for app, name, applied in rows:
        print(app.ljust(20), name)
except Exception as e:
    print('Error querying django_migrations:', e)
finally:
    con.close()
