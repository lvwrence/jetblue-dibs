import json
import csv
from code_to_coordinates import CODE_TO_COORDINATES_MAPPING
from code_to_city import CODE_TO_CITY_MAPPING


flights = []
#f = open('flight_data.csv', 'rb')
#reader = csv.reader(f)

with open('flight_data.csv') as f:

    reader = csv.reader(f)
    for row in reader:
        origin, dest, hotel_property, hotel_num_stay, hotel_checkin, hotel_checkout, expedia_price, jetblue_price, perc_savings, month, advance_weeks, count = row
        origin_city = CODE_TO_CITY_MAPPING[origin]
        dest_city = CODE_TO_CITY_MAPPING[dest]

        origin_coords = CODE_TO_COORDINATES_MAPPING[origin]
        dest_coords = CODE_TO_COORDINATES_MAPPING[dest]


        flight = dict(origin=origin, dest=dest, hotel_property=hotel_property,
                      hotel_num_stay=hotel_num_stay, hotel_checkin=hotel_checkin,
                      hotel_checkout=hotel_checkout, expedia_price=expedia_price,
                      perc_savings=perc_savings, month=month, advance_weeks=advance_weeks, count=count,
                      origin_coords=origin_coords, dest_coords=dest_coords, origin_city=origin_city, dest_city=dest_city)

        flights.append(flight)

print json.dumps(flights)
