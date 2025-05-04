// src/types/entities.ts

export interface ActivityLog {
  id: number;
  table_name?: string | null;
  record_id?: number | null;
  action_type?: string | null;
  action_details?: string | null;
  updated_by?: string | null;
  created_at?: string | null; // ISO string (timestamp with time zone)
}

export interface Customer {
  id: number;
  name: string;
  address?: string | null;
  phone_number: string;
  company?: string | null;
  paid_total?: number | null;
  to_be_paid?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface FinanceAccount {
  id: number;
  name?: string | null;
  amount?: number | null;
}

export interface Material {
  id: number;
  name?: string | null;
  source?: string | null;
  type?: string | null;
}

export interface Measurement {
  id: number;
  order_id?: number | null;
  material_name?: string | null;
  material_type?: string | null;
  unit?: string | null;
  quantity?: number | null;
  cost?: number | null;
  total_cost?: number | null;
}

export interface OrderDetail {
  detail_id: number;
  order_id?: number | null;
  assigned_to?: string | null;
  updated_date?: string | null; // ISO string (date)
  due_date?: string | null; // ISO string (timestamp with time zone)
  price: number;
  total_cost: number;
  notes?: string | null;
  img_url?: string | null;
  process_stage?: string | null;
  updated_at?: string | null;
}

export interface OrderStageAssignment {
  id: number;
  order_stage_id?: number | null;
  employee_name: string;
  work_date: string; // ISO string (date)
  note?: string | null;
  is_done?: boolean | null;
  created_at?: string | null;
  employee_rate?: number | null;
}

export interface OrderStage {
  id: number;
  order_detail_id?: number | null;
  stage_name?: string | null;
  status?: string | null;
  planned_start_date?: string | null;
  planned_finish_date?: string | null;
  actual_start_date?: string | null;
  actual_finish_date?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Order {
  id: number;
  code: string;
  customer_id?: number | null;
  customer_name?: string | null;
  address: string;
  order_status?: string | null;
  order_price?: number | null;
  order_cost?: number | null;
  work_types: string[]; // ARRAY
  created_by?: string | null;
  company?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Transaction {
  transaction_id: number;
  order_id?: number | null;
  amount: number;
  method: string;
  img_url?: string | null;
  created_at?: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  created_at?: string | null;
}