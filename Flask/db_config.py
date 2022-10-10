from app import app
from flaskext.mysql import MySQL
mysql = MySQL()
# MySQL configurations

# app.config['MYSQL_UNIX_SOCKET'] = '/cloudsql/devashish-jangid:us-central1:flask'
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 123456789
app.config['MYSQL_DATABASE_DB'] = 'flask'
app.config['MYSQL_DATABASE_HOST'] = '35.222.65.29'
mysql.init_app(app) 