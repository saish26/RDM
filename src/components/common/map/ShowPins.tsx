import { reverseGeocoding } from "@/utils/helpers/mapTranslation";
import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";

type ShowPinsProps = {
    locations: Array<{ lat: number; lng: number }>;
};

const ShowPins = ({ locations }: ShowPinsProps) => {
    const [center, setCenter] = useState<any>([28.3949, 84.124]);
    const [pinedAddress, setPinnedAddress] = useState<string>("");

    const eventHandlers = useMemo(
        () => ({
            async click(event: any) {
                const marker = event.target;
                const position = marker.getLatLng();
                if (position) {
                    setCenter([position?.lat, position?.lng]);
                    const addressList = await reverseGeocoding({
                        lat: position?.lat,
                        lng: position?.lng,
                    });
                    setPinnedAddress(addressList?.display_name);
                }
            },
        }),
        []
    );

    useEffect(() => {
        if (locations?.length > 0) {
            setCenter(locations[3]);
        }
    }, [locations]);

    return (
        <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={center}
            zoom={12}
            key={center}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {locations &&
                locations?.map((position, index) => {
                    return (
                        <Marker
                            position={position}
                            key={index}
                            eventHandlers={eventHandlers}
                        >
                            <Popup>{pinedAddress}</Popup>
                        </Marker>
                    );
                })}
        </MapContainer>
    );
};

export default ShowPins;
