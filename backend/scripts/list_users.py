import sqlite3, os, sys
p = r'C:/agri-tech-platform/backend/db.sqlite3'
if not os.path.exists(p):
    print('No DB at', p); sys.exit(0)
con = sqlite3.connect(p)
cur = con.cursor()
try:
    cur.execute("SELECT id, username, phone_number, email FROM users")
    rows = cur.fetchall()
    if not rows:
        print('No users found')
    else:
        for r in rows:
            print(r)
except Exception as e:
    print('Error querying users:', e)
finally:
    con.close()
