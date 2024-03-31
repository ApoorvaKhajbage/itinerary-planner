'use client'
import React, { useEffect, useState } from 'react'
import {Loader} from '@googlemaps/js-api-loader'

export default function GoogleMaps() {
    const mapRef = React.useRef(null);

   useEffect(() => {
    const initializeMap = () => {
        const loader = new Loader(
            {
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: "weekly", 
            }
        );
        
    }

   });

}