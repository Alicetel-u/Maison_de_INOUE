"use client";

import { useState, useEffect } from "react";
import {
  SALON_INFO,
  MENU_CATEGORIES,
  STAFF_MEMBERS,
  GALLERY_ITEMS,
  INSTAGRAM_POSTS,
  img,
} from "./constants";
import type { MenuCategory, StaffMember, SalonInfo } from "@/types";

interface ContentData {
  salon: SalonInfo;
  menu: MenuCategory[];
  staff: StaffMember[];
}

export function useContent() {
  const [salon, setSalon] = useState(SALON_INFO);
  const [menu, setMenu] = useState(MENU_CATEGORIES);
  const [staff, setStaff] = useState(STAFF_MEMBERS);

  useEffect(() => {
    const base =
      process.env.NODE_ENV === "production" ? "/Maison_de_INOUE" : "";
    fetch(`${base}/content.json?t=${Date.now()}`)
      .then((r) => r.json())
      .then((data: ContentData) => {
        if (data.salon) setSalon(data.salon);
        if (data.menu) setMenu(data.menu);
        if (data.staff) {
          setStaff(
            data.staff.map((s) => ({
              ...s,
              image: img(s.image),
            }))
          );
        }
      })
      .catch(() => {
        // fallback to hardcoded constants
      });
  }, []);

  return { salon, menu, staff, gallery: GALLERY_ITEMS, instagram: INSTAGRAM_POSTS };
}
