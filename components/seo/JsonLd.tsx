const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.joyfmsclinic.com";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MedicalClinic", "LocalBusiness"],
      "@id": `${siteUrl}/#clinic`,
      name: "Joy Family Multispeciality Clinic",
      alternateName: "Joy FMS Clinic",
      description:
        "Comprehensive multispeciality healthcare clinic in Villivakkam, Chennai. Expert doctors, diagnostics, pharmacy, health packages, and DG shipping medical examinations.",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo/joy-logo.png`,
        width: 300,
        height: 80,
      },
      image: `${siteUrl}/images/fav.icon/og-image.jpg`,
      telephone: ["+91-8778040424", "+91-8122277200"],
      email: "info@joyfmsclinic.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "No. 10/4, Samiyar Thottam",
        addressLocality: "Villivakkam",
        addressRegion: "Tamil Nadu",
        postalCode: "600049",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "13.0875",
        longitude: "80.2021",
      },
      hasMap: "https://maps.google.com/?q=Villivakkam+West,+Chennai",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "13:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "18:00",
          closes: "21:00",
        },
      ],
      priceRange: "$$",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, UPI, Credit Card, Debit Card",
      medicalSpecialty: [
        "ENT",
        "Family Medicine",
        "Anaesthesia & Pain Management",
        "Paediatrics",
        "Gynaecology",
        "Dental Care",
        "Diabetes & Endocrinology",
        "Orthopaedics",
        "Dermatology",
        "General Surgery",
      ],
      sameAs: [],
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Joy Family Multispeciality Clinic",
      url: siteUrl,
      logo: `${siteUrl}/images/logo/joy-logo.png`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-8778040424",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Tamil", "Hindi"],
      },
    },
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
