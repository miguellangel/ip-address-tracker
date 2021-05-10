import "./App.scss"
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import iconLocation from './media/icon-location.svg'

const App = () => {
	let IPFY_API_KEY = process.env.REACT_APP_IPFY_API_KEY

	let icon = L.icon({
		iconUrl: iconLocation,
		iconRetinaUrl: iconLocation,
		iconAnchor: null,
		popupAnchor: [10, -44],
		iconSize: [30, 35],
	});

	const PreserveViewport = () => {
		setTimeout(function () {
			let viewheight = window.innerHeight
			let viewwidth = window.innerWidth
			let viewport = document.querySelector("meta[name=viewport]");
			viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
		}, 300);

	}

	React.useEffect(() => {
		console.log(IPFY_API_KEY)
	})

	return (
		<>
			<div id="formContainer">
				<header>IP Address Tracker</header>
				<form>
					<input type="text" placeholder="Search for any IP address or domain" onClick={PreserveViewport}/>
					<input type="submit" />
				</form>
			</div>
			<div id="results">
				<div id="queryContainer">
					<div className="enclosing">
						<h6>IP ADDRESS</h6>
						<h4>192.168.3.1</h4>
					</div>
					<div>
						<h6>LOCATION</h6>
						<h4>Austin, TX 78644</h4>
					</div>
					<div>
						<h6>TIMEZONE</h6>
						<h4>UTC-05:00</h4>
					</div>
					<div className="enclosing">
						<h6>ISP</h6>
						<h4>CloudFlare WARP+</h4>
					</div>
				</div>
				<MapContainer center={[51.510, -0.09]} zoom={15} scrollWheelZoom={false} id="map" boundsOptions={{paddingBottomRight: [250, 0]}}>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={[51.51, -0.09]} icon={icon} >
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				</MapContainer>

			</div>
		</>
	)
}

export default App;