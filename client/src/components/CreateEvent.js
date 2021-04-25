import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import { GoogleMap, useJsApiLoader, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios'

const containerStyle = {
  width: '1000px',
  height: '700px'
};

const center = {
  lat: 28.602390961140763,
  lng: -81.20016195094244
};

function CreateEvent() {
  const [latLong, getLatLong1] = useState({lat: "", long: ""});

  const [markers, setMarkers] = useState([]);

  const [details, setDetails] = useState({EventsEmail: "", EventsName: "", EventType: "", EventsPhone: "", EventCategory: "", 
                                          EventLat: "", EventLon: "", EventsDesc: "", EventDate: "", EventsTime: ""});

  const getLatLng = e => {
    getLatLong1({...latLong, lat: e.latLng.lat(), long: e.latLng.lng()});
    setDetails({...latLong, lat: e.latLng.lat(), long: e.latLng.lng()});
    console.log(latLong)
  }

  const submitHandler = e => {
    e.preventDefault();
    console.log(details);
    createEvent(details, markers)
  }

  const createEvent = (details, markers) => {
    details.EventLat = markers.lat;
    details.EventLon = markers.lng;

    console.log(details);
     // TODO: Put in DataBase
    axios.post("Events/createEvent", details).then(response => {
        if (response.data == "Created Event") {
            routeChange();
            console.log(response.data)
        }else {
            console.log(response.data)
        }
    });
  }

  const history = useHistory();

  const routeChange  = () => {
    history.push("./mainPage")
}
  
  return (
    <form className="CreateEvent" onSubmit={submitHandler}>
      <div className="form-inner">    
          <h2> Create Event </h2>
          {/* {(error != "") ? ( <div className="error">{error}</div> ) : ""} */}
          <div className="box">
              <div className="form-group">
                  <label>Event Name: </label>
                  <input
                  type="EventName"
                  name="EventName"
                  className="register-input"
                  placeholder="Event Name"
                  id="Event Name"
                  onChange={e => setDetails({...details, EventsName: e.target.value})} value={details.EventsName} />
              </div>

              <div className="form-group">
                  <label>Event Category: </label>
                  <input
                  type="EventCategory"
                  name="EventCategory"
                  className="register-input"
                  placeholder="Event Category"
                  id="EventCategory"
                  onChange={e => setDetails({...details, EventCategory: e.target.value})} value={details.EventCategory} />
              </div>

              <div className="u-form-group u-form-radiobutton u-form-group-3">
                <h6> Event Type </h6>
                <div className="radio"> 
                    <label className="u-label" htmlFor="radio">Public </label>
                        <input id="Public" type="radio" onChange={e => setDetails({...details, EventType: "Public"})} checked={details.EventType == "Public"} />                        
                    <br/>
                    <label className="u-label" htmlFor="radio">Private </label>
                        <input id="Private" type="radio" onChange={e => setDetails({...details, EventType: "Private"})} checked={details.EventType == "Private"}/>                        
                    <br/>
                    <label className="u-label" htmlFor="radio">RSO </label>
                        <input id="RSO" type="radio" onChange={e => setDetails({...details, EventType: "RSO"})} checked={details.EventType == "RSO"}/>
                    <br/>
                </div>
              </div>

              <div className="form-group">
                  <label htmlFor="email">Contact Email: </label>
                  <input
                  type="email"
                  name="email"
                  className="register-input"
                  placeholder="Event Email"
                  id="email"
                  onChange={e => setDetails({...details, EventsEmail: e.target.value})} value={details.EventsEmail} />
              </div>

              <div className="form-group">
                  <label>Contact Phone Number: </label>
                  <input
                  type="string"
                  name="phonenumber"
                  className="register-input"
                  placeholder="Phone #"
                  id="phoneNumber"
                  onChange={e => setDetails({...details, EventsPhone: e.target.value})} value={details.EventsPhone} 
                  />
              </div>

              <div className="form-group">
                  <label>Event Description: </label>
                  <input
                  type="eventDescription"
                  name="eventDescription"
                  className="register-input"
                  placeholder="Give a short description"
                  id="eventDescription"
                  onChange={e => setDetails({...details, EventsDesc: e.target.value})} value={details.EventsDesc} />
              </div>

              <div className="form-group">
                  <label>Date: </label>
                  <input
                  type="Date"
                  name="Date"
                  className="register-input"
                  placeholder=""
                  id="eventDescription"
                  onChange={e => setDetails({...details, EventDate: e.target.value})} value={details.EventDate} />
              </div>

              <div className="form-group">
                  <label>time: </label>
                  <input
                  type="time"
                  name="time"
                  className="register-input"
                  placeholder=""
                  id="eventDescription"
                  onChange={e => setDetails({...details, EventsTime: e.target.value})} value={details.EventsTime} />
              </div>

              <input type="submit" value="CREATE EVENT"/>
              <input type="button" value="RETURN" onClick={routeChange}/>

          </div>
        </div>
        <div className="Map-inner">  
            <LoadScript
            googleMapsApiKey='AIzaSyD_v1fW8ItPVq4FBsJt_xZVbiH7-732AIs'>
              <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={17}
                center={center}
                onClick={e => {
                  setMarkers((current) => [
                    ...current, 
                    {
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng(),
                      time: new Date(),
                    },
                  ]);
                }}
              >
                {markers.map((marker) => (
                  <Marker
                    position={{ lat: marker.lat, lng: marker.lng }}
                    key={marker.time.toISOString()}
                  />
                ))}
            </GoogleMap>
          </LoadScript>
        </div>
    </form>
   )
}

export default CreateEvent