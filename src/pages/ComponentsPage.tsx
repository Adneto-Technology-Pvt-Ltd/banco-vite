import React, { useState } from "react";
import { TabsDemo } from "../components/TabsDemo";
import { CategoryFilter, defaultCategories } from "../components/CategoryFilter";
import { Gift, ShoppingBag, Plane, Utensils, Film, Coffee } from "lucide-react";

export const ComponentsPage = () => {
  const [selectedCategory1, setSelectedCategory1] = useState("all");
  const [selectedCategory2, setSelectedCategory2] = useState("all");
  const [selectedCategory3, setSelectedCategory3] = useState("all");
  const [selectedCategory4, setSelectedCategory4] = useState("all");

  return (
    <div className="pt-[88px] pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-[#97144D]">Axis Bank UI Components</h1>
        
        {/* Category Filter Components */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-bold">Category Filter Components</h2>
            <p className="text-gray-600">Various category filter styles used for reward categorization.</p>
          </div>
          
          <div className="space-y-8 p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Default Style</h3>
              <CategoryFilter 
                selectedCategory={selectedCategory1}
                onCategoryChange={setSelectedCategory1}
                variant="default"
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Pills Style</h3>
              <CategoryFilter 
                selectedCategory={selectedCategory2}
                onCategoryChange={setSelectedCategory2}
                variant="pills"
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Cards Style</h3>
              <CategoryFilter 
                selectedCategory={selectedCategory3}
                onCategoryChange={setSelectedCategory3}
                variant="cards"
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Minimal Style</h3>
              <CategoryFilter 
                selectedCategory={selectedCategory4}
                onCategoryChange={setSelectedCategory4}
                variant="minimal"
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Compact Style</h3>
              <CategoryFilter 
                selectedCategory={selectedCategory4}
                onCategoryChange={setSelectedCategory4}
                variant="pills"
                compact={true}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Custom Categories</h3>
              <CategoryFilter 
                selectedCategory={selectedCategory1}
                onCategoryChange={setSelectedCategory1}
                categories={[
                  {
                    id: "all",
                    label: "All Items",
                    icon: <Gift className="h-[18px] w-[18px]" />
                  },
                  {
                    id: "coffee",
                    label: "Coffee",
                    icon: <Coffee className="h-[18px] w-[18px]" />
                  },
                  {
                    id: "dining",
                    label: "Restaurants",
                    icon: <Utensils className="h-[18px] w-[18px]" />
                  }
                ]}
              />
            </div>
          </div>
        </div>
        
        {/* Tab Components */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-bold">Tab Components</h2>
            <p className="text-gray-600">Various tab styles and variants used throughout the Axis Bank Benefits platform.</p>
          </div>
          <TabsDemo />
        </div>
      </div>
    </div>
  );
};