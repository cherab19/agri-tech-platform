import sqlite3, os, sys
p = r'C:/agri-tech-platform/backend/db.sqlite3'
print('DB path:', p)
if not os.path.exists(p):
    print('No DB file at', p)
    sys.exit(0)
con = sqlite3.connect(p)
cur = con.cursor()
try:
    cur.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
    rows = [r[0] for r in cur.fetchall()]
    print('Tables in DB (total {}):'.format(len(rows)))
    for t in rows:
        print(' -', t)
    targets = ['users', 'admin_profiles', 'farmer_profiles', 'vendor_profiles', 'driver_profiles']
    print('\nPresence check:')
    for t in targets:
        print(f"{t}:", 'FOUND' if t in rows else 'MISSING')
except Exception as e:
    print('Error querying sqlite_master:', e)
finally:
    con.close()
