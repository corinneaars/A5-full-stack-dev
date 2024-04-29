import time
from datetime import datetime, timedelta
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.automap import automap_base
from geoalchemy2 import Geometry, WKTElement, functions
from fastapi import FastAPI, Request
from shapely.wkb import loads
from pprint import pprint

DATABASE_URL = "mysql+mysqlconnector://root:supersecretpassw0rd@mysql/sakila"

app = FastAPI()

engine = create_engine(DATABASE_URL, echo=True)
automap = automap_base()
automap.prepare(engine, reflect=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a new type for each automapped class
Customer = automap.classes.customer
Address = automap.classes.address
City = automap.classes.city
Country = automap.classes.country
Rental = automap.classes.rental
Store = automap.classes.store
Inventory = automap.classes.inventory
# Fields and types from each class found in the database
fieldsNtypes = {
    "customer": { "customer_id": "int","first_name": "string", "last_name": "string", "email": "string", "store_id": "int", "address_id": "int", "active": "int", "create_date": "datetime", "last_update": "datetime"},
    "address": { "address_id": "int","address": "string", "address2": "string", "district": "string", "city_id": "int", "postal_code": "string", "phone": "string", "location": {"type":"Point", "longitude": "float", "latitude": "float"}, "last_update": "datetime"},
    "city": { "city_id": "int","city": "string", "country_id": "int", "last_update": "datetime"},
    "country": {"countrys_id": "int", "country": "string", "last_update": "datetime"},
    "rental": { "rental_id": "int", "rental_date": "datetime", "inventory_id": "int", "customer_id": "int", "return_date": "datetime", "staff_id": "int", "last_update": "datetime"},
    "store": { "store_id": "int", "manager_staff_id": "int", "address_id": "int", "last_update": "datetime"},
    "inventory": { "inventory_id": "int", "film_id": "int", "store_id": "int", "last_update": "datetime"},
    "cities": { "city_id": "int", "city": "string", "country_id": "int", "last_update": "datetime"},
    "countries": { "country_id": "int", "country": "string", "last_update": "datetime"}
}   


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
                d['location'] = {"type": "Point", "longitude": geom.x, "latitude": geom.y}
            except:
                # Handle the case where location data is not in WKT format
                # You may need to replace this with actual code to convert location data to WKT format
                d['location'] = {"type": "Point", "longitude": "", "latitude": ""}
        else:
            d['location'] = {"type": "Point", "longitude": "", "latitude": ""}
    else:
        d = obj.__dict__.copy()
        d.pop('_sa_instance_state', None)
    return d

def print_object(obj):
        print({key: value for key, value in obj.__dict__.items() if not key.startswith('_')})

@app.get("/")
async def root():
    return {"message": "Howdy"}


@app.get("/getCanadianCustomers")
def getCanadianCustomers():
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
async def addCustomer(request: Request):
    print(f'   main.py |   post:/addCustomer  |   HELLO! add Customer')
    data = await request.json()
    if 'country_id' in data['country'].keys() and not data['country']['country_id']:
        del data['country']['country_id']
    if 'city_id' in data['city'].keys() and not data['city']['city_id']:
        del data['city']['city_id']
    if 'address_id' in data['address'].keys() and not data['address']['address_id']:
        del data['address']['address_id']
    if 'customer_id' in data['customer'].keys() and not data['customer']['customer_id']:
        del data['customer']['customer_id']
    # Convert from JSON to WKT format WKTElement('POINT(5 45)', srid=4326)
    tmp_long = 0.0
    tmp_lat = 0.0
    point = str(WKTElement(f'POINT({tmp_long} {tmp_lat})', srid=0))
    print(f'   main.py |   post:/addCustomer  |   BASE point: {point}')    
    if 'location' in data['address'].keys():
        if 'longitude' in data['address']['location'].keys():
            if data['address']['location']['longitude']:
                tmp_long = float(data['address']['location']['longitude'])
        if 'latitude' in data['address']['location'].keys():
            if data['address']['location']['latitude']:
                tmp_lat = float(data['address']['location']['latitude'])
        point = str(WKTElement(f"POINT({tmp_long} {tmp_lat})", srid=0))
        print(f'   main.py |   post:/addCustomer  |   FROM FRONTEND point: {point}')    
    data['address']['location'] = point      
    print(f'   main.py |   post:/addCustomer  |   data: {data['address']['location']}')
      
        #point = WKTElement(f"POINT({data['address']['location']['longitude']} {data['address']['location']['latitude']})", srid=4326)
     
    print()
    print()
    print()
    print("   main.py |   post:/addCustomer  |   SETTING DATABASE ")
    customer = Customer(**data['customer'])
    address = Address(**data['address'])
    city = City(**data['city'])
    country = Country(**data['country'])
    # if not address.address_id:
    #     address.address_id = None
    customer.address_id = address.address_id
    address.city_id = city.city_id
    city.country_id = country.country_id
    
    # print(f'   main.py |   post:/addCustomer  |   BEFORE DB[ Customer: ]')
    # print_object(customer)
    # print(f'   main.py |        post:/addCustomer  |   [ Address: ]')
    # print_object(address)
    # print(f'   main.py |        post:/addCustomer  |   [ City: ]')
    # print_object(city)
    # print(f'   main.py |        post:/addCustomer  |   [ Country: ]')
    # print_object(country)

    session = SessionLocal()
    if not country.country_id:
        session.add(country)
        session.commit()
        session.refresh(country)
    city.country_id = country.country_id
    if not city.city_id:
        session.add(city)
        session.commit()
        session.refresh(city)
    address.city_id = city.city_id
    if not address.address_id:
        session.add(address)
        session.commit()
        session.refresh(address)
    customer.address_id = address.address_id
    
    # print(f'   main.py |   post:/addCustomer  |   AFTER ADDRESS TO DB[ Customer: ]')
    # print_object(customer)
    # print(f'   main.py |        post:/addCustomer  |   [ Address: ]')
    # print_object(address)
    # print(f'   main.py |        post:/addCustomer  |   [ City: ]')
    # print_object(city)
    # print(f'   main.py |        post:/addCustomer  |   [ Country: ]')
    # print_object(country)
    if not customer.customer_id:
        session.add(customer)
        session.commit()
        session.refresh(customer)

   
    print(f'   main.py |   post:/addCustomer  |   AFTER CUSTOMER TO DB[ Customer: ]')
    print_object(customer)
    print(f'   main.py |        post:/addCustomer  |   [ Address: ]')
    print_object(address)
    print(f'   main.py |        post:/addCustomer  |   [ City: ]')
    print_object(city)
    print(f'   main.py |        post:/addCustomer  |   [ Country: ]')
    print_object(country)
 

    email = customer.email
    store_id = 1
    customer = None
    address = None
    city = None
    country = None
    
    customer = session.query(automap.classes.customer).filter(automap.classes.customer.email == email, automap.classes.customer.store_id == store_id).first()    
    # need to fill in the customer object with the address
    address = session.query(automap.classes.address).filter(automap.classes.address.address_id == customer.address_id).first()            
    city = session.query(automap.classes.city).filter(automap.classes.city.city_id == address.city_id).first()
    country = session.query(automap.classes.country).filter(automap.classes.country.country_id == city.country_id).first()
    session.close()
    return {
        "status": "success",
        "newcustomer": "false",
        "fieldsNtypes": fieldsNtypes,
        "customer": to_dict( automap,  customer),
        "address": to_dict( automap,  address),
        "city": to_dict( automap,  city),
        "country": to_dict( automap,  country),
        "cities": "",
        "countries": ""
    }

  
@app.get('/checkVideoAvailability/{storeID}/{customerID}/{videoID}')
def checkVideoAvailability(storeID: int, customerID: int, videoID: str):
    print("   main.py |   get:/checkVideoAvailability  |   HELLO! checkVideoAvailability")
    # store_id = 1
    
    # video_ids = [videoID.split(',') if ',' in videoID else videoID]
    video_ids = videoID.split(',') if ',' in videoID else [videoID]
    video_ids = [int(id) for id in video_ids]
    print(f'   main.py |   get:/checkVideoAvailability  |   video_ids: {video_ids}')
    
    filmsRented = []   
    session = SessionLocal()
    
    for video_id in video_ids:
        result = session.execute(text("""
            SELECT inventory.inventory_id, inventory.film_id , inventory.store_id, film.title, film.rental_rate, film.description
            FROM inventory
            JOIN film ON inventory.film_id = film.film_id
            JOIN store ON inventory.store_id = store.store_id
            WHERE store.store_id = :store_id
            AND inventory.film_id = :video_id
            LIMIT 1
        """), {"video_id": video_id, "store_id": storeID})
        for row in result.fetchall():
            print(f'   main.py |   get:/checkVideoAvailability  |   row: {row}')
            film = {
                "inventory_id": row[0],
                "film_id": row[1],
                "store_id": row[2],
                "title": row[3],
                "rental_rate": row[4],
                "description": row[5],
                "due_date": datetime.now().replace(hour=23, minute=0, second=0) + timedelta(days=5)
            }
            filmsRented.append(film)
        print()
        print()
        print(f'   main.py |   get:/checkVideoAvailability  |   filmsRented: {filmsRented}')
        print()
        
    # Add the rental record to the database for the films that are available in our store
    # for i, film in enumerate(filmsRented):
    for film in filmsRented:
        i=0
        rental_date = datetime.now() + timedelta(seconds=i)  # Add a delay to the rental_date
        rental = Rental(
            rental_date=rental_date,
            inventory_id=film["inventory_id"],
            customer_id=customerID,
            return_date=film["due_date"],
            staff_id=1
        )
        i = i + 1
        session.add(rental)
        session.commit()
        time.sleep(1)  # Wait for 1 second before the next iteration            
        session.close()
    
    result_json = {
        "status": "success",
        "filmsRented": filmsRented
    }
    print()
    print()
    print('RESULT >>>>>>>>>>>>>>>>>>>')
    print(result_json)
    print()
    print()
    
    return result_json

  
@app.get('/getCustomerbyEmail/{email}')
def getCustomerbyEmail(email: str):
    store_id = 1
    session = SessionLocal()
    customer = session.query(automap.classes.customer).filter(automap.classes.customer.email == email, automap.classes.customer.store_id == store_id).first()    

    if customer is not None:
        # need to fill in the customer object with the address
        address = session.query(automap.classes.address).filter(automap.classes.address.address_id == customer.address_id).first()            
        city = session.query(automap.classes.city).filter(automap.classes.city.city_id == address.city_id).first()
        country = session.query(automap.classes.country).filter(automap.classes.country.country_id == city.country_id).first()
        # print(f'customer: {to_dict(automap, customer)}, address: {to_dict(automap, address)}, city: {to_dict(automap, city)}, country: {to_dict(automap, country)}')

        return {
            "newcustomer": "false",
            "fieldsNtypes": fieldsNtypes,
            "customer": to_dict( automap,  customer),
            "address": to_dict( automap,  address),
            "city": to_dict( automap,  city),
            "country": to_dict( automap,  country),
            "cities": "",
            "countries": ""
        }

    else:
        # create a new customer object to return with all the fields
        customer = Customer(email=email, store_id=store_id)
        address = Address()
        city = City()
        country = Country()
        cities = session.query(automap.classes.city).all()
        countries = session.query(automap.classes.country).all()
        # print(f'customer: {to_dict(automap, customer)}, address: {to_dict(automap, address)}, cities: {to_dict(automap, cities)}, countries: {to_dict(automap, countries)}')

        return {
            "newcustomer": "true",
            "fieldsNtypes": fieldsNtypes,
            "customer":  to_dict( automap,  customer), 
            "address": to_dict( automap,  address), 
            "city": to_dict( automap,  city),
            "country": to_dict( automap,  country),
            "cities": to_dict( automap,  cities),
            "countries": to_dict( automap,  countries),
        }

  
        