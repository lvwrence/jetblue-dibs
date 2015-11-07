import os
from flask import Flask, render_template
from instagram.client import InstagramAPI
from code_to_coordinates import CODE_TO_COORDINATES_MAPPING
from code_to_city import CODE_TO_CITY_MAPPING

instagram_api = InstagramAPI(client_id='f233967f16b645c0ad5ff867e481371a', client_secret='c6b4c91c88024f218362f5163f8f657d')

app = Flask(__name__)

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
    instagram_api = InstagramAPI(client_id='f233967f16b645c0ad5ff867e481371a', client_secret='c6b4c91c88024f218362f5163f8f657d')
    #return str(instagram_api.location_search(lat="37.7808851",lng="-122.3948632",distance=1000))
    return str(instagram_api.location_search(lat=str(lat), lng=str(lng), distance=1000))
