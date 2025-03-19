import psycopg2 as pg
from dotenv import load_dotenv
import os

load_dotenv()

database=os.getenv("DATABASE")
user=os.getenv("USER")
password=os.getenv("PG_PASSWORD")
host=os.getenv("HOST")
port=os.getenv("PORT")

def openConn():
    conn = pg.connect(database=database, user=user, password=password, host=host, port=port)
    return conn

def closeConn(cursor, conn):
    cursor.close()
    conn.commit()
    if conn is not None:
        conn.close()

def select(query, cursor):
    cursor.execute(query)
    result = cursor.fetchall()
    return result

def useSelect(query):
    conn = openConn()
    cursor = conn.cursor()
    result = select(query, cursor)
    closeConn(cursor, conn)
    return result

def create(query, cursor):
    cursor.execute(query)

def useCreate(query):
    conn = openConn()
    cursor = conn.cursor()
    create(query, cursor)
    closeConn(cursor, conn)

def insert(query, cursor):
    cursor.execute(query)

def useInsert(query):
    conn = openConn()
    cursor = conn.cursor()
    insert(query, cursor)
    closeConn(cursor, conn)

SELECT = "SELECT"
CREATE = "CREATE"
INSERT = "INSERT"
COLUMN = "COLUMN"
NAME = "NAME"

schema = "metrics"
everything = "*"
tablename = "test8"
createvalues="(NAME TEXT PRIMARY KEY NOT NULL, ID INT NOT NULL)"
insertvalues="('ram', 1)"
selectvalues="WHERE (conditions)"

def queryBuilder(queryType=NAME, schemaName=schema, tableName=tablename, values=insertvalues, selector=everything):
    if queryType == SELECT:
        return "SELECT " + selector + " FROM " + schemaName + "." + tableName + ";"
    if queryType == CREATE:
        return "CREATE TABLE " + schemaName + "." + tableName + " " + values + ";"
    if queryType == INSERT:
        return "INSERT INTO " + schemaName + "." + tableName + " VALUES " + values + ";"
    if queryType == COLUMN:
        return """SELECT column_name, data_type FROM information_schema.columns 
        WHERE table_schema='""" + schemaName + """' and table_name='""" + tableName + """';
        """
    return "SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema = '" + schemaName + "';"

def useName(schemaName):
    tablenamequery = queryBuilder(NAME, schemaName)
    return useSelect(tablenamequery)

def useColumn(schemaName, tableName):
    columnnamequery = queryBuilder(COLUMN, schemaName, tableName)
    return useSelect(columnnamequery)

#query1 = queryBuilder(SELECT, schema, "test3")
#result = useSelect(query1)
#print(result)

#query2 = queryBuilder(CREATE, schema, tablename, createvalues)
#useCreate(query2)

#query3 = queryBuilder(INSERT, schema, tablename, insertvalues)
#useInsert(query3)

#query4 = queryBuilder(SELECT, schema, tablename, selector=everything)
#result2 = useSelect(query4)
#print(result2)

#print("TABLENAMES")
#result3 = useName(schema)
#print(result3)

#print("\n\nTABLES INFO COLUMNS")
#result4 = useColumn("information_schema", "tables")
#print(result4)

#print("\n\nTABLES COLUMNS INFO")
#result5 = useColumn("information_schema", "columns")
#print(result5)

#print("\n\ntest3 TABLE COLUMNS INFO")
#result6 = useColumn("metrics", "test3")
#print(result6)

idname="idname"

def selectdata(data):
    if data["queryname"] == "TABLENAMES":
        return {"tablenames": useName(schema)}
    if data["queryname"] == "TABLESINFO":
        return  {"tablesinfo": useColumn("information_schema", "tables")}
    if data["queryname"] == "COLUMNSINFO":
        return {"columnsinfo": useColumn("information_schema", "columns")}
    if data["queryname"] == "DESCRIPTION":
        tablename = data["tablename"]
        return {tablename: {"description": useColumn(schema, tablename), "datatype": "tabledata"}}
    if data["queryname"] == "VALUES":
        tablename = data["tablename"]
        examplequery = queryBuilder(SELECT, schema, tablename, selector=everything)
        return {tablename: {"values": useSelect(examplequery), "datatype": "tabledata"}}
    return {"message": "Unable to recognize queryname:" + data["queryname"]}

def execute(data):
    if data[idname]=="SELECT":
        return selectdata(data)
    if data[idname]=="CREATE":
        return {"message": "Create dummy"}
    if data[idname]=="INSERT":
        return {"message": "Insert dummy"}
    return {"message": "Unable to recognize idname:" + data[idname]}

