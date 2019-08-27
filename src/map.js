import React from "react";
import L from "leaflet";
import borderData from "./border.js";
import leafletPip from "@mapbox/leaflet-pip";

const style = {
    width: "50%",
    height: "600px"
}

class Map extends React.Component {
    componentDidMount() {
        this.map = L.map("map", {
            center: [43.89, -72.717],
            zoom: 8,
            layers: [
                L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                }),

                    ]
        })
        L.geoJSON(borderData).addTo(this.map)
    }
        componentDidUpdate({latLong}) {
            if (this.props.latLong !== latLong) {
                this.map.setView(this.props.latLong, 18);
            }
        }
render() {
    return <div id="map" style={style} />;
    }
}

export default Map;