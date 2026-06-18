export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      doctors: {
        Row: {
          id: string;
          slug: string;
          full_name: string;
          qualification: string;
          specialization: string;
          department_id: string;
          experience_years: number;
          languages: string[];
          bio: string;
          education: string[];
          conditions_treated: string[];
          is_active: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["doctors"]["Row"]> & { slug: string; full_name: string };
        Update: Partial<Database["public"]["Tables"]["doctors"]["Row"]>;
      };
      departments: {
        Row: { id: string; slug: string; name: string; description: string; icon: string; created_at: string };
        Insert: Partial<Database["public"]["Tables"]["departments"]["Row"]> & { slug: string; name: string };
        Update: Partial<Database["public"]["Tables"]["departments"]["Row"]>;
      };
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          department_id: string;
          overview: string;
          conditions_treated: string[];
          procedures: string[];
          benefits: string[];
          meta_title: string;
          meta_description: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["services"]["Row"]> & { slug: string; title: string };
        Update: Partial<Database["public"]["Tables"]["services"]["Row"]>;
      };
      health_packages: {
        Row: {
          id: string;
          slug: string;
          title: string;
          price: number;
          tests_count: number;
          description: string;
          benefits: string[];
          tests_included: string[];
          eligibility: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["health_packages"]["Row"]> & { slug: string; title: string };
        Update: Partial<Database["public"]["Tables"]["health_packages"]["Row"]>;
      };
      blogs: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          body: string;
          category_id: string;
          author_doctor_id: string;
          published_at: string;
          meta_title: string;
          meta_description: string;
        };
        Insert: Partial<Database["public"]["Tables"]["blogs"]["Row"]> & { slug: string; title: string };
        Update: Partial<Database["public"]["Tables"]["blogs"]["Row"]>;
      };
      appointments: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string | null;
          doctor_slug: string | null;
          service_slug: string | null;
          package_slug: string | null;
          preferred_date: string;
          preferred_time: string;
          message: string | null;
          status: "pending" | "confirmed" | "cancelled" | "completed";
          created_at: string;
        };
        Insert: {
          full_name: string;
          phone: string;
          email?: string | null;
          doctor_slug?: string | null;
          service_slug?: string | null;
          package_slug?: string | null;
          preferred_date: string;
          preferred_time: string;
          message?: string | null;
          status?: "pending" | "confirmed" | "cancelled" | "completed";
        };
        Update: Partial<Database["public"]["Tables"]["appointments"]["Row"]>;
      };
      contact_enquiries: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string | null;
          subject: string;
          message: string;
          status: "new" | "responded" | "closed";
          created_at: string;
        };
        Insert: {
          full_name: string;
          phone: string;
          email?: string | null;
          subject: string;
          message: string;
          status?: "new" | "responded" | "closed";
        };
        Update: Partial<Database["public"]["Tables"]["contact_enquiries"]["Row"]>;
      };
      lab_bookings: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string | null;
          tests_requested: string;
          home_collection: boolean;
          preferred_date: string;
          address: string | null;
          status: "pending" | "confirmed" | "completed" | "cancelled";
          created_at: string;
        };
        Insert: {
          full_name: string;
          phone: string;
          email?: string | null;
          tests_requested: string;
          home_collection?: boolean;
          preferred_date: string;
          address?: string | null;
          status?: "pending" | "confirmed" | "completed" | "cancelled";
        };
        Update: Partial<Database["public"]["Tables"]["lab_bookings"]["Row"]>;
      };
      package_enquiries: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string | null;
          package_slug: string;
          preferred_date: string;
          status: "pending" | "confirmed" | "cancelled";
          created_at: string;
        };
        Insert: {
          full_name: string;
          phone: string;
          email?: string | null;
          package_slug: string;
          preferred_date: string;
          status?: "pending" | "confirmed" | "cancelled";
        };
        Update: Partial<Database["public"]["Tables"]["package_enquiries"]["Row"]>;
      };
      dg_shipping_bookings: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string | null;
          cdc_number: string | null;
          exam_type: "pre-sea" | "post-sea-renewal" | "trainee";
          preferred_date: string;
          status: "pending" | "confirmed" | "completed" | "cancelled";
          created_at: string;
        };
        Insert: {
          full_name: string;
          phone: string;
          email?: string | null;
          cdc_number?: string | null;
          exam_type: "pre-sea" | "post-sea-renewal" | "trainee";
          preferred_date: string;
          status?: "pending" | "confirmed" | "completed" | "cancelled";
        };
        Update: Partial<Database["public"]["Tables"]["dg_shipping_bookings"]["Row"]>;
      };
      admin_users: {
        Row: { id: string; email: string; full_name: string; role: "admin" | "staff"; created_at: string };
        Insert: { id: string; email: string; full_name: string; role?: "admin" | "staff" };
        Update: Partial<Database["public"]["Tables"]["admin_users"]["Row"]>;
      };
    };
  };
};
