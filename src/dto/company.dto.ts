export interface CompanyDto {
  company_id: number;
  company_name_th: string | null;
  company_name_en: string | null;
  company_address: string | null;
  company_phone: string | null;
  company_tax_id: string | null;
  fk_currency_id: number | null;
  fk_timezone_id: number | null;
  fk_package_id: number | null;
  package_member: number | null;
  suffix_email: string | null;
  url_user_register: string | null;
  qrcode_user_register: string | null;
  working_hours: string | null;
  allow_late_mins: number | null;
  wizard_setting: string | null;
  fk_company_group: number | null;
  fk_customer_status: number | null;
}

export interface CompanySectionDto {
  id: number;
  section_name: string;
  [key: string]: unknown;
}

export interface CompanySectionMemberDto {
  id: number;
  fk_user_id: number;
  fk_section_id: number;
  [key: string]: unknown;
}
