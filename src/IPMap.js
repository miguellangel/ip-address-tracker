import React from 'react'
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import L from 'leaflet'
import iconLocation from './media/icon-location.svg'

const IPMap = ({ data }) => {

    /* coordinates */
    let coordinates = [data.location.lat, data.location.lng]

    /* add a custom icon for target */
    let icon = L.icon({
        iconUrl: iconLocation,
        iconRetinaUrl: iconLocation,
        iconAnchor: null,
        popupAnchor: [0,-20],
        iconSize: [30, 35],
    })

    return (
        <MapContainer center={coordinates} zoom={12} scrollWheelZoom={false} id="map" boundsOptions={{paddingBottomRight: [250, 0]}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coordinates} icon={icon} >
                <Popup>
                    {`${data.ip}`}
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default IPMap