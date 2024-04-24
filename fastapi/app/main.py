import json
from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, text, inspect, Column
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.automap import automap_base
from datetime import datetime, timedelta
from geoalchemy2 import Geometry, WKTElement
from shapely.wkt import loads


DATABASE_URL = "mysql+mysqlconnector://root:supersecretpassw0rd@mysql/sakila"

app = FastAPI()

def to_dict(automap, obj):
    d = {}
    if obj is None:
        return {}  
    elif isinstance(obj, list):
        d = [to_dict(automap, o) for o in obj]
    elif isinstance(obj, automap.classes.address):
        if obj.location is not None:
            # Check if location data is in WKT format
            try:
                geom = loads(str(obj.location.data))
                d['location'] = {"type": "Point", "coordinates": [geom.x, geom.y]}
            except:
                # Handle the case where location data is not in WKT format
                # You may need to replace this with actual code to convert location data to WKT format
                d['location'] = {"type": "Point", "coordinates": ["", ""]}
        else:
            d['location'] = {"type": "Point", "coordinates": ["", ""]}
    else:
        d = obj.__dict__.copy()
        d.pop('_sa_instance_state', None)
    return d



@app.get("/")
async def root():
    return {"message": "Howdy"}


@app.get("/getCanadianCustomers")
def getCanadianCustomers():
    engine = create_engine(DATABASE_URL)
    automap = automap_base()
    automap.prepare(engine, reflect=True)

    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = SessionLocal()
    try:
        result = session.execute(text("""
            SELECT customer.first_name, customer.last_name, customer.email, city.city
            FROM customer
            JOIN address ON customer.address_id = address.address_id
            JOIN city ON address.city_id = city.city_id
            JOIN country ON city.country_id = country.country_id
            WHERE country.country = 'Canada'
            ORDER BY city.city
        """))
        customers = [{"first_name": row[0], "last_name": row[1], "email": row[2], "city": row[3]} for row in result]
        return customers
    finally:
        session.close()
    
@app.post("/addCustomer")
def addCustomer(customer: dict, address: dict, city: dict, country: dict):
    engine = create_engine(DATABASE_URL)
    automap = automap_base()
    automap.prepare(engine, reflect=True)
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = SessionLocal()
    customer = automap.classes.Customer(**customer)
    address = automap.classes.Address(**customer["address"])
    store = automap.classes.Store(store_id=1)
    customer.store_id = store.store_id
    session.add(customer)
    session.commit()
    session.refresh(customer)
    customerjson = customer.__dict__
    
    return customerjson


    
@app.post("/rentVideos")
def rent_videos(data: dict):
    engine = create_engine(DATABASE_URL)
    automap = automap_base()
    automap.prepare(engine, reflect=True)
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = SessionLocal()
    rental = automap.classes.Rental()
    store = automap.classes.Store()
    rental.customer_id = data["customer_id"]
    rental.inventory_id = data["inventory_id"]
    rental.rental_date = datetime.now() 
    rental.return_date = datetime.now() + timedelta(days=5)
    store.id = 1
    rental.staff_id = 1
    session.add(rental)
    session.commit()
    session.refresh(rental)
    rentaljson = rental.__dict__
    
    return rentaljson
    
@app.get('/checkVideoAvailability/${storeid}/${id}')
def checkVideoAvailability(storeid: int, id: int):
    engine = create_engine(DATABASE_URL)
    automap = automap_base()
    automap.prepare(engine, reflect=True)
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = SessionLocal()
    result = session.execute(text("""
        SELECT inventory.inventory_id, film.title
        FROM inventory
        JOIN film ON inventory.film_id = film.film_id
        JOIN store ON inventory.store_id = store.store_id
        WHERE film_id = :film_id 
        AND store.store_id = :store_id
        AND inventory_id NOT IN (
            SELECT inventory_id
            FROM rental
            WHERE return_date IS NULL
        )
    """), {"film_id": id, "store_id": storeid})
    inventory = [row[0] for row in result]
    return inventory


  
@app.get('/getCustomerbyEmail/{email}')
def getCustomerbyEmail(email: str):
    store_id = 1
    engine = create_engine(DATABASE_URL)
    automap = automap_base()
    automap.prepare(engine, reflect=True)
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = SessionLocal()
    # find the customer with the email and store_id
    customer = session.query(automap.classes.customer).filter(automap.classes.customer.email == email, automap.classes.customer.store_id == store_id).first()    

    if customer is not None:
        # need to fill in the customer object with the address
        address = session.query(automap.classes.address).filter(automap.classes.address.address_id == customer.address_id).first()            
        city = session.query(automap.classes.city).filter(automap.classes.city.city_id == address.city_id).first()
        country = session.query(automap.classes.country).filter(automap.classes.country.country_id == city.country_id).first()
        print(f'customer: {to_dict(automap, customer)}, address: {to_dict(automap, address)}, city: {to_dict(automap, city)}, country: {to_dict(automap, country)}')
        return {
            "newcustomer": "false",
            "customer": to_dict( automap,  customer),
            "address": to_dict( automap,  address),
            "city": to_dict( automap,  city),
            "country": to_dict( automap,  country),
            "cities": "",
            "countries": ""
        }

    else:
        # create a new customer object to return with all the fields
        newcustomer = automap.classes.customer(email=email, store_id=store_id)
        newaddress = automap.classes.address()
        cities = session.query(automap.classes.city).all()
        countries = session.query(automap.classes.country).all()
        print(f'customer: {to_dict(automap, newcustomer)}, address: {to_dict(automap, newaddress)}, cities: {to_dict(automap, cities)}, countries: {to_dict(automap, countries)}')

        return {
            "newcustomer": "true",
            "customer":  to_dict( automap,  newcustomer), 
            "address": to_dict( automap,  newaddress), 
            "city": "",
            "country": "",
            "cities": to_dict( automap,  cities),
            "countries": to_dict( automap,  countries)
        }

  
        