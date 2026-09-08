export interface UserDto {
  id: number;
  employee_id: string | null;
  ad_account: string | null;
  fk_company_id: number | null;
  fk_department_id: number | null;
  position: string | null;
  th_title: string | null;
  th_first_name: string | null;
  th_last_name: string | null;
  display_name: string | null;
  alias_name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  is_active: number | null;
  report_to_id: number | null;
  [key: string]: unknown;
}

export interface UserListDto {
  employee: string | null;
  ad_account: string | null;
  fk_company_id: number | null;
  company_name_th: string | null;
  fk_department_id: number | null;
  department_name: string | null;
  position: string | null;
  th_title: string | null;
  th_first_name: string | null;
  th_last_name: string | null;
  is_active: number | null;
  title_en: string | null;
  first_name: string | null;
  last_name: string | null;
  employee_name: string;
  email: string | null;
  section_name: string | null;
  report_to_id: number | null;
}
