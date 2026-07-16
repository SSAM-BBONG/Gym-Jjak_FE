export interface OrganizationStatsResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationStatsData;
}

export interface OrganizationStatsData {
  trainerCount: number;
  totalUserCount: number;
  currentUserCount: number;
  thisMonthRevenue: number;
  trend: OrganizationStatsTrend;
}

export interface OrganizationStatsTrend {
  weekly: OrganizationStatsTrendItem[];
  monthly: OrganizationStatsTrendItem[];
  threeMonthly: OrganizationStatsTrendItem[];
  sixMonthly: OrganizationStatsTrendItem[];
}

export interface OrganizationStatsTrendItem {
  date: string;
  count: number;
}

export interface OrganizationSalesResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationSalesData;
}

export interface OrganizationSalesData {
  totalRevenue: number;
  thisMonthRevenue: number;
  monthOverMonthRate: number;
  revenueTrend: OrganizationRevenueTrend;
  trainerSales: OrganizationTrainerSalesItem[];
}

export interface OrganizationRevenueTrend {
  weekly: OrganizationRevenueTrendItem[];
  monthly: OrganizationRevenueTrendItem[];
  threeMonthly: OrganizationRevenueTrendItem[];
  sixMonthly: OrganizationRevenueTrendItem[];
}

export interface OrganizationRevenueTrendItem {
  date: string;
  amount: number;
}

export interface OrganizationTrainerSalesItem {
  trainerProfileId: number;
  trainerName: string;
  thisMonthAmount: number;
  totalAmount: number;
  ratio: number;
}

export interface OrganizationTrainerStatsResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationTrainerStatsData[];
}

export interface OrganizationTrainerStatsData {
  trainerProfileId: number;
  trainerName: string;
  clientCount: number;
  ptCount: number;
}
