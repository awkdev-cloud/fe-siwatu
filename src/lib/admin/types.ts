export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: "admin";
};

export type ApiEnvelope<T> = {
  message: string;
  data: T;
  meta?: Record<string, number>;
};

export type DashboardMetric = {
  total: number;
  active?: number;
  inactive?: number;
  published?: number;
  draft?: number;
  featured?: number;
};

export type DashboardData = {
  galleries: DashboardMetric;
  gallery_categories: DashboardMetric;
  reviews: DashboardMetric;
  tour_packages: DashboardMetric;
  social_links: DashboardMetric;
  unique_rocks: DashboardMetric;
  plant_revitalizations: DashboardMetric;
};
