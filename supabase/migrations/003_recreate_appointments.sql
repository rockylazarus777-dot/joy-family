-- ============================================================
-- Migration 003: Definitive appointments table
--
-- The appointments table ended up with wrong or missing columns
-- (PGRST204 on both doctor_slug and full_name).  This migration
-- drops the table and recreates it with the exact schema the
-- insert payload expects.
--
-- Safe to run on a dev/staging project with no real bookings.
-- If you have live data, back up the table first.
-- ============================================================

-- Drop the broken table (cascade removes indexes, triggers, policies)
drop table if exists public.appointments cascade;

-- Recreate with the correct schema
create table public.appointments (
  id             uuid        primary key default gen_random_uuid(),
  full_name      text        not null,
  phone          text        not null,
  email          text,
  doctor_slug    text,
  service_slug   text,
  package_slug   text,
  preferred_date text        not null,
  preferred_time text        not null,
  message        text,
  status         text        not null default 'pending'
                             check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at     timestamptz not null default now()
);

create index idx_appointments_status  on public.appointments(status);
create index idx_appointments_date    on public.appointments(preferred_date);
create index idx_appointments_created on public.appointments(created_at desc);

alter table public.appointments enable row level security;

create policy "Anyone can book an appointment"
  on public.appointments for insert
  with check (true);

create policy "Admins full access to appointments"
  on public.appointments for all
  using (public.is_admin())
  with check (public.is_admin());
