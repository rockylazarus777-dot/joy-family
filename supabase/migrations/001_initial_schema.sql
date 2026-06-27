-- ============================================================
-- Joy Family Multispeciality Clinic — Supabase Initial Schema
-- Compatible with PostgreSQL 15+ / Supabase
--
-- Column names match the toSnakeCase() output in route.ts so
-- inserts work without any server-side field remapping.
--
-- Run this entire file in the Supabase SQL Editor.
-- ============================================================

-- ============================================================
-- EXTENSIONS
-- ============================================================
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";


-- ============================================================
-- UTILITY: updated_at trigger function
-- ============================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- ============================================================
-- 1. PROFILES
-- Auto-created from auth.users on signup.
-- ============================================================
create table public.profiles (
  id          uuid        primary key references auth.users(id) on delete cascade,
  full_name   text,
  email       text,
  phone       text,
  role        text        not null default 'user'
                          check (role in ('admin', 'doctor', 'staff', 'user')),
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;


-- ============================================================
-- HELPER: is_admin() — referenced by all admin RLS policies
-- ============================================================
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;


-- ============================================================
-- TRIGGER: auto-create profile row when a user signs up
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'user')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ============================================================
-- PROFILES RLS POLICIES
-- ============================================================
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Admins full access to profiles"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());


-- ============================================================
-- 2. DEPARTMENTS
-- ============================================================
create table public.departments (
  id          uuid        primary key default gen_random_uuid(),
  name        text        not null,
  slug        text        not null unique,
  description text,
  image       text,
  is_active   boolean     not null default true,
  created_at  timestamptz not null default now()
);

create index idx_departments_slug   on public.departments(slug);
create index idx_departments_active on public.departments(is_active);

alter table public.departments enable row level security;

create policy "Anyone can read active departments"
  on public.departments for select
  using (is_active = true);

create policy "Admins full access to departments"
  on public.departments for all
  using (public.is_admin())
  with check (public.is_admin());


-- ============================================================
-- 3. DOCTORS
-- ============================================================
create table public.doctors (
  id               uuid        primary key default gen_random_uuid(),
  department_id    uuid        references public.departments(id) on delete set null,
  name             text        not null,
  qualification    text,
  specialization   text,
  experience       integer,
  image            text,
  bio              text,
  consultation_fee numeric(10, 2),
  available        boolean     not null default true,
  created_at       timestamptz not null default now()
);

create index idx_doctors_department_id on public.doctors(department_id);
create index idx_doctors_available     on public.doctors(available);

alter table public.doctors enable row level security;

create policy "Anyone can read available doctors"
  on public.doctors for select
  using (available = true);

create policy "Admins full access to doctors"
  on public.doctors for all
  using (public.is_admin())
  with check (public.is_admin());


-- ============================================================
-- 4. APPOINTMENTS
-- Column names match toSnakeCase(appointmentSchema fields):
--   fullName      → full_name
--   doctorSlug    → doctor_slug   (text, not FK — form sends slug not UUID)
--   serviceSlug   → service_slug
--   packageSlug   → package_slug
--   preferredDate → preferred_date
--   preferredTime → preferred_time
-- ============================================================
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


-- ============================================================
-- 5. CONTACT_ENQUIRIES
-- Table name matches formMap: table: "contact_enquiries"
-- Column names match toSnakeCase(contactSchema fields):
--   fullName → full_name
-- ============================================================
create table public.contact_enquiries (
  id         uuid        primary key default gen_random_uuid(),
  full_name  text        not null,
  phone      text        not null,
  email      text,
  subject    text        not null,
  message    text        not null,
  status     text        not null default 'new'
                         check (status in ('new', 'responded', 'closed')),
  created_at timestamptz not null default now()
);

create index idx_contact_enquiries_status  on public.contact_enquiries(status);
create index idx_contact_enquiries_created on public.contact_enquiries(created_at desc);

alter table public.contact_enquiries enable row level security;

create policy "Anyone can submit a contact enquiry"
  on public.contact_enquiries for insert
  with check (true);

create policy "Admins full access to contact enquiries"
  on public.contact_enquiries for all
  using (public.is_admin())
  with check (public.is_admin());


