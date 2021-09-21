import React, { Component } from 'react';
import '../../App.css';

class GoogleMap extends Component {
    render() {
        return (
            <div className="google-map">
                <iframe 
                    title="map"
                   
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.215693038037!2d106.78957711462157!3d10.871192760410452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOw7RuZyBMw6JtIFRwLiBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1627189812731!5m2!1svi!2s" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    aria-hidden="false" 
                    tabIndex="0"/>
            </div>
        );
    }
}

export default GoogleMap;