import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        version: "v1.0.0",
        title: "Swagger Demo Project",
        description: "Implementation of Swagger with TypeScript"
    },
    servers: [
        {
            url: "http://localhost:8080",
            description: ""
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            }
        }
    }
};

const outputFile = "./swagger.json";
const endpointsFiles = [
    "./routes/auth.router.ts",
    "./routes/event.router.ts",
    "./routes/request.router.ts",
    "./routes/test.router.ts",
    "./routes/user.router.ts",
    "./routes/vote.router.ts",
];

swaggerAutogen({openapi: "3.0.0"})(outputFile, endpointsFiles, doc);
