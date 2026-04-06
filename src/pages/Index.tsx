import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import TrustBar from "@/components/landing/TrustBar";
import HowItWorks from "@/components/landing/HowItWorks";
import ProduceShowcase from "@/components/landing/ProduceShowcase";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ValuesSection from "@/components/landing/ValuesSection";
import SellerCTA from "@/components/landing/SellerCTA";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  const { user, role, loading } = useAuth();

  if (!loading && user && role === "buyer") {
    return <Navigate to="/marche" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        <HeroSection />
        <TrustBar />
        <HowItWorks />
        <ProduceShowcase />
        <TestimonialsSection />
        <ValuesSection />
        <SellerCTA />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
