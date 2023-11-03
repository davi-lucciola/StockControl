import os
from tinydb import TinyDB
from tinydb.database import Table, Document


DB_PATH= os.path.join(os.getcwd(), 'db.json')
db = TinyDB(DB_PATH, indent=4)
