import time
import mysql.connector
from mysql.connector import Error

def connect_to_mysql():
    while True:
        try:
            connection = mysql.connector.connect(host='mysql',
                                                 database='database_name',
                                                 user='root',
                                                 password='supersecretpassw0rd')
            if connection.is_connected():
                print('Connected to MySQL database')
                break
        except Error as e:
            print("Error while connecting to MySQL", e)
            time.sleep(1)

if __name__ == '__main__':
    connect_to_mysql()
    