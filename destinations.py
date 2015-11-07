from code_to_coordinates import CODE_TO_COORDINATES_MAPPING
from code_to_city import CODE_TO_CITY_MAPPING
import json

codes = CODE_TO_COORDINATES_MAPPING.keys()

def create_destination(code):
    return {
            'code':code,
            'city':CODE_TO_CITY_MAPPING[code],
            'coordinates': {
                'lat':CODE_TO_COORDINATES_MAPPING[code][0],
                'lng':CODE_TO_COORDINATES_MAPPING[code][1],
                },
            'image':'http://travelnoire.com/wp-content/uploads/2015/07/Montreal_Canada.jpg'
            }

print(json.dumps([create_destination(code) for code in codes]))

