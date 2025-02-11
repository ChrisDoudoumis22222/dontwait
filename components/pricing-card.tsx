// components/pricing-card.tsx
"use client";

import React from "react";
import { LucideProps } from "lucide-react";

export interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  // Adjust the icon type as needed; here we assume the icon is a React component
  icon: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement> & LucideProps>;
  highlighted?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  features,
  icon: Icon,
  highlighted = false,
}) => {
  return (
    <div
      className={`p-6 border rounded-lg ${
        highlighted ? "border-blue-600 shadow-lg" : "border-gray-300"
      }`}
    >
      <div className="flex items-center mb-4">
        <Icon className="h-6 w-6 mr-2" />
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
      <p className="text-2xl font-semibold mb-4">{price}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-600">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
