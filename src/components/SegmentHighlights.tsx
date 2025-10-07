import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Sample data for different customer segments
const segmentData = [
  {
    id: 1,
    name: "Burgundy",
    description: "Premium banking for exclusive customers",
    benefits: "Premium OTT subscriptions, Priority service, Higher transaction limits",
    iconUrl: "https://images.unsplash.com/photo-1634704784915-aacf363b021f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bgColor: "bg-[#97144d]/10"
  },
  {
    id: 2,
    name: "Prestige",
    description: "Enhanced banking experience for valued customers",
    benefits: "Pharmacy discounts, Zero forex markup, Complimentary airport lounge access",
    iconUrl: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bgColor: "bg-[#333333]/10"
  },
  {
    id: 3,
    name: "Priority",
    description: "Priority banking for discerning customers",
    benefits: "Dining privileges, Travel insurance, Dedicated relationship manager",
    iconUrl: "https://images.unsplash.com/photo-1608093602525-45b9e8ba1e37?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bgColor: "bg-[#7a5200]/10"
  },
  {
    id: 4,
    name: "Liberty",
    description: "Smart banking for everyday customers",
    benefits: "Cashback offers, Free ATM transactions, Digital banking services",
    iconUrl: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bgColor: "bg-[#005a80]/10"
  }
];

export const SegmentHighlights = () => {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <h2 className="mb-8 text-center">Benefits Tailored To Your Account Type</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {segmentData.map((segment) => (
          <Card key={segment.id} className={`${segment.bgColor} border border-gray-200`}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <ImageWithFallback
                  src={segment.iconUrl}
                  alt={segment.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <CardTitle className="text-[#97144d]">{segment.name}</CardTitle>
                <CardDescription>{segment.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <h4 className="mb-2">Key Benefits:</h4>
              <ul className="list-disc list-inside space-y-1">
                {segment.benefits.split(', ').map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};