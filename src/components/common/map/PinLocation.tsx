import { useRef } from "react";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import { reverseGeocoding } from "@/utils/helpers/mapTranslation"; // Assuming reverseGeocoding is already defined in helpers
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Select } from "@mantine/core";

const PinLocation = () => {
    const [zoom, setZoom] = useState<number>(15);
    const mapRef = useRef<L.Map | null>(null);
    const [center, setCenter] = useState<any>([
        3.1461861655875647, 101.66190019960423,
    ]);
    const [selectedSite, setSelectedSite] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<any>();
    const [locationNames, setLocationNames] = useState<{
        [key: string]: string;
    }>({});
    console.log(center);
    const locations: any = [
        {
            lat: 3.1461861655875647,
            lng: 101.66190019960423,
            name: "Jaya Grocer Damansara City Mall",
        },
        {
            lat: 3.1319479219291413,
            lng: 101.52817312896636,
            name: "Jaya Grocer Fresh DC",
        },

        {
            lat: 3.053452866354457,
            lng: 101.6777700848278,
            name: "Jaya Grocer Tropika",
        },
        {
            lat: 2.958562957458505,
            lng: 101.55262583703491,
            name: "Jaya Grocer Gamuda 257",
        },
        {
            lat: 5.399072383143528,
            lng: 100.39797417217673,
            name: "Jaya Grocer Sunway Carnival",
        },
        {
            lat: 3.078368374687308,
            lng: 101.58634918485721,
            name: "Jaya Grocer Subang Courtyard",
        },
        {
            lat: 3.2243330783166595,
            lng: 101.73109285826631,
            name: "Jaya Grocer KL East",
        },
        {
            lat: 3.1093086560377285,
            lng: 101.63717926640552,
            name: "Jaya Grocer Jaya Shopping Centre",
        },
        {
            lat: 1.5616609450473493,
            lng: 103.77566952674998,
            name: "Jaya Grocer Austin Heights",
        },
        {
            lat: 3.055704079544647,
            lng: 101.78705482709586,
            name: "Jaya Grocer BMC Mall",
        },
        {
            lat: 2.944469029392214,
            lng: 101.54271079675401,
            name: "Jaya Grocer Eco Sanctuary",
        },
    ];

    const pinLocation = async () => {
        try {
            setCenter([3.1461861655875647, 101.66190019960423]);
            const addressList = await reverseGeocoding({
                lat: 27.7148,
                lng: 85.3181,
            });
            setSelectedLocation(addressList);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchLocationName = async (lat: number, lng: number) => {
        const addressList = await reverseGeocoding({ lat, lng });
        return addressList?.display_name; // Assuming reverseGeocoding returns the full address as `display_name`
    };

    useEffect(() => {
        pinLocation();
    }, []);

    useEffect(() => {
        // Fetch names for all the locations
        const fetchNames = async () => {
            const names: { [key: string]: string } = {};
            for (let i = 0; i < locations?.length; i++) {
                const { lat, lng } = locations[i];
                const name = await fetchLocationName(lat, lng);
                names[`${lat},${lng}`] = name || "Unknown location";
            }
            setLocationNames(names);
        };

        fetchNames();
    }, [locations]);

    // Define the pin icon
    const pinIcon = L.icon({
        iconUrl: "/working.png",
        iconSize: [38, 48],
        iconAnchor: [16, 48],
        popupAnchor: [0, -48],
    });

    return (
        <main>
            <div
                style={{
                    position: "absolute",
                    right: "2.5rem",
                    top: "1.5rem",
                    zIndex: 1000,
                    width: "20rem",
                }}
            >
                <Select
                    placeholder="Select a site"
                    size="lg"
                    data={locations?.map((location: any, index: any) => ({
                        value: index?.toString(),
                        label: location?.name,
                    }))}
                    value={selectedSite}
                    styles={{
                        dropdown: {
                            zIndex: 1001, // Higher than parent
                            position: "fixed", // Ensures it stays on top
                        },
                    }}
                    onChange={(value) => {
                        setSelectedSite(value);
                        if (value !== null && mapRef.current) {
                            const index = parseInt(value, 10);
                            const location = locations[index];
                            mapRef.current.flyTo(
                                [location.lat, location.lng],
                                zoom
                            );
                        }
                    }}
                    mb="md"
                />
            </div>
            <div>
                <MapContainer
                    className="markercluster-map"
                    center={[3.1461861655875647, 101.66190019960423]}
                    zoom={zoom}
                    style={{ height: "99vh", width: "100%" }}
                    ref={mapRef} // Correct way to get map reference
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {locations.map((location: any, index: any) => (
                        <Marker
                            key={index}
                            position={[location?.lat, location?.lng]}
                            icon={pinIcon}
                        >
                            <Tooltip>{location?.name}</Tooltip>
                            <Popup>{location?.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </main>
    );
};

export default PinLocation;
