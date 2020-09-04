package com.example.springboot;

import io.restassured.RestAssured;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import java.util.HashMap;

@SpringBootTest
public class HelloControllerTest {
    @Test
    public void getHello() throws Exception {
        String jsonHostURL = "http://localhost:3000";
        java.io.InputStream is = new java.net.URL(jsonHostURL).openStream();
        JSONObject contents = new JSONObject(new String(is.readAllBytes()));
        JSONObject pathList = contents.optJSONObject("paths");

        String baseURL = "http://localhost:8080";
        String parametersTestValue = "TEST";

        //noinspection unchecked
        pathList.keys().forEachRemaining(pathKey -> {
            JSONObject pathValue = pathList.optJSONObject(pathKey.toString());
            System.out.println(pathKey);
            //noinspection unchecked
            pathValue.keys().forEachRemaining(methodKey -> {
                System.err.println("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

                JSONObject methodValue = pathValue.optJSONObject(methodKey.toString());
                JSONArray parameterList = methodValue.optJSONArray("parameters");

                System.out.println(methodKey);

                RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
                if (parameterList != null) {
                    HashMap<String, String> params = new HashMap<>();
                    if (parameterList.optJSONObject(0).optString("name").equals("body")) {
                        String[] schemaRefDefinitions = parameterList.optJSONObject(0).optJSONObject("schema").optString("$ref").split("/");
                        //noinspection unchecked
                        contents.optJSONObject("definitions")
                                .optJSONObject(schemaRefDefinitions[schemaRefDefinitions.length - 1])
                                .optJSONObject("properties").keys()
                                .forEachRemaining(parameter -> params.put(parameter.toString(), parametersTestValue));
                    } else {
                        for (int cnt = 0; cnt < parameterList.length(); cnt++) {
                            params.put(parameterList.optJSONObject(cnt).optString("name"), parametersTestValue);
                        }
                    }
                    RestAssured
                            .given()
                            .params(params)
                            .when()
                            .request(methodKey.toString().toUpperCase(), baseURL + pathKey.toString())
                            .then()
                            .statusCode(HttpStatus.OK.value());
                } else {
                    RestAssured
                            .when()
                            .request(methodKey.toString().toUpperCase(), baseURL + pathKey.toString())
                            .then()
                            .statusCode(HttpStatus.OK.value());
                }
            });
            System.out.println("----------------------------------------------------------------------------");
        });
    }
}
