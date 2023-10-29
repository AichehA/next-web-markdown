import * as React from "react";
import { cn, findSlotOfType } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

export function TabsArabe({ children }) {
  const TabsArabeFrComponent = findSlotOfType(children, TabsArabeFr);
  const TabsArabeArComponent = findSlotOfType(children, TabsArabeAr);

  return (
    <Tabs defaultValue="fr" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="fr">Français</TabsTrigger>
        <TabsTrigger value="ar" className={cn("d-rtl")}>
          عربي
        </TabsTrigger>
      </TabsList>
      {TabsArabeFrComponent}
      {TabsArabeArComponent}
    </Tabs>
  );
}

export function TabsArabeFr({ children }) {
  return <TabsContent value="fr">{children}</TabsContent>;
}

export function TabsArabeAr({ children }) {
  return (
    <TabsContent value="ar" className={cn("d-rtl")}>
      {children}
    </TabsContent>
  );
}
