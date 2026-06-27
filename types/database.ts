export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          phone: string | null;
          role: "admin" | "doctor" | "staff" | "user";
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          phone?: string | null;
          role?: "admin" | "doctor" | "staff" | "user";
          avatar_url?: string | null;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["profiles"]["Row"], "id">>;
      };

      departments: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          name: string;
          slug: string;
          description?: string | null;
          image?: string | null;
          is_active?: boolean;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["departments"]["Row"], "id" | "created_at">>;
      };

      doctors: {
        Row: {
          id: string;
          department_id: string | null;
          name: string;
          qualification: string | null;
          specialization: string | null;
          experience: number | null;
          image: string | null;
          bio: string | null;
          consultation_fee: number | null;
          available: boolean;
          created_at: string;
        };
        Insert: {
          department_id?: string | null;
          name: string;
          qualification?: string | null;
          specialization?: string | null;
          experience?: number | null;
          image?: string | null;
          bio?: string | null;
          consultation_fee?: number | null;
          available?: boolean;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["doctors"]["Row"], "id" | "created_at">>;
      };

      // Column names match toSnakeCase() output from appointmentSchema camelCase fields
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
        Update: Partial<Omit<Database["public"]["Tables"]["appointments"]["Row"], "id" | "created_at">>;
      };

      // Table name matches formMap: table: "contact_enquiries"
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
        Update: Partial<Omit<Database["public"]["Tables"]["contact_enquiries"]["Row"], "id" | "created_at">>;
      };

      blogs: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string | null;
          cover_image: string | null;
          author: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: string | null;
          cover_image?: string | null;
          author?: string | null;
          published?: boolean;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["blogs"]["Row"], "id" | "created_at">>;
      };

      health_packages: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          price: number | null;
          image: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          title: string;
          slug: string;
          description?: string | null;
          price?: number | null;
          image?: string | null;
          is_active?: boolean;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["health_packages"]["Row"], "id" | "created_at">>;
      };

      gallery: {
        Row: {
          id: string;
          title: string;
          category: string | null;
          image: string | null;
          created_at: string;
        };
        Insert: {
          title: string;
          category?: string | null;
          image?: string | null;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["gallery"]["Row"], "id" | "created_at">>;
      };

      // Column names match toSnakeCase() output from labBookingSchema
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
        Update: Partial<Omit<Database["public"]["Tables"]["lab_bookings"]["Row"], "id" | "created_at">>;
      };

      // Column names match toSnakeCase() output from packageEnquirySchema
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
        Update: Partial<Omit<Database["public"]["Tables"]["package_enquiries"]["Row"], "id" | "created_at">>;
      };

      // Column names match toSnakeCase() output from dgShippingSchema
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
        Update: Partial<Omit<Database["public"]["Tables"]["dg_shipping_bookings"]["Row"], "id" | "created_at">>;
      };

      services: {
        Row: {
          id: string;
          department_id: string | null;
          slug: string;
          title: string;
          overview: string | null;
          conditions_treated: string[] | null;
          procedures: string[] | null;
          benefits: string[] | null;
          image: string | null;
          meta_title: string | null;
          meta_description: string | null;
          created_at: string;
        };
        Insert: {
          department_id?: string | null;
          slug: string;
          title: string;
          overview?: string | null;
          conditions_treated?: string[] | null;
          procedures?: string[] | null;
          benefits?: string[] | null;
          image?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["services"]["Row"], "id" | "created_at">>;
      };
    };

    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
  };
};
