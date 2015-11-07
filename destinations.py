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
            'image':'http://dx9rjq5h30myv.cloudfront.net/wp-content/uploads/2014/03/Westminster-by-rebekahesme.jpg'
            }

print(json.dumps([create_destination(code) for code in codes]))

