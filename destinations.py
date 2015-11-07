from code_to_coordinates import CODE_TO_COORDINATES_MAPPING
from code_to_city import CODE_TO_CITY_MAPPING, ALL_CODES
from code_to_image import CODE_TO_IMAGE_MAPPING
from most_liked_pics import get_most_liked_pics
import json

codes = CODE_TO_COORDINATES_MAPPING.keys()

def create_destination(code):
    return {
            'code':code,
            'city':CODE_TO_CITY_MAPPING[code].split(',')[0],
            'coordinates': {
                'lat':CODE_TO_COORDINATES_MAPPING[code][0],
                'lng':CODE_TO_COORDINATES_MAPPING[code][1],
                },
            'image': CODE_TO_IMAGE_MAPPING[code]
            }

code_to_pic = get_most_liked_pics(ALL_CODES)
print(json.dumps([create_destination(code) for code in codes]))
