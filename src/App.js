import "./App.scss"
import React from 'react'
import IPMap from './IPMap.js'

const Loading = () => {
	return <span className="loading"></span>
}

const App = () => {

	/* return the abbreviated form for each state in the ~US~ */
	let states = {
	    'Arizona': 'AZ',
	    'Alabama': 'AL',
	    'Alaska': 'AK',
	    'Arkansas': 'AR',
	    'California': 'CA',
	    'Colorado': 'CO',
	    'Connecticut': 'CT',
	    'Delaware': 'DE',
	    'Florida': 'FL',
	    'Georgia': 'GA',
	    'Hawaii': 'HI',
	    'Idaho': 'ID',
	    'Illinois': 'IL',
	    'Indiana': 'IN',
	    'Iowa': 'IA',
	    'Kansas': 'KS',
	    'Kentucky': 'KY',
	    'Louisiana': 'LA',
	    'Maine': 'ME',
	    'Maryland': 'MD',
	    'Massachusetts': 'MA',
	    'Michigan': 'MI',
	    'Minnesota': 'MN',
	    'Mississippi': 'MS',
	    'Missouri': 'MO',
	    'Montana': 'MT',
	    'Nebraska': 'NE',
	    'Nevada': 'NV',
	    'New Hampshire': 'NH',
	    'New Jersey': 'NJ',
	    'New Mexico': 'NM',
	    'New York': 'NY',
	    'North Carolina': 'NC',
	    'North Dakota': 'ND',
	    'Ohio': 'OH',
	    'Oklahoma': 'OK',
	    'Oregon': 'OR',
	    'Pennsylvania': 'PA',
	    'Rhode Island': 'RI',
	    'South Carolina': 'SC',
	    'South Dakota': 'SD',
	    'Tennessee': 'TN',
	    'Texas': 'TX',
	    'Utah': 'UT',
	    'Vermont': 'VT',
	    'Virginia': 'VA',
	    'Washington': 'WA',
	    'West Virginia': 'WV',
	    'Wisconsin': 'WI',
	    'Wyoming': 'WY',
	    stateAbv: function (region) {return this[region] ? this[region] : region}
	}

	/* get the secret hidden in process.env */
    let IPFY_API_KEY = process.env.REACT_APP_IPFY_API_KEY

	const [data, setData] = React.useState(null)
	const [loading, setLoading] = React.useState(true)
	// eslint-disable-next-line
	const [error, setError] = React.useState(null)

	/* because the app is based on viewport units, this stops
		the keyboard from shrinking into remaining space */
	var PreserveViewport = {
		viewport: document.querySelector("meta[name=viewport]"),

		updateNativeViewport() {this.viewport.setAttribute("content", `width=device-width, height=device-height, initial-scale=1.0`)},

		updateStaticViewport() {
			/* this line piggybacks just because it must happen at the same time as this function call -- 
				remove error class on text input focus*/
			document.querySelector("form").removeAttribute("class", "error")
			
			/* for some reason this.viewport can't be called like the previous method. I suspect a React lifecycle method 
			prevents calling methods within objects from the returned DOM in the way like onCLick={some.method()} while keeping the ability to use ~this~ within the method idk */
			let viewport = document.querySelector("meta[name=viewport]")
			let viewWidth = window.innerWidth
			let viewHeight = window.innerHeight
			viewport.setAttribute('content', `width=${viewWidth}, height=${viewHeight}, initial-scale=1.0`)

		}
	}

	const handleInput = (e) => {

		e.preventDefault() /* don't reload the page */
		var query = e.target[0].value.replace(/\s+/g, '') /* get rid of all whitespace */

		/* check input type through RE */
		let ipRE = /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g
		let domainRE = /[0-9a-zA-z]+\.{1}[a-zA-z]+/g

		var type = (ipRE.test(query) | query==="") ? 'ipAddress' 
			: domainRE.test(query) ? 'domain' : 'invalid' 

		FetchData(type, query) /* fetch */

	}
	const handleError = () => {
		let formContainer = document.querySelector("form")
		let inputBox = document.querySelector("input[type=text]")
		/* error class triggers form-element shake animation*/
		formContainer.setAttribute("class", "error")
		inputBox.value = '' /* clear the textbox */
		inputBox.setAttribute("placeholder", "Enter a valid IP Address or domain") /* change placeholder */

	}

	const FetchData = (type, query) => {

		setLoading(true) /* put DOM in a loading state */

		var api_url = 'https://geo.ipify.org/api/v1?';
		fetch(`${api_url}apiKey=${IPFY_API_KEY}&${type}=${query}`) /* put everything together */

			.then((response) => {
				if (response.ok) {
					
					setData(null) /* only dump current data when next query is valid */
					return response.json()
				}
				throw response; /* trigger error */
			})

			.then((data) => setData(data)) /* feed the new data to the DOM */

			.catch((e) => {
				console.error('An error happened: ', e)
				setError(e)
				handleError() /* let the user know an error occurred*/
			})

			.finally(() => {
				setLoading(false) /* put DOM out of loading state ;; show data */
			})
	}


	React.useEffect(() => {
		/* re-calculate viewport values --
			this fixes the keyboard glitch on mobile*/
		window.onorientationchange = () => PreserveViewport.updateNativeViewport() /* bool is irrelevant ;; just keep changing so that page re-renders*/
		/*PreserveViewport.updateNativeViewport()*/
		FetchData('ipAddress', '8.8.8.8') /* default show google's ip on load */

	// eslint-disable-next-line
	}, [])

	return (
		<>
			<div id="formContainer">
				<header>IP Address Tracker</header>
				<form onSubmit={handleInput}>

					<input type="text" placeholder="Search for any IP address or domain" onFocus={PreserveViewport.updateStaticViewport} pattern="(\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b)|(\b(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}\b)|([0-9a-zA-z]+\.{1}[a-zA-z]+)" title="This is not an IP or domain"/>
					<input id="submitButton" type="submit" />
				</form>
			</div>
			<div id="results">
				<div id="queryContainer">
					<div className="enclosing">
						<h6>IP ADDRESS</h6>
						<h4>{ !loading ? data.ip : <Loading /> }</h4>
					</div>
					<div>
						<h6>LOCATION</h6>
						<h4>{ !loading ? `${data.location.city}, ${states.stateAbv(data.location.region)} ${data.location.postalCode}` : <Loading />  }</h4>
					</div>
					<div>
						<h6>TIMEZONE</h6>
						<h4>{ !loading ? `UTC ${data.location.timezone}` : <Loading /> }</h4>
					</div>
					<div className="enclosing">
						<h6>ISP</h6>
						<h4>{ !loading ? data.isp : <Loading /> }</h4>
					</div>
				</div>
				{!loading ? <IPMap data = {data} /> : <Loading /> }
			</div>
		</>
	)
}

export default App;