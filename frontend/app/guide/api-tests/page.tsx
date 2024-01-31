"use client";

import React, { useState, useEffect } from "react";

export default function Page() {
    const [testsHTML, setTestsHTML] = useState("<p>ciao</p>");

    return (
        <main>
            <h1 className="sr-only">letsvote API tests</h1>
            <p>test</p>
            <div dangerouslySetInnerHTML={{ __html: testsHTML }} />
        </main>
    );
}
