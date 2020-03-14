import { Component, OnInit } from '@angular/core';
declare let L;
import { icon, Marker } from 'src/assets/leaflet/leaflet.js';
import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import { DynamicScriptLoaderService } from './dynamic-script-loader.service.js';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
	
	constructor(private _dynamicScriptLoader: DynamicScriptLoaderService) {

	}

	ngOnInit() {

		const iconRetinaUrl = 'assets/leaflet/images/marker-icon-2x.png';
		const iconUrl = 'assets/leaflet/images/marker-icon.png';
		const shadowUrl = 'assets/leaflet/images/marker-shadow.png';
		const iconDefault = icon({
			iconRetinaUrl,
			iconUrl,
			shadowUrl,
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			tooltipAnchor: [16, -28],
			shadowSize: [41, 41]
		});
		
		Marker.prototype.options.icon = iconDefault;
		const map = L.map('map').setView([51.505, -0.09], 13);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
		
		// L.Routing.control({
		// 	waypoints: [
		// 		L.latLng(57.74, 11.94),
		// 		L.latLng(57.6792, 11.949)
		// 	]
		// }).addTo(map);

		//pan to location of choice
		map.panTo(new L.LatLng(57.74, 11.94));
		//set markers
		var marker = L.marker([57.74, 11.94]).addTo(map);
		var marker = L.marker([57.6792, 11.949]).addTo(map);
		//add marker on clicking
		map.on("click", function(e){
			var mp = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(map);
			alert(mp.getLatLng());
		});

		this.loadScripts(map);
		// map.addControl( new L.Control.Search({
		// 	url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
		// 	jsonpParam: 'json_callback',
		// 	propertyName: 'display_name',
		// 	propertyLoc: ['lat','lon'],
		// 	marker: L.circleMarker([0,0],{radius:30}),
		// 	autoCollapse: true,
		// 	autoType: false,
		// 	minLength: 2
		// }) );

	}
	
	private loadScripts(map) {
		// You can load multiple scripts by just providing the key as argument into load method of the service
		this._dynamicScriptLoader.load('leaflet-search').then(data => {
			map.addControl( new L.Control.Search({
				url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
				jsonpParam: 'json_callback',
				propertyName: 'display_name',
				propertyLoc: ['lat','lon'],
				marker: L.circleMarker([0,0],{radius:30}),
				autoCollapse: true,
				autoType: false,
				minLength: 2
			}) );
		}).catch(error => console.log(error));
	  }

}