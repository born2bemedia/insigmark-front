
export type Service = {
  id: string;
  title: string;
  type: "purchasable" | "orderable";
  price: number;
  prefix?: string;
  suffix?: string;
};

export type CardVariant =
  | "white"
  | "grey-1"
  | "grey-2"
  | "grey-3"
  | "grey-4"
  | "black"
  | "yellow-1"
  | "yellow-2"
  | "yellow-3"
  | "yellow-4"
  | "gradient-yellow"
  | "solid-yellow";

// Web Development service item types
export type PreDevelopmentItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  prefix?: string;
  variant?: CardVariant;
};

export type FullWebsiteItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  prefix?: string;
  variant?: CardVariant;
};

export type PagesSectionsItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  prefix?: string;
  variant?: CardVariant;
};

export type TechnicalOptimizationItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  prefix?: string;
  variant?: CardVariant;
};

export type DocumentationSupportItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  prefix?: string;
  suffix?: string;
  variant?: CardVariant;
};

export type ComplementaryServicesItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  prefix?: string;
  variant?: CardVariant;
};

// Hosting Solutions service item types
export type HostingPlanItem = {
  id: string;
  title: string;
  forLabel: string;
  features: string[];
  price: number;
  variant?: CardVariant;
};

export type PackageItem = {
  title: string;
  description: string;
  icon: string;
  variant?: CardVariant;
};

export type Package = {
  id: string;
  name: string;
  boldIntro: string;
  description: string;
  price: number;
  cta: string;
  inheritsFrom?: string;
  items: PackageItem[];
};