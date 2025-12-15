export interface Request {
  id: string;
  employeeName: string;
  specialty: string;
  date: string;
  status: 'Approved' | 'Pending';
}

export interface SpecialtyStat {
  name: string;
  count: number;
  percentage: number;
}

export interface StatCardProps {
  icon: string;
  title: string;
  value: string | number;
  subtext: string;
  iconColorClass: string;
  valueColorClass: string;
}
