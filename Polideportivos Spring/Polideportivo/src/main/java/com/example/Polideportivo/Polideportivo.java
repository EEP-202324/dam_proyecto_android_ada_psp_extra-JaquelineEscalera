package com.example.Polideportivo;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Polideportivo {
	
	@Id
	@GeneratedValue
	private Long id;
	private String nombre;
	private String ciudad;
	private String estado;
	private String foto;
	
	public Polideportivo() {
	}

	public Polideportivo(Long id, String nombre, String ciudad, String estado, String foto) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.ciudad = ciudad;
		this.estado = estado;
		this.foto = foto;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getCiudad() {
		return ciudad;
	}

	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	public void setFoto(String foto) {
		this.foto = foto;
	}
	@Override
	public String toString() {
		return "Polideportivo [id=" + id + ", nombre=" + nombre + ", ciudad=" + ciudad + ", estado=" + estado + ", foto=" + foto +"]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(ciudad, estado, id, nombre, foto);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Polideportivo other = (Polideportivo) obj;
		return Objects.equals(ciudad, other.ciudad) && Objects.equals(estado, other.estado)
				&& Objects.equals(id, other.id) && Objects.equals(nombre, other.nombre)&& Objects.equals(foto, other.foto);
	}

}
