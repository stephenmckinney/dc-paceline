/**
 * Migration script: Rails/Heroku PostgreSQL → Sanity
 *
 * Usage:
 *   npx tsx scripts/migrate-data.ts
 *
 * This script transforms exported PostgreSQL data to Sanity NDJSON format
 * and imports it using the Sanity client.
 */

import { createClient } from '@sanity/client'

// Sanity client for mutations
const client = createClient({
  projectId: 'q8bq1hip',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

// Raw data from Heroku PostgreSQL export
const cities = [
  {"id":2,"name":"Northern Virginia","slug":"va"},
  {"id":3,"name":"Maryland","slug":"md"},
  {"id":1,"name":"Washington, DC","slug":"dc"},
]

const groupTypes = [
  {"id":1,"name":"Racing club"},
  {"id":2,"name":"Cycling club"},
  {"id":3,"name":"Shop"},
]

const groups = [
  {"id":1,"name":"National Capital Velo Club (NCVC)","group_type_id":1,"url":"http://www.ncvc.net","rides_url":"http://www.ncvc.net/rides"},
  {"id":2,"name":"Squadra Coppi","group_type_id":1,"url":"https://www.squadracoppi.org","rides_url":"https://www.squadracoppi.org/rides"},
  {"id":3,"name":"DC Velo","group_type_id":1,"url":"http://www.teambeyerauto.com","rides_url":""},
  {"id":4,"name":"DC Triathlon Club","group_type_id":2,"url":"https://www.dctriclub.org","rides_url":"https://www.dctriclub.org/training/weekly-rides"},
  {"id":5,"name":"Artemis Racing","group_type_id":1,"url":"http://artemisracing.org","rides_url":""},
  {"id":6,"name":"Route 1 Velo","group_type_id":1,"url":"https://route1velo.com","rides_url":"https://route1velo.com/rides"},
  {"id":7,"name":"Kelly Benefit Strategies/LSV","group_type_id":1,"url":"https://www.lateralstressvelo.com","rides_url":"https://www.lateralstressvelo.com/social_ride"},
  {"id":8,"name":"District Velocity Racing","group_type_id":1,"url":"https://www.facebook.com/districtvelocity/","rides_url":""},
  {"id":9,"name":"Reston Bicycle Club","group_type_id":2,"url":"https://restonbikeclub.org","rides_url":"https://restonbikeclub.org/page-1546335"},
  {"id":10,"name":"Whole Wheel Velo Club","group_type_id":1,"url":"http://wwvcracing.org","rides_url":""},
  {"id":11,"name":"VeloWorks-Spokes, Etc Race Team","group_type_id":1,"url":"http://www.veloworks-spokesetc.com","rides_url":""},
  {"id":12,"name":"Potomac Pedalers Touring Club","group_type_id":2,"url":"https://www.potomacpedalers.org","rides_url":"https://www.potomacpedalers.org/our-rides"},
  {"id":13,"name":"Phase Cycling","group_type_id":1,"url":"http://www.phasecycling.com","rides_url":"http://www.phasecycling.com/training-rides.html"},
  {"id":14,"name":"Annapolis Bicycle Racing Team (ABRT)","group_type_id":1,"url":"http://www.abrtcycling.com","rides_url":"http://www.abrtcycling.com/about/training-rides/"},
  {"id":16,"name":"BicycleSPACE","group_type_id":3,"url":"http://www.bicyclespacedc.com","rides_url":"http://www.bicyclespacedc.com/weeklyrides"},
  {"id":17,"name":"District Taco Racing","group_type_id":1,"url":"http://www.dtcycling.com","rides_url":""},
  {"id":15,"name":"Spokes Etc.","group_type_id":3,"url":"https://www.spokesetc.com","rides_url":"https://www.spokesetc.com/about/event-calendar-pg800.htm"},
  {"id":19,"name":"High Road Cycling","group_type_id":3,"url":"https://www.highroadcycling.com/","rides_url":"https://www.highroadcycling.com/events"},
  {"id":18,"name":"Conte's Arlington","group_type_id":3,"url":"https://www.contebikes.com","rides_url":"https://www.contebikes.com/about/northern-virginia-washington-d.c-events-pg340.htm"},
  {"id":20,"name":"Buna X Bicycles","group_type_id":3,"url":"https://www.bunaxbicycles.com","rides_url":"https://www.bunaxbicycles.com/rides"},
  {"id":22,"name":"R.E.L.O.A.D.","group_type_id":1,"url":"https://www.strava.com/routes/3076162605654521402","rides_url":""},
  {"id":21,"name":"Rapha Cycling Club (RCC)","group_type_id":2,"url":"https://strava.app.link/J2TguE95ONb","rides_url":""},
]

const rides = [
  {"id":187,"name":"DC Tri Club Ride","city_id":1,"group_id":4,"day_of_week":5,"time":"08:00:00","url":"","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"8th & Penn SE","location_address":"Pennsylvania Ave SE & 8th St SE, Washington, DC 20003","location_map_url":"https://goo.gl/maps/465kPfh9NT3Tyx229","description":"This ride typically leaves Capitol Hill at 7:10/8:10 AM (summer/winter) from 8th and Penn SE with a pickup in Georgetown behind the bank at Wisconsin and M NW at 7:30/8:30 AM (summer/winter). All paces welcome! Rides meet on a week-to-week basis - Always check the most recent forum posting to determine if a ride is happening this weekend."},
  {"id":246,"name":"NCVC Espresso Ride","city_id":1,"group_id":1,"day_of_week":6,"time":"09:15:00","url":"","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"High Road Cycling","location_address":"3210 Grace St NW Suite 100, Washington, DC 20007","location_map_url":"https://goo.gl/maps/NCuaSW2vfem6d6QeA","description":"This is a moderately-paced ride with several opportunities for harder efforts. The first 5 miles or so on MacArthur Blvd. will be fairly relaxed at a pace of around 20-22 mph on flats, with the pace typically heating up somewhat when the group turns onto Goldsboro road and featuring several sprint opportunities. The pace then settles down for the return on MacArthur into Georgetown. Open to cyclists with at least some group-riding experience and fitness interested in a fun ride and a good workout."},
  {"id":197,"name":"Hains Point Evening Loops","city_id":1,"group_id":null,"day_of_week":7,"time":"18:00:00","url":"","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Hains Point - Buckeye Dr Parking Lot","location_address":"Buckeye Dr SW, Washington, DC 20024","location_map_url":"https://goo.gl/maps/zrugzrNt6LohYpPD8","description":"Flat and fast 60-min weekday ride aimed at getting speed work done on Hains Point 3-mile loop. Thursday night is the most popular night. This ride is run on tradition not by a ride organizer. Most cyclists wait in the parking lot on Buckeye Dr. until the group rolls around."},
  {"id":196,"name":"Hains Point Noon Loops","city_id":1,"group_id":null,"day_of_week":7,"time":"12:00:00","url":"","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Hains Point - Buckeye Dr Parking Lot","location_address":"Buckeye Dr SW, Washington, DC 20024","location_map_url":"https://goo.gl/maps/zrugzrNt6LohYpPD8","description":"Flat and fast 60-min weekday ride aimed at getting speed work done on Hains Point 3-mile loop. This ride is run on tradition not by a ride organizer. Most cyclists wait in the parking lot on Buckeye Dr. until the group rolls around."},
  {"id":252,"name":"Route 1 Velo Ramble Ride","city_id":3,"group_id":6,"day_of_week":5,"time":"10:00:00","url":"https://www.strava.com/clubs/4306","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Town Center Market","location_address":"4705 Queensbury Rd, Riverdale, MD 20737","location_map_url":"https://goo.gl/maps/arZQDRdmNcqBni6M9","description":"Meet at Riverdale Park's Town Center Market on fair and not so fair Saturdays for a SPIRITED 40ish miles through USDA agricultural center."},
  {"id":224,"name":"Goon Ride","city_id":3,"group_id":null,"day_of_week":1,"time":"18:30:00","url":"https://www.strava.com/clubs/theGoon","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Veirs Mill Park - Parking Lot","location_address":"4425 Garrett Park Rd, Silver Spring, MD 20906","location_map_url":"https://goo.gl/maps/CqSwm9Rg7UsX4xRo9","description":"One of the hardest and fastest drop rides in DC! The Goon Ride is run on tradition not by a ride organizer. Riders should be experienced riding in large groups and be prepared if they get dropped. Average speed is 25 MPH. The ride runs during daylight savings time for actual schedule and actual time check the Strava group. When in season the ride starts between 5:30PM-6:30PM."},
  {"id":234,"name":"ABRT Saturday Ride","city_id":3,"group_id":14,"day_of_week":5,"time":"08:00:00","url":"","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Davidsonville Park & Ride","location_address":"Davidsonville Rd, Davidsonville, MD 21035","location_map_url":"https://goo.gl/maps/yoT6MZwVA6SZ8hKi6","description":"This is the premier ABRT group ride. This ride has been in existence since before the formation of ABRT over 30 years ago. The ride is 60 miles and travels to south to North Beach in Calvert County, mostly on smaller roads, and back. The ride takes 2:45 to 3:15 pedaling time (18-21+ mph, slower in winter) and is about 60 miles."},
  {"id":243,"name":"ABRT Sunday No Drop Ride","city_id":3,"group_id":14,"day_of_week":6,"time":"08:00:00","url":"","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"USNA Barry Gate","location_address":"97 Prince George St, Annapolis, MD 21401","location_map_url":"https://goo.gl/maps/v1jyEyzkChpoQBdd7","description":"A number of ABRT riders and other local area cyclists meet in downtown Annapolis for a no-drop ride of between 35-45 miles depending on weather and conditions. The route is out to Sandy Point, College Parkway and slow roll home via the B&A trail. While the ride does go fast in places, there are many regroup points and the average speed is about 16-18 mph."},
  {"id":231,"name":"ABRT Tuesday Night World Championships","city_id":3,"group_id":14,"day_of_week":1,"time":"18:00:00","url":"","in_season":true,"out_of_season_note":"Returns April 1, 2020","covid_suspended":false,"location_name":"Davidsonville Park & Ride","location_address":"Davidsonville Rd, Davidsonville, MD 21035","location_map_url":"https://goo.gl/maps/yoT6MZwVA6SZ8hKi6","description":"The start finish is at the Davidsonville Park and Ride at the intersection of Rt. 50 and 424. This is a very fast paced 34 mile training ride most often done at race pace and averages 21-25 mph. The ride is typically composed of the strongest area riders in the lead group with a B group and on occasion a C group after that."},
  {"id":191,"name":"Squadra Coppi Sunday Ride","city_id":2,"group_id":2,"day_of_week":6,"time":"08:30:00","url":"","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Sweet Science","location_address":"2507 Franklin Rd, Arlington, VA 22201","location_map_url":"https://g.page/sweet-science-coffee-arlington?share","description":"From Sweet Science, it's about 51 miles with 2,900ft for the full ride. We usually stay together at a brisk pace for the first 17 miles, until Tuckerman road, where breakaways should be expected. This ride comprises experienced riders who value their training time. Expect speeds from 16-18mph during warmup, 20-25 mph for much of the ride, and 25+ mph during more challenging sections."},
  {"id":244,"name":"ABRT Thursday Parvilla Shop Ride","city_id":3,"group_id":14,"day_of_week":3,"time":"17:30:00","url":"","in_season":true,"out_of_season_note":"Returns April 1, 2020","covid_suspended":false,"location_name":"Parvilla Cycles","location_address":"127 Mitchells Chance Rd, Edgewater, MD 21037","location_map_url":"https://goo.gl/maps/oxgCZDz3gGzmWSyH8","description":"The ride leaves from Parvilla Cycles in Edgewater and rolls through 23 miles of south county back roads. It is ridden at several paces but the focus is on recovery and enjoyment. This ride is open to everyone and can split quickly within the first 5 miles."},
  {"id":242,"name":"Squadra Coppi Sunday Ride (DC Pickup)","city_id":1,"group_id":2,"day_of_week":6,"time":"08:55:00","url":"","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Peirce Mill","location_address":"2401 Tilden St NW, Washington, DC 20008","location_map_url":"https://goo.gl/maps/UQc6nWZwTWTZB7tF8","description":"From Sweet Science, it's about 51 miles with 2,900ft for the full ride. DC pickup at Peirce Mill at 8:55am. This ride comprises experienced riders who value their training time. Expect speeds from 16-18mph during warmup, 20-25 mph for much of the ride, and 25+ mph during more challenging sections."},
  {"id":254,"name":"Conte's TNR Tuesday Night Ride","city_id":2,"group_id":18,"day_of_week":1,"time":"17:30:00","url":"","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Conte's Arlington","location_address":"3449 Wilson Blvd, Arlington, VA 22201","location_map_url":"https://g.page/ContesbikeshopARL?share","description":"The most storied group ride in the DC area. This is not a no-drop ride. Please know the route. Free snacks afterward!"},
  {"id":253,"name":"HRC THNR Thursday Night Ride","city_id":1,"group_id":19,"day_of_week":3,"time":"18:00:00","url":"","in_season":false,"out_of_season_note":"","covid_suspended":false,"location_name":"High Road Cycling","location_address":"3210 Grace St NW Suite 100, Washington, DC 20007","location_map_url":"https://goo.gl/maps/NCuaSW2vfem6d6QeA","description":"We'll have 2 groups, an Advanced Fast (24-29MPH) group, a Training Endurance group (19-21MPH) & Introduction to Road group (14-18MPH). Both groups will do a short, mellow roll out on the Crescent Trail then cut up/over to Mac Blvd, then pick up the pace."},
  {"id":181,"name":"PPTC Downtown Breakaway (DTB)","city_id":1,"group_id":12,"day_of_week":2,"time":"18:00:00","url":"","in_season":false,"out_of_season_note":"","covid_suspended":false,"location_name":"Mitchell Park","location_address":"S St NW (between 22nd St NW & 23rd St NW), Washington, DC 20008","location_map_url":"https://goo.gl/maps/R4pYbXdApe7m3pWM8","description":"The Pedalers classic ride is back for 2022! A prompt 6pm departure will take us on an ever-changing route out to Montgomery County and back, taking myriad turns, climbs, descents, and views in along the way. Post-ride we typically gather for food and drinks at select local DC cafes and breweries that support bicyclists."},
  {"id":182,"name":"Hains Point Morning Loops","city_id":1,"group_id":null,"day_of_week":7,"time":"06:30:00","url":"https://www.facebook.com/groups/261567577351447/","in_season":false,"out_of_season_note":"Check the facebook group to see when the season starts","covid_suspended":false,"location_name":"Ohio Dr. SW","location_address":"Hains Point Ohio Dr. SW","location_map_url":"https://goo.gl/maps/KNb8aDxTHCNWepQK6","description":"Flat and fast Tuesdays and Thursdays ride aimed at getting speed work done on Hains Point 3-mile loop. Ride organizers provide basic instructions before the group rolls. Cyclists wait before the start gate on Ohio SW dr."},
  {"id":255,"name":"Thrasher Ride","city_id":3,"group_id":null,"day_of_week":7,"time":"12:30:00","url":"https://www.strava.com/clubs/329783","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Barrett & Bradley","location_address":"Barrett Lane & Bradley Boulevard, Bethesda, MD 20817","location_map_url":"https://goo.gl/maps/4TQPFuTRdpuVeNrB9","description":"This is an open ride but established by DC Velo Randy Thrasher and is attended by seasoned riders. It is 25ish miles with a hard pace which runs all season weather permitting every weekday. The ride stays in Bethesda area going through a combination of routes usually on Bradley/Mc Arthur/Oaklyn."},
  {"id":256,"name":"Buna Saturdays","city_id":1,"group_id":20,"day_of_week":5,"time":"07:30:00","url":"https://www.bunaxbicycles.com/rides","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Buna X Bicycles","location_address":"4824 MacArthur Blvd NW, Washington, DC 20007","location_map_url":"https://goo.gl/maps/rpyY4N26nt7L2p5G7","description":"This ride has no stops or regrouping points. You must be comfortable riding in a fast moving bunch. All we ask is be nice to everyone around and enjoy the ride. Everyone welcome! Distance: 50 miles. Pace: Moderate to Very Spicy, 21 - 23 mph avg."},
  {"id":257,"name":"Buna Sundays","city_id":1,"group_id":20,"day_of_week":6,"time":"08:30:00","url":"","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Buna X Bicycles","location_address":"4824 MacArthur Blvd NW, Washington, DC 20007","location_map_url":"https://goo.gl/maps/rpyY4N26nt7L2p5G7","description":"This is no drop ride and two of regrouping point. First regrouping spot is on the top of Great Falls climb and the second on top of Brickyard climb. If you are new to cycling or group riding, this is the perfect ride. Distance: 27 miles. Pace: Recovery, No drop, beginner friendly - 16 - 18mph avg."},
  {"id":190,"name":"10 AM Ride","city_id":3,"group_id":null,"day_of_week":5,"time":"10:30:00","url":"","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Rock Creek Park","location_address":"Intersection of East West Hwy & Beach Dr, Chevy Chase, MD 20815","location_map_url":"https://goo.gl/maps/MQGBor6gWvHSVcSC8","description":"A hard and fast 50-miler drop-ride! The 10AM Ride is run on tradition not by a ride organizer. Different route than the 7AM ride, the ride starts at 10:30 in Rock Creek Park at the intersection of east west highway and Jones Mill/Beach Dr."},
  {"id":261,"name":"G2 Ride","city_id":3,"group_id":null,"day_of_week":2,"time":"18:30:00","url":"https://www.strava.com/clubs/96359","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Beach And Stoneybrook","location_address":"Beach Drive parking before Stoneybrook","location_map_url":"https://maps.app.goo.gl/SyAMr7iPCjvTtvUD9","description":"Geezer Goon (G2) runs every Wednesday during the DLS from Beach Drive & follows the old Goon Ride route through the RCP & it covers 25 miles. Start times vary from 5:30 to 6:30 PM and follows Goon schedule which is published on The Goon Strava page."},
  {"id":183,"name":"7 AM Ride","city_id":3,"group_id":3,"day_of_week":5,"time":"07:10:00","url":"","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Rock Creek Park","location_address":"Intersection of East West Hwy & Beach Dr, Chevy Chase, MD 20815","location_map_url":"https://goo.gl/maps/MQGBor6gWvHSVcSC8","description":"A hard and fast 40-miler drop-ride! The 7AM Ride is run on tradition not by a ride organizer. The ride starts in Rock Creek Park at the intersection of East West highway and Jones Mill/Beach Dr, rolls through Bethesda, Bradley, Mass to Mac Aurtur."},
  {"id":229,"name":"Goon Ride","city_id":3,"group_id":null,"day_of_week":3,"time":"18:30:00","url":"https://www.strava.com/clubs/theGoon","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Veirs Mill Park - Parking Lot","location_address":"4425 Garrett Park Rd, Silver Spring, MD 20906","location_map_url":"https://goo.gl/maps/CqSwm9Rg7UsX4xRo9","description":"One of the hardest and fastest drop rides in DC! The Goon Ride is run on tradition not by a ride organizer. Riders should be experienced riding in large groups and be prepared if they get dropped. The ride runs during daylight savings time."},
  {"id":263,"name":"R.E.L.O.A.D. Ride","city_id":1,"group_id":22,"day_of_week":6,"time":"09:00:00","url":"https://www.strava.com/routes/3076162605654521402","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Exorcist Steps","location_address":"36th St NW & Canal Rd NW, Washington, DC 20007","location_map_url":"https://goo.gl/maps/j4ag3CsVdhCKj8q1A","description":"Location: Georgetown (Exorcist Steps). Distance: 47 miles. Average Speed: 24mph. Average Elevation: 3000. Pace: Hard (Drop-ride but we regroup twice at Potomac BP Gas Station). HRC IS NOW OPEN AFTER THE RIDE."},
  {"id":251,"name":"Route 1 Velo Scorcher Ride","city_id":3,"group_id":6,"day_of_week":1,"time":"18:00:00","url":"https://www.strava.com/clubs/4306","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Town Center Market","location_address":"4705 Queensbury Rd, Riverdale, MD 20737","location_map_url":"https://goo.gl/maps/arZQDRdmNcqBni6M9","description":"6pm start. Meet Riverdale MARC Train Station, Riverdale Park. Reverse Shop Ride through Berwyn Heights, Left on 201, Right on Beaver Dam, fast as you want, turn around at Springfield and come back in. Neutral pace until we hit Beaver Dam then no holds barred."},
  {"id":260,"name":"Cappuccino Ride","city_id":3,"group_id":null,"day_of_week":6,"time":"09:00:00","url":"","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Rock Creek Park","location_address":"Intersection of East West Hwy & Beach Dr, Chevy Chase, MD 20815","location_map_url":"https://goo.gl/maps/MQGBor6gWvHSVcSC8","description":"Distance: ~38 miles. Average Speed: 17-18 mph. Average Elevation: ~2,113 ft (over total route). Pace: Moderate. Start Point: Meets at Beach and EW Highway for approximately 38 miles total ride following the old Bicycle Place Ride Route."},
  {"id":240,"name":"Route 1 Velo Club Ride","city_id":3,"group_id":6,"day_of_week":6,"time":"10:00:00","url":"https://www.strava.com/clubs/4306","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Town Center Market","location_address":"4705 Queensbury Rd, Riverdale, MD 20737","location_map_url":"https://goo.gl/maps/arZQDRdmNcqBni6M9","description":"Come join us every Sunday. The average pace is 17-19.5 mph. Riders who can sustain 17 mph solo will be able to keep with the group. There are meet up points during the ride for stragglers. Finish at Town Center Market's bike friendly patio."},
  {"id":264,"name":"Rapha RCC Sunday Ride","city_id":1,"group_id":21,"day_of_week":6,"time":"08:30:00","url":"https://www.strava.com/routes/3291404378262202572","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Baby Cat Brewery","location_address":"Baby Cat Brewery in Kensington","location_map_url":"https://goo.gl/maps/8pigxueauCnpukyt9","description":"Hit the Road with Us: Sunday Rapha RCC Club Ride! Meeting Location: Black Coffee 4885 MacArthur Blvd NW. Schedule: 8:00 AM: Gather & grab coffee. 8:20 AM: Pre-ride briefing. 8:30 AM: Roll out! New Route: Enjoy a scenic 27.89-mile loop with 1,187 ft of elevation gain."},
  {"id":227,"name":"Greenbelt Park Training Race Series","city_id":3,"group_id":6,"day_of_week":2,"time":"18:00:00","url":"https://route1velo.com/greenbelt/info","in_season":false,"out_of_season_note":"","covid_suspended":false,"location_name":"Greenbelt Park","location_address":"6565 Greenbelt Rd, Greenbelt, MD 20770","location_map_url":"https://goo.gl/maps/WJpDgnStan7LwuE79","description":"This is one of Greater Washington Area's more famous training series. Four groups are: A, B, C, and Juniors. Criterium style racing, a non-technical course. Races are at 6pm and 7pm."},
  {"id":259,"name":"N2 Ride","city_id":3,"group_id":null,"day_of_week":5,"time":"08:30:00","url":"https://ridewithgps.com/trips/167205974","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Beach And Stoneybrook","location_address":"Beach Drive parking before Stoneybrook","location_map_url":"https://maps.app.goo.gl/SyAMr7iPCjvTtvUD9","description":"No Name (N2) ride. Distance: 60 miles. Difficulty: Moderate 16-18 MPH no drop. Start Point: Beach and Stoneybrook."},
  {"id":265,"name":"Route 1 Velo Mix It Up On Wednesday Night","city_id":3,"group_id":6,"day_of_week":2,"time":"18:00:00","url":"","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"Town Center Market","location_address":"4705 Queensbury Rd, Riverdale, MD 20737","location_map_url":"https://goo.gl/maps/arZQDRdmNcqBni6M9","description":"Route to be determined. In the Summer, every Wednesday at 6 pm departing from the Riverdale Park MARC Train Station - except while the Greenbelt Training Series is occurring (May-June)"},
  {"id":186,"name":"Cupcake Ramble","city_id":1,"group_id":16,"day_of_week":5,"time":"11:30:00","url":"https://www.facebook.com/groups/BicycleSPACECupcakeRambleBikeRide","in_season":true,"out_of_season_note":"","covid_suspended":false,"location_name":"BicycleSPACE","location_address":"1512 Okie St NE, Washington, DC 20002","location_map_url":"https://goo.gl/maps/3xnj2L7CcRUKho5b8","description":"One of the best parts of a nice ride is enjoying a well-earned treat! Every Saturday at 11:30 a.m., join us for a pleasant ride of 15-20 miles, traveling at a pace of approximately 10 mph. We'll either bring snacks or stop by a bakery/cafe to have a treat midway through."},
]

// Day of week mapping: Rails integer -> Sanity string array
const dayMapping: Record<number, string[]> = {
  0: ['monday'],
  1: ['tuesday'],
  2: ['wednesday'],
  3: ['thursday'],
  4: ['friday'],
  5: ['saturday'],
  6: ['sunday'],
  7: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], // Weekday
}

// Format time from "HH:MM:SS" to "H:MM AM/PM"
function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

async function migrate() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('Error: SANITY_WRITE_TOKEN environment variable is required')
    console.log('Get a token from: https://www.sanity.io/manage/project/q8bq1hip/api#tokens')
    process.exit(1)
  }

  console.log('Starting migration...\n')

  // Transform cities
  const cityDocs = cities.map(city => ({
    _id: `city-${city.id}`,
    _type: 'city' as const,
    name: city.name,
    slug: {
      _type: 'slug' as const,
      current: city.slug,
    },
  }))

  // Transform group types
  const groupTypeDocs = groupTypes.map(gt => ({
    _id: `groupType-${gt.id}`,
    _type: 'groupType' as const,
    name: gt.name,
  }))

  // Transform groups
  const groupDocs = groups.map(group => ({
    _id: `group-${group.id}`,
    _type: 'group' as const,
    name: group.name,
    groupType: {
      _type: 'reference' as const,
      _ref: `groupType-${group.group_type_id}`,
    },
    url: group.url,
    ...(group.rides_url ? { ridesUrl: group.rides_url } : {}),
  }))

  // Transform rides
  const rideDocs = rides.map(ride => ({
    _id: `ride-${ride.id}`,
    _type: 'ride' as const,
    name: ride.name,
    city: {
      _type: 'reference' as const,
      _ref: `city-${ride.city_id}`,
    },
    ...(ride.group_id ? {
      group: {
        _type: 'reference' as const,
        _ref: `group-${ride.group_id}`,
      }
    } : {}),
    location: ride.location_name,
    ...(ride.location_address ? { address: ride.location_address } : {}),
    ...(ride.location_map_url ? { mapUrl: ride.location_map_url } : {}),
    daysOfWeek: dayMapping[ride.day_of_week] || ['saturday'],
    time: formatTime(ride.time),
    pace: 'B' as const, // Default pace
    ...(ride.description ? { description: ride.description } : {}),
    ...(ride.url ? { url: ride.url } : {}),
    inSeason: ride.in_season && !ride.covid_suspended,
    ...(ride.out_of_season_note ? { outOfSeasonNote: ride.out_of_season_note } : {}),
  }))

  // Import in batches using transactions
  console.log(`Importing ${cityDocs.length} cities...`)
  const cityTx = client.transaction()
  cityDocs.forEach(doc => cityTx.createOrReplace(doc))
  await cityTx.commit()
  console.log('Cities imported.\n')

  console.log(`Importing ${groupTypeDocs.length} group types...`)
  const gtTx = client.transaction()
  groupTypeDocs.forEach(doc => gtTx.createOrReplace(doc))
  await gtTx.commit()
  console.log('Group types imported.\n')

  console.log(`Importing ${groupDocs.length} groups...`)
  const groupTx = client.transaction()
  groupDocs.forEach(doc => groupTx.createOrReplace(doc))
  await groupTx.commit()
  console.log('Groups imported.\n')

  console.log(`Importing ${rideDocs.length} rides...`)
  const rideTx = client.transaction()
  rideDocs.forEach(doc => rideTx.createOrReplace(doc))
  await rideTx.commit()
  console.log('Rides imported.\n')

  console.log('Migration complete!')
  console.log(`  - ${cityDocs.length} cities`)
  console.log(`  - ${groupTypeDocs.length} group types`)
  console.log(`  - ${groupDocs.length} groups`)
  console.log(`  - ${rideDocs.length} rides`)
}

migrate().catch(console.error)
