import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/destinations')
def destinations():
    return app.send_static_file('destinations.json')
