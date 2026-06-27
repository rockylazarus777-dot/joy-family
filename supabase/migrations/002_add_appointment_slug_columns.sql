-- ============================================================
-- Migration 002: Add missing slug columns to appointments
--
-- The appointments table was originally created without
-- doctor_slug, service_slug, and package_slug.  This migration
-- adds them as nullable text columns so the insert payload from
-- the notification API is accepted without PGRST204 errors.
-- ============================================================

alter table public.appointments
  add column if not exists doctor_slug  text,
  add column if not exists service_slug text,
  add column if not exists package_slug text;
