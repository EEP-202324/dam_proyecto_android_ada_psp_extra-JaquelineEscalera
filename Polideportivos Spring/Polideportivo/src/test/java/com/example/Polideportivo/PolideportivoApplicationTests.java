package com.example.Polideportivo;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URI;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;

import net.minidev.json.JSONArray;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
class PolideportivoApplicationTests {
	@Autowired
	TestRestTemplate restTemplate;

	@Test
	void shouldReturnAPolideportivoWhenDataIsSaved() {
		ResponseEntity<String> response = restTemplate.getForEntity("/polideportivos/1", String.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

		DocumentContext documentContext = JsonPath.parse(response.getBody());
		Number id = documentContext.read("$.id");
		assertThat(id).isEqualTo(1);

		String nombre = documentContext.read("$.nombre");
		assertThat(nombre).isEqualTo("Polideportivo Vallehermoso");

		String ciudad = documentContext.read("$.ciudad");
		assertThat(ciudad).isEqualTo("Madrid");

		String estado = documentContext.read("$.estado");
		assertThat(estado).isEqualTo("Madrid");
	}

	@Test
	void shouldNotReturnAPolideportivoWithAnUnknownId() {
		ResponseEntity<String> response = restTemplate.getForEntity("/polideportivos/999", String.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
		assertThat(response.getBody()).isBlank();
	}

	@Test
	@DirtiesContext
	void shouldCreateANewPolideportivo() {
		Polideportivo newPolideportivo = new Polideportivo(29L, "nombre", "ciudad", "estado");
		ResponseEntity<Void> createResponse = restTemplate.postForEntity("/polideportivos", newPolideportivo,
				Void.class);

		assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);

		URI locationOfNewPolideportivo = createResponse.getHeaders().getLocation();
		ResponseEntity<String> getResponse = restTemplate.getForEntity(locationOfNewPolideportivo, String.class);
		assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	void shouldReturnAllPolideportivoWhenListIsRequested() {
		ResponseEntity<String> response = restTemplate.getForEntity("/polideportivos", String.class);
		
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

		DocumentContext documentContext = JsonPath.parse(response.getBody());
		int polideportivoCount = documentContext.read("$.length()");
		assertThat(polideportivoCount).isEqualTo(4);

		JSONArray ids = documentContext.read("$..id");
		assertThat(ids).containsExactlyInAnyOrder(1, 3);

		JSONArray nombres = documentContext.read("$..nombre");
		assertThat(nombres).containsExactlyInAnyOrder("Polideportivo Vallehermoso", "Polideportivo Municipal Barajas");

		JSONArray ciudades = documentContext.read("$..ciudad");
		assertThat(ciudades).containsExactlyInAnyOrder("Madrid", "Barajas");

		JSONArray estados = documentContext.read("$..estado");
		assertThat(estados).containsExactlyInAnyOrder("Madrid", "Madrid");
	}


	@Test
	@DirtiesContext
	void shouldUpdateAnExistingPolideportivo() {
		Polideportivo polideportivoUpdate = new Polideportivo(1L, "Polideportivo Vallehermoso", "Madrid"
	,"Madrid");
		HttpEntity<Polideportivo> request = new HttpEntity<>(polideportivoUpdate);
		ResponseEntity<Void> response = restTemplate.exchange("/polideportivos/1", HttpMethod.PUT, request, Void.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);

		ResponseEntity<String> getResponse = restTemplate.getForEntity("/polideportivos/1", String.class);
		assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		DocumentContext documentContext = JsonPath.parse(getResponse.getBody());
		Number id = documentContext.read("$.id");
		String nombre = documentContext.read("$.nombre");
		String ciudad = documentContext.read("$.ciudad");
		String estado = documentContext.read("$.estado");
		assertThat(id).isEqualTo(1);
		assertThat(nombre).isEqualTo("Polideportivo Vallehermoso");
		assertThat(ciudad).isEqualTo("Madrid");
		assertThat(estado).isEqualTo("Madrid");
	}
	
	@Test
	void shouldNotUpdateAPolideportivoThatDoesNotExist() {
		Polideportivo unknownCard = new  Polideportivo(null, "Debla", null, null);
	    HttpEntity< Polideportivo> request = new HttpEntity<>(unknownCard);
	    ResponseEntity<Void> response = restTemplate
	            .exchange("/ polideportivos/99999", HttpMethod.PUT, request, Void.class);
	    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
	}
	
	@Test
	@DirtiesContext
	void shouldDeleteAnExistingPolideportivo() {
	    ResponseEntity<Void> response = restTemplate
	            .exchange("/polideportivos/2", HttpMethod.DELETE, null, Void.class);
	    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
	    
	 // Add the following code:
	    ResponseEntity<String> getResponse = restTemplate
	            .getForEntity("/polideportivos/2", String.class);
	    assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
	}
}

