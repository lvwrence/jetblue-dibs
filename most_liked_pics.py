from instagram.client import InstagramAPI
from code_to_city import ALL_CODES
from code_to_coordinates import CODE_TO_COORDINATES_MAPPING


instagram_api = InstagramAPI(client_id='f233967f16b645c0ad5ff867e481371a', client_secret='c6b4c91c88024f218362f5163f8f657d')

def get_instagram_locations(code):
    lat, lng = CODE_TO_COORDINATES_MAPPING[code]
    return instagram_api.location_search(lat=str(lat), lng=str(lng), distance=1000)

def get_most_liked_pics(codes):
    code_pic = {}

    for code in codes:
        pic = get_most_liked_pic_by_tag(code)

        code_pic[code] = pic
    return code_pic

def get_most_liked_pic_by_tag(code):
    medium, _ = instagram_api.tag_recent_media(tag_name=code)
    medium = filter(lambda x: x.type == 'image', medium)
    liked_medium = most_liked_medium(medium)
    return liked_medium.get_standard_resolution_url()

def get_most_liked_pic_by_location(code):
    print code
    locations = get_instagram_locations(code)
    likes = 0
    most_liked = None

    for location in locations:
        medium, _ = instagram_api.location_recent_media(location_id=location.id)
        medium = filter(lambda x: x.type == 'image', medium)
        if not medium:
            continue
        print medium
        liked_medium = most_liked_medium(medium)
        print liked_medium

        if len(liked_medium.likes) > likes:
            likes = len(liked_medium.likes)
            most_liked = liked_medium

    return most_liked.get_standard_resolution_url()

def most_liked_medium(medium):
    return max(medium, key=lambda m: len(m.likes))

print get_most_liked_pics(ALL_CODES)
