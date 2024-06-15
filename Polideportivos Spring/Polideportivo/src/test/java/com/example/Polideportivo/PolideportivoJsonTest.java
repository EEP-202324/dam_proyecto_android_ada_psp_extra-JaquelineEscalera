package com.example.Polideportivo;

import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.boot.test.json.JacksonTester;

import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;

@JsonTest
public class PolideportivoJsonTest {

	@Autowired
	private JacksonTester<Polideportivo> json;

	 @Autowired
	    private JacksonTester<Polideportivo[]> jsonList;

	    private Polideportivo[] polideportivos;

	    @BeforeEach
	    void setUp() {
	    	polideportivos = Arrays.array(
	                new Polideportivo(1L, "Polideportivo Vallehermoso", "Madrid","Madrid"),
	                new Polideportivo(2L, "Polideportivo Municipal Barajas","Barajas", "Madrid"),
	                new Polideportivo(3L, "Polideportivo San Juan","Alicante", "Valencia"));
	    }
	    
	@Test
	void polideportivoSerializationTest() throws IOException {
		Polideportivo polideportivo = new Polideportivo(1L,"Polideportivo Vallehermoso", "Madrid","Madrid");
		assertThat(json.write(polideportivo)).isStrictlyEqualToJson("expected.json");
		assertThat(json.write(polideportivo)).hasJsonPathNumberValue("@.id");
		assertThat(json.write(polideportivo)).extractingJsonPathNumberValue("@.id").isEqualTo(1);
		assertThat(json.write(polideportivo)).hasJsonPathStringValue("@.nombre");
		assertThat(json.write(polideportivo)).extractingJsonPathStringValue("@.nombre").isEqualTo("Polideportivo Vallehermoso");
		assertThat(json.write(polideportivo)).hasJsonPathStringValue("@.ciudad");
		assertThat(json.write(polideportivo)).extractingJsonPathStringValue("@.ciudad").isEqualTo("Madrid");
		assertThat(json.write(polideportivo)).hasJsonPathStringValue("@.estado");
		assertThat(json.write(polideportivo)).extractingJsonPathStringValue("@.estado").isEqualTo("Madrid");
	}

	@Test
	void polideportivoDeserializationTest() throws IOException {
		String expected = """
				{
				    "id":1,
				    "nombre":"Polideportivo Vallehermoso",
				    "ciudad":"Madrid",
				    "estado":"Madrid"	    
				}
				""";
		assertThat(json.parse(expected)).isEqualTo(new Polideportivo(1L,"Polideportivo Vallehermoso", "Madrid","Madrid"));
		assertThat(json.parseObject(expected).getId()).isEqualTo(1);
		assertThat(json.parseObject(expected).getNombre()).isEqualTo("Polideportivo Vallehermoso");
		assertThat(json.parseObject(expected).getCiudad()).isEqualTo("Madrid");
		assertThat(json.parseObject(expected).getEstado()).isEqualTo("Madrid");
	}
	
	@Test
	void polideportivoListSerializationTest() throws IOException {
		 String expected="""
		      [
  {"id": 1, "nombre":"Polideportivo Vallehermoso","ciudad":"Madrid", "estado":"Madrid" },
  {"id": 2, "nombre":"Polideportivo Municipal Barajas","ciudad":"Barajas", "estado":"Madrid" },
  {"id": 3, "nombre":"Polideportivo San Juan","ciudad":"Alicante", "estado":"Valencia"  }
]
		         """;
		   assertThat(jsonList.parse(expected)).isEqualTo(polideportivos);
		}
	}
