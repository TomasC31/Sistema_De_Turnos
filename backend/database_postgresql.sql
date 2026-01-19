-- Script para crear la base de datos y tablas en PostgreSQL

-- Crear la base de datos (ejecutar esto primero desde psql o pgAdmin)
-- CREATE DATABASE sistemaTurnos;

-- Conectarse a la base de datos sistemaTurnos y luego ejecutar lo siguiente:

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'usuario'
);

-- Tabla de reservas
CREATE TABLE IF NOT EXISTS reservas (
    id SERIAL PRIMARY KEY,
    nombreCliente VARCHAR(100) NOT NULL,
    fechaReserva DATE NOT NULL,
    horarioElegido VARCHAR(50) NOT NULL,
    UNIQUE(fechaReserva, horarioElegido)
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_reservas_fecha_horario ON reservas(fechaReserva, horarioElegido);
CREATE INDEX IF NOT EXISTS idx_reservas_nombreCliente ON reservas(nombreCliente);
