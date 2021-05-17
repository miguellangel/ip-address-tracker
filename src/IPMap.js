import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import iconLocation from './media/icon-location.svg'

const IPMap = ({ data }) => {


    let center = [data.location.lat, data.location.lng]

    let icon = L.icon({
        iconUrl: iconLocation,
        iconRetinaUrl: iconLocation,
        iconAnchor: null,
        popupAnchor: [0,-20],
        iconSize: [30, 35],
    });

    React.useEffect(() => {

    }, [])

    return (
        <MapContainer center={center} zoom={12} scrollWheelZoom={false} id="map" boundsOptions={{paddingBottomRight: [250, 0]}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center} icon={icon} >
                <Popup>
                    {`${data.ip}`}
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default IPMap