export interface MenuItem {
  name: string;
  price: string;
  description?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  nameEn: string;
  items: MenuItem[];
}

export interface StaffMember {
  name: string;
  nameEn: string;
  role: string;
  experience: string;
  message: string;
  specialties: string[];
  image: string;
}

export interface GalleryItem {
  image: string;
  styleName: string;
  stylist: string;
}

export interface SalonInfo {
  name: string;
  nameJa: string;
  address: string;
  zip: string;
  tel: string;
  hours: { label: string; time: string }[];
  closedDays: string;
  access: string;
}
