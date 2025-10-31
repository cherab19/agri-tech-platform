import sqlite3, os
p = r'C:/agri-tech-platform/backend/db.sqlite3'
con = sqlite3.connect(p)
cur = con.cursor()
try:
    cur.execute("UPDATE users SET phone_number = ? WHERE username = ?", ('0000000000','cheru'))
    print('rows updated:', cur.rowcount)
    con.commit()
    cur.execute("SELECT id, username, phone_number FROM users")
    for r in cur.fetchall():
        print(r)
except Exception as e:
    print('Error:', e)
finally:
    con.close()
