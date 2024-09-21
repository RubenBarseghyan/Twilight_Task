export interface Credential {
    url: string;
    creds: {
      username: string;
      password: string;
    }[];
  }
  
  export interface ComputerInformation {
    ip: string | null;
    username: string | null;
    infection_date: string | null;
    malware_path: string | null;
    os: string | null;
    country: string | null;
  }
  
  export interface DataItem {
    id: string;
    log_checksum?: string;
    log_file_name?: string;
    stealer_type?: string;
    computer_information: ComputerInformation;
    credentials: Credential[];
  }
  
  export interface ApiResponse {
    data: DataItem[];
    search_id: string;
    search_consumed_credits: number;
    credits_left: number;
    next?: string;
    total_items_count: number;
    items_count: number;
  }
  
  export interface SearchData {
    domains?: string[];
    root_domains?: string[];
    app_domains?: string[];
    email_domains?: string[];
    ips?: string[];
    infection_date_from?: string;
    infection_date_to?: string;
    next?: string;
    size?: number;
  }
  
  export interface ValidationErrorDetail {
    loc: (string | number)[];
    msg: string;
    type: string;
  }
  
  export interface HTTPValidationError {
    detail: ValidationErrorDetail[];
  }
  