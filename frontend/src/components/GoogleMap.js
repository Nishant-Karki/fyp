import React from "react";
import GoogleMapReact from "google-map-react";

export default function GoogleMap() {
  const defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 11,
  };

  return (
    <div style={{ height: "40rem", width: "40rem" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBqQPtpm_lwyk1MHO0WFOtt-nVrhuo7fvQ",
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <div lat={59.955413} lng={30.337844} text="Myaaaaaa">
          {" "}
          sadads
        </div>
      </GoogleMapReact>
    </div>
  );
}
