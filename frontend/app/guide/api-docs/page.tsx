"use client";

import React, { useState, useEffect } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import letsvoteapiData from "../../../public/letsvoteapi.json";

export default function Page() {
    // const [apiData, setApiData] = useState("");

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(
    //                 `https://app.swaggerhub.com/apis/ALESSANDROTAMBELLINI/letsvote-open_api_3_0/1.0.0`
    //             );
    //             const result = await response.text();
    //             setApiData(result);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []); // Empty dependency array ensures this runs once on component mount

    return (
        <>
            <h1 className="sr-only">letsvote API documentation</h1>
            <SwaggerUI spec={letsvoteapiData} />
            {/* <SwaggerUI url="https://app.swaggerhub.com/apis/ALESSANDROTAMBELLINI/letsvote-open_api_3_0/1.0.0"></SwaggerUI> */}
        </>
    );
}
