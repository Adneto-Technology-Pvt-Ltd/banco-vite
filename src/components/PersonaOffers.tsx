import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

// Define persona data with offers
const personaData = [
  {
    id: "senior-citizens",
    name: "Senior Citizens",
    description: "Special offers for customers aged 60 and above",
    offers: [
      {
        id: "sc1",
        title: "Higher Interest Rates",
        description: "Enjoy additional 0.5% interest on fixed deposits",
        imageUrl: "https://images.unsplash.com/photo-1532408840957-031d8034aeef?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "sc2",
        title: "Pharmacy Discounts",
        description: "Get up to 20% off at partner pharmacies",
        imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "sc3",
        title: "Health Check-up Package",
        description: "Annual health check-up at partner hospitals",
        imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "professionals",
    name: "Professionals",
    description: "Exclusive benefits for working professionals",
    offers: [
      {
        id: "p1",
        title: "Premium Burgundy Services",
        description: "Enhanced banking services with dedicated relationship manager",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "p2",
        title: "Discounted Lounge Access",
        description: "International airport lounge access with your debit card",
        imageUrl: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "p3",
        title: "Investment Advisory",
        description: "Personalized investment solutions for wealth creation",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "women",
    name: "Women",
    description: "Exclusive benefits for women account holders",
    offers: [
      {
        id: "w1",
        title: "Personal Safety Insurance",
        description: "Complimentary personal accident and safety insurance",
        imageUrl: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "w2",
        title: "Beauty & Wellness",
        description: "Special discounts at partner salons and spas",
        imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "w3",
        title: "Investment Advisory",
        description: "Personalized investment guidance for financial independence",
        imageUrl: "https://images.unsplash.com/photo-1563237023-b1e970526dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "students",
    name: "Students",
    description: "Banking solutions for students starting their financial journey",
    offers: [
      {
        id: "st1",
        title: "Education Platform Subscription",
        description: "Free access to premium learning platforms",
        imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "st2",
        title: "Campus Card Discounts",
        description: "Special discounts at campus cafeterias and bookstores",
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "st3",
        title: "Exclusive benefits",
        description: "No minimum balance requirement for student accounts",
        imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "doctors",
    name: "Doctors",
    description: "Specialized banking services for medical professionals",
    offers: [
      {
        id: "d1",
        title: "Medical Equipment Financing",
        description: "Special loan rates for medical equipment purchases",
        imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "d2",
        title: "Professional Liability Insurance",
        description: "Discounted professional liability insurance packages",
        imageUrl: "https://images.unsplash.com/photo-1599045118108-bf9954418b76?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "d3",
        title: "Clinic Establishment Loans",
        description: "Customized loans for setting up or expanding medical practice",
        imageUrl: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
      }
    ]
  }
];

type PersonaOffersProps = {
  selectedPersona?: string;
};

export const PersonaOffers = ({ selectedPersona }: PersonaOffersProps) => {
  // Filter personas if a specific one is selected
  const displayedPersonas = selectedPersona 
    ? personaData.filter(persona => persona.id === selectedPersona) 
    : personaData;
  
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-4">Personalized Banking Solutions</h2>
        <p className="text-center mb-12 max-w-3xl mx-auto">
          Discover exclusive offers tailored to your unique needs and lifestyle. At Axis Bank, we understand that different customers have different priorities.
        </p>
        
        {displayedPersonas.map(persona => (
          <div key={persona.id} className="mb-16 last:mb-0">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div>
                <h3 className="text-[#97144d]">{persona.name}</h3>
                <p className="text-gray-600">{persona.description}</p>
              </div>
              <Button 
                variant="outline" 
                className="mt-4 md:mt-0 border-[#97144d] text-[#97144d] hover:bg-[#97144d] hover:text-white"
              >
                View All {persona.name} Offers
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {persona.offers.map(offer => (
                <Card key={offer.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <ImageWithFallback
                      src={offer.imageUrl}
                      alt={offer.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{offer.title}</CardTitle>
                    <CardDescription>{offer.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full border-[#97144d] text-[#97144d] hover:bg-[#97144d] hover:text-white"
                    >
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};