-- ============================================================
-- 6. BLOGS
-- ============================================================
create table public.blogs (
  id          uuid        primary key default gen_random_uuid(),
  title       text        not null,
  slug        text        not null unique,
  excerpt     text,
  content     text,
  cover_image text,
  author      text,
  published   boolean     not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index idx_blogs_slug      on public.blogs(slug);
create index idx_blogs_published on public.blogs(published);
create index idx_blogs_created   on public.blogs(created_at desc);

create trigger blogs_updated_at
  before update on public.blogs
  for each row execute procedure public.set_updated_at();

alter table public.blogs enable row level security;

create policy "Anyone can read published blogs"
  on public.blogs for select
  using (published = true);

create policy "Admins full access to blogs"
  on public.blogs for all
  using (public.is_admin())
  with check (public.is_admin());


-- ============================================================
-- 7. HEALTH_PACKAGES
-- ============================================================
create table public.health_packages (
  id          uuid        primary key default gen_random_uuid(),
  title       text        not null,
  slug        text        not null unique,
  description text,
  price       numeric(10, 2),
  image       text,
  is_active   boolean     not null default true,
  created_at  timestamptz not null default now()
);

create index idx_health_packages_slug   on public.health_packages(slug);
create index idx_health_packages_active on public.health_packages(is_active);

alter table public.health_packages enable row level security;

create policy "Anyone can read active health packages"
  on public.health_packages for select
  using (is_active = true);

create policy "Admins full access to health packages"
  on public.health_packages for all
  using (public.is_admin())
  with check (public.is_admin());


-- ============================================================
-- 8. GALLERY
-- ============================================================
create table public.gallery (
  id         uuid        primary key default gen_random_uuid(),
  title      text        not null,
  category   text,
  image      text,
  created_at timestamptz not null default now()
);

create index idx_gallery_category on public.gallery(category);

alter table public.gallery enable row level security;

create policy "Anyone can read gallery"
  on public.gallery for select
  using (true);

create policy "Admins full access to gallery"
  on public.gallery for all
  using (public.is_admin())
  with check (public.is_admin());


-- ============================================================
-- 9. LAB_BOOKINGS
-- Column names match toSnakeCase(labBookingSchema fields):
--   testsRequested → tests_requested
--   homeCollection → home_collection
--   preferredDate  → preferred_date
-- ============================================================
create table public.lab_bookings (
  id              uuid        primary key default gen_random_uuid(),
  full_name       text        not null,
  phone           text        not null,
  email           text,
  tests_requested text        not null,
  home_collection boolean     not null default false,
  preferred_date  text        not null,
  address         text,
  status          text        not null default 'pending'
                              check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at      timestamptz not null default now()
);

create index idx_lab_bookings_status  on public.lab_bookings(status);
create index idx_lab_bookings_created on public.lab_bookings(created_at desc);

alter table public.lab_bookings enable row level security;

create policy "Anyone can submit a lab booking"
  on public.lab_bookings for insert
  with check (true);

create policy "Admins full access to lab bookings"
  on public.lab_bookings for all
  using (public.is_admin())
  with check (public.is_admin());


-- ============================================================
-- 10. PACKAGE_ENQUIRIES
-- Column names match toSnakeCase(packageEnquirySchema fields):
--   packageSlug   → package_slug  (text, not FK — form sends slug not UUID)
--   preferredDate → preferred_date
-- ============================================================
create table public.package_enquiries (
  id             uuid        primary key default gen_random_uuid(),
  full_name      text        not null,
  phone          text        not null,
  email          text,
  package_slug   text        not null,
  preferred_date text        not null,
  status         text        not null default 'pending'
                             check (status in ('pending', 'confirmed', 'cancelled')),
  created_at     timestamptz not null default now()
);

create index idx_package_enquiries_status  on public.package_enquiries(status);
create index idx_package_enquiries_created on public.package_enquiries(created_at desc);

alter table public.package_enquiries enable row level security;

create policy "Anyone can submit a package enquiry"
  on public.package_enquiries for insert
  with check (true);

create policy "Admins full access to package enquiries"
  on public.package_enquiries for all
  using (public.is_admin())
  with check (public.is_admin());


-- ============================================================
-- 11. DG_SHIPPING_BOOKINGS
-- Column names match toSnakeCase(dgShippingSchema fields):
--   cdcNumber     → cdc_number
--   examType      → exam_type
--   preferredDate → preferred_date
-- ============================================================
create table public.dg_shipping_bookings (
  id             uuid        primary key default gen_random_uuid(),
  full_name      text        not null,
  phone          text        not null,
  email          text,
  cdc_number     text,
  exam_type      text        not null
                             check (exam_type in ('pre-sea', 'post-sea-renewal', 'trainee')),
  preferred_date text        not null,
  status         text        not null default 'pending'
                             check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at     timestamptz not null default now()
);

create index idx_dg_bookings_status  on public.dg_shipping_bookings(status);
create index idx_dg_bookings_created on public.dg_shipping_bookings(created_at desc);

alter table public.dg_shipping_bookings enable row level security;

create policy "Anyone can submit a DG shipping booking"
  on public.dg_shipping_bookings for insert
  with check (true);

create policy "Admins full access to DG shipping bookings"
  on public.dg_shipping_bookings for all
  using (public.is_admin())
  with check (public.is_admin());


-- ============================================================
-- 12. SERVICES
-- ============================================================
create table public.services (
  id                 uuid        primary key default gen_random_uuid(),
  department_id      uuid        references public.departments(id) on delete set null,
  slug               text        not null unique,
  title              text        not null,
  overview           text,
  conditions_treated text[],
  procedures         text[],
  benefits           text[],
  image              text,
  meta_title         text,
  meta_description   text,
  created_at         timestamptz not null default now()
);

create index idx_services_slug          on public.services(slug);
create index idx_services_department_id on public.services(department_id);

alter table public.services enable row level security;

create policy "Anyone can read services"
  on public.services for select
  using (true);

create policy "Admins full access to services"
  on public.services for all
  using (public.is_admin())
  with check (public.is_admin());


-- ============================================================
-- POST-SETUP INSTRUCTIONS
-- 1. Confirm "Email" is enabled under Authentication > Settings.
-- 2. Create your first admin user in Authentication > Users > Add user.
-- 3. Promote them to admin:
--      update public.profiles set role = 'admin' where email = 'your@email.com';
-- ============================================================
