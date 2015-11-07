import os
from flask import Flask, render_template
from instagram.client import InstagramAPI
from code_to_coordinates import CODE_TO_COORDINATES_MAPPING
from code_to_city import CODE_TO_CITY_MAPPING
from code_to_images import CODE_TO_IMAGES_MAPPING
from flights import FLIGHTS
import json

INSTAGRAM_API = InstagramAPI(client_id='f233967f16b645c0ad5ff867e481371a', client_secret='c6b4c91c88024f218362f5163f8f657d')

app = Flask(__name__)
app.debug = True

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/<code>')
def subpage(code):
    return render_template('subpage.html')


@app.route('/api/destinations')
def destinations():
    return render_template('destinations.json')

@app.route('/api/destinations/<code>/feed')
def feed(code):
    lat, lng = CODE_TO_COORDINATES_MAPPING[code]
    location_list = [x.__dict__ for x in INSTAGRAM_API.location_search(lat=str(lat), lng=str(lng), distance=1000)]

    flights_to = get_flight_to(code)

    for loc in location_list:
        loc['point'] = str(loc['point'])[7:]
        loc['images'] = [link for link in CODE_TO_IMAGES_MAPPING[loc]]
    location_list = [x for x in location_list if x['images'] != []]
    return json.dumps(dict(location_list=location_list, flights=flights_to))

def get_flight_to(dest_code, flights=FLIGHTS):
    return [f for f in flights if f['dest'] == dest_code]
