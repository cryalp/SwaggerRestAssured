const express = require("express");

const app = express();
const port = process.env.PORT || "3000";

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.status(200).json(
        {
            "swagger": "2.0",
            "info": {
                "description": "CRYALP GrupChat server.",
                "version": "2.0",
                "title": "CRYALP GrupChat",
                "termsOfService": "http://swagger.io/terms/",
                "contact": {
                    "email": "apiteam@swagger.io"
                },
                "license": {
                    "name": "Apache 2.0",
                    "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
                }
            },
            "host": "chat.cryalp.com",
            "basePath": "/",
            "tags": [
                {
                    "name": "chat",
                    "description": "CRYALP GrupChat v2"
                },
                {
                    "name": "user",
                    "description": "Operations about user",
                    "externalDocs": {
                        "description": "Find out more about our store",
                        "url": "http://swagger.io"
                    }
                }],
            "schemes": ["https", "http"],
            "paths": {
                "/Anasayfa": {
                    "get": {
                        "tags": ["chat"],
                        "summary": "GrupChat v2 Anasayfa",
                        "operationId": "chatAnasayfa",
                        "consumes": ["application/x-www-form-urlencoded"],
                        "produces": ["application/x-www-form-urlencoded"],
                        "responses": {
                            "default": {
                                "description": "successful operation"
                            }
                        }
                    }
                },
                "/Anasayfa/GirisYap": {
                    "post": {
                        "tags": ["chat"],
                        "summary": "GrupChat v2 Giris POST URL",
                        "description": "",
                        "operationId": "chatLoginPost",
                        "consumes": ["application/json"],
                        "produces": ["application/x-www-form-urlencoded"],
                        "parameters": [
                            {
                                "in": "body",
                                "name": "body",
                                "description": "List of user object",
                                "required": true,
                                "schema": {"$ref": "#/definitions/ChatLogin"}
                            }
                        ],
                        "responses": {
                            "default": {
                                "description": "successful operation"
                            }
                        }
                    }
                },
                "/Kullanici": {
                    "get": {
                        "tags": ["chat"],
                        "summary": "GrupChat v2 Kullanici Getir",
                        "operationId": "chatKullaniciGetirGet",
                        "consumes": ["application/x-www-form-urlencoded"],
                        "produces": ["application/json"],
                        "parameters": [
                            {
                                "in": "body",
                                "name": "body",
                                "description": "List of user object",
                                "required": true,
                                "schema": {"$ref": "#/definitions/KullaniciGetir"}
                            }
                        ],
                        "responses": {
                            "default": {
                                "description": "successful operation"
                            }
                        }
                    },
                },

                "/Mesaj": {
                    "get": {
                        "tags": ["chat"],
                        "summary": "GrupChat v2 Mesaj Getir",
                        "operationId": "chatMesajGetirGet",
                        "consumes": ["application/x-www-form-urlencoded"],
                        "produces": ["application/json"],
                        "parameters": [
                            {
                                "name": "OdaAd",
                                "in": "query",
                                "description": "The user name for login",
                                "required": true,
                                "type": "string"
                            }
                        ],
                        "responses": {
                            "default": {
                                "description": "successful operation"
                            }
                        }
                    },
                    "post": {
                        "tags": ["chat"],
                        "summary": "GrupChat v2 Mesaj Getir",
                        "operationId": "chatMesajGetirPost",
                        "consumes": ["application/x-www-form-urlencoded"],
                        "produces": ["application/json"],
                        "parameters": [
                            {
                                "name": "OdaAd",
                                "in": "query",
                                "description": "The user name for login",
                                "required": true,
                                "type": "string"
                            },
                            {
                                "name": "Mesaj",
                                "in": "query",
                                "description": "The password for login in clear text",
                                "required": true,
                                "type": "string"
                            }
                        ],
                        "responses": {
                            "default": {
                                "description": "successful operation"
                            }
                        }
                    }
                },
                /*
                "/user/createWithList": {
                    "post": {
                        "tags": ["user"],
                        "summary": "Creates list of users with given input array",
                        "description": "",
                        "operationId": "createUsersWithListInput",
                        "consumes": ["application/json"],
                        "produces": ["application/json", "application/xml"],
                        "parameters": [{
                            "in": "body",
                            "name": "body",
                            "description": "List of user object",
                            "required": true,
                            "schema": {"type": "array", "items": {"$ref": "#/definitions/User"}}
                        }],
                        "responses": {"default": {"description": "successful operation"}}
                    }
                },
                "/user/{username}": {
                    "get": {
                        "tags": ["user"],
                        "summary": "Get user by user name",
                        "description": "",
                        "operationId": "getUserByName",
                        "produces": ["application/json", "application/xml"],
                        "parameters": [{
                            "name": "username",
                            "in": "path",
                            "description": "The name that needs to be fetched. Use user1 for testing. ",
                            "required": true,
                            "type": "string"
                        }],
                        "responses": {
                            "200": {"description": "successful operation", "schema": {"$ref": "#/definitions/User"}},
                            "400": {"description": "Invalid username supplied"},
                            "404": {"description": "User not found"}
                        }
                    },
                    "put": {
                        "tags": ["user"],
                        "summary": "Updated user",
                        "description": "This can only be done by the logged in user.",
                        "operationId": "updateUser",
                        "consumes": ["application/json"],
                        "produces": ["application/json", "application/xml"],
                        "parameters": [{"name": "username", "in": "path", "description": "name that need to be updated", "required": true, "type": "string"}, {
                            "in": "body",
                            "name": "body",
                            "description": "Updated user object",
                            "required": true,
                            "schema": {"$ref": "#/definitions/User"}
                        }],
                        "responses": {"400": {"description": "Invalid user supplied"}, "404": {"description": "User not found"}}
                    },
                    "delete": {
                        "tags": ["user"],
                        "summary": "Delete user",
                        "description": "This can only be done by the logged in user.",
                        "operationId": "deleteUser",
                        "produces": ["application/json", "application/xml"],
                        "parameters": [{"name": "username", "in": "path", "description": "The name that needs to be deleted", "required": true, "type": "string"}],
                        "responses": {"400": {"description": "Invalid username supplied"}, "404": {"description": "User not found"}}
                    }
                },
                "/user/login": {
                    "get": {
                        "tags": ["user"],
                        "summary": "Logs user into the system",
                        "description": "",
                        "operationId": "loginUser",
                        "produces": ["application/json", "application/xml"],
                        "parameters": [
                            {
                                "name": "username",
                                "in": "query",
                                "description": "The user name for login",
                                "required": true,
                                "type": "string"
                            },
                            {
                                "name": "password",
                                "in": "query",
                                "description": "The password for login in clear text",
                                "required": true,
                                "type": "string"
                            }],
                        "responses": {
                            "200": {
                                "description": "successful operation",
                                "headers": {
                                    "X-Expires-After": {"type": "string", "format": "date-time", "description": "date in UTC when token expires"},
                                    "X-Rate-Limit": {"type": "integer", "format": "int32", "description": "calls per hour allowed by the user"}
                                },
                                "schema": {"type": "string"}
                            }, "400": {"description": "Invalid username/password supplied"}
                        }
                    }
                },
                "/user/logout": {
                    "get": {
                        "tags": ["user"],
                        "summary": "Logs out current logged in user session",
                        "description": "",
                        "operationId": "logoutUser",
                        "produces": ["application/json", "application/xml"],
                        "parameters": [],
                        "responses": {"default": {"description": "successful operation"}}
                    }
                },
                "/user": {
                    "post": {
                        "tags": ["user"],
                        "summary": "Create user",
                        "description": "This can only be done by the logged in user.",
                        "operationId": "createUser",
                        "consumes": ["application/json"],
                        "produces": ["application/json", "application/xml"],
                        "parameters": [{"in": "body", "name": "body", "description": "Created user object", "required": true, "schema": {"$ref": "#/definitions/User"}}],
                        "responses": {"default": {"description": "successful operation"}}
                    }
                },
                 */
            },
            "securityDefinitions": {
                "api_key": {
                    "type": "apiKey",
                    "name": "api_key",
                    "in": "header"
                },
                "petstore_auth": {
                    "type": "oauth2",
                    "authorizationUrl": "https://petstore.swagger.io/oauth/authorize",
                    "flow": "implicit",
                    "scopes": {
                        "read:pets": "read your pets",
                        "write:pets": "modify pets in your account"
                    }
                }
            },
            "definitions": {
                "ChatLogin": {
                    "type": "object",
                    "properties": {
                        "EPosta": {"type": "string"},
                        "Sifre": {"type": "string"}
                    }
                },

                "KullaniciGetir": {
                    "type": "object",
                    "properties": {
                        "KullaniciAd": {"type": "string"}
                    }
                },

                "User": {
                    "type": "object",
                    "properties": {
                        "id": {"type": "integer", "format": "int64"},
                        "username": {"type": "string"},
                        "firstName": {"type": "string"},
                        "lastName": {"type": "string"},
                        "email": {"type": "string"},
                        "password": {"type": "string"},
                        "phone": {"type": "string"},
                        "userStatus": {"type": "integer", "format": "int32", "description": "User Status"}
                    },
                    "xml": {"name": "User"}
                }
            },
            "externalDocs": {
                "description": "GrupChat v2",
                "url": "https://chat.cryalp.com"
            }
        });
})
;

