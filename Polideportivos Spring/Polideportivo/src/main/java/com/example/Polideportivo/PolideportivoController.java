package com.example.Polideportivo;

import java.net.URI;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/polideportivos")
class PolideportivoController {
	private final PolideportivoRepository polideportivoRepository;

	private PolideportivoController(PolideportivoRepository polideportivoRepository) {
		this.polideportivoRepository = polideportivoRepository;
	}
	@GetMapping("/{requestedId}")
	private ResponseEntity<Polideportivo> findById(@PathVariable Long requestedId) {
		Optional<Polideportivo> polideportivoOptional = polideportivoRepository.findById(requestedId);
		if (polideportivoOptional.isPresent()) {
		 return ResponseEntity.ok(polideportivoOptional.get());
		 } else {
		        return ResponseEntity.notFound().build();
		    }
		
		}
		@PostMapping
		private ResponseEntity<Void> createPolideportivo(@RequestBody Polideportivo newPolideportivoRequest, UriComponentsBuilder ucb) {
			   Polideportivo savedPolideportivo = polideportivoRepository.save(newPolideportivoRequest);
			   URI locationOfNewPolideportivo = ucb
			            .path("polideportivos/{id}")
			            .buildAndExpand(savedPolideportivo.getId())
			            .toUri();		  
			   return ResponseEntity.created(locationOfNewPolideportivo).build();
		 }
		
		@GetMapping()
		private ResponseEntity<Iterable<Polideportivo>> findAll() {
		   return ResponseEntity.ok(polideportivoRepository.findAll());
		}
		
		@PutMapping("/{requestedId}")
		public ResponseEntity<Void> putPolideportivo(@PathVariable Long requestedId, @RequestBody Polideportivo polideportivoActualizada) {
		    Optional<Polideportivo> optional = polideportivoRepository.findById(requestedId);
		    if (optional.isPresent()) {
		    	Polideportivo polideportivo = optional.get();
		    	polideportivo.setNombre(polideportivoActualizada.getNombre()); 
		    	polideportivo.setCiudad(polideportivoActualizada.getCiudad()); 
		    	polideportivo.setEstado(polideportivoActualizada.getEstado()); 
		    	polideportivoRepository.save(polideportivo);
		        return ResponseEntity.noContent().build();
		    } else {
		        return ResponseEntity.notFound().build();
		    }
		}
		
		@DeleteMapping("/{id}")
		private ResponseEntity<Void> deleteUniversidad(@PathVariable Long id) {
			polideportivoRepository.deleteById(id); // Add this line
			return ResponseEntity.noContent().build();
		}
	}
