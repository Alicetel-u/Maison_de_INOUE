import { MenuCategory, StaffMember, GalleryItem, SalonInfo } from "@/types";

export const SALON_INFO: SalonInfo = {
  name: "Maison de INOUE",
  nameJa: "メゾン ド イノウエ",
  address: "東京都渋谷区神宮前3-15-8 メゾンビル2F",
  zip: "〒150-0001",
  tel: "03-6455-XXXX",
  hours: [
    { label: "平日", time: "10:00 - 20:00" },
    { label: "土日祝", time: "9:00 - 19:00" },
  ],
  closedDays: "毎週火曜日・第3月曜日",
  access: "東京メトロ 表参道駅 A2出口より徒歩3分",
};

export const NAV_LINKS = [
  { href: "#concept", label: "Concept" },
  { href: "#menu", label: "Menu" },
  { href: "#staff", label: "Staff" },
  { href: "#gallery", label: "Gallery" },
  { href: "#access", label: "Access" },
];

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "cut",
    name: "カット",
    nameEn: "Cut",
    items: [
      { name: "カット", price: "¥7,700", description: "シャンプー・ブロー込み" },
      { name: "カット + ブロー", price: "¥9,900" },
      { name: "前髪カット", price: "¥1,650" },
      { name: "メンズカット", price: "¥6,600", description: "シャンプー・ブロー込み" },
      { name: "キッズカット", price: "¥4,400", description: "小学生以下" },
    ],
  },
  {
    id: "color",
    name: "カラー",
    nameEn: "Color",
    items: [
      { name: "ワンカラー", price: "¥8,800〜", description: "リタッチ〜フルカラー" },
      { name: "ハイライト", price: "¥11,000〜" },
      { name: "バレイヤージュ", price: "¥16,500〜" },
      { name: "ダブルカラー", price: "¥16,500〜" },
      { name: "リタッチカラー", price: "¥6,600〜" },
    ],
  },
  {
    id: "perm",
    name: "パーマ",
    nameEn: "Perm",
    items: [
      { name: "デジタルパーマ", price: "¥13,200〜" },
      { name: "コスメパーマ", price: "¥11,000〜" },
      { name: "ストレートパーマ", price: "¥16,500〜" },
      { name: "縮毛矯正", price: "¥22,000〜" },
    ],
  },
  {
    id: "treatment",
    name: "トリートメント",
    nameEn: "Treatment",
    items: [
      { name: "超音波トリートメント", price: "¥5,500" },
      { name: "髪質改善トリートメント", price: "¥11,000", description: "話題の酸熱トリートメント" },
      { name: "ヘッドスパ", price: "¥5,500", description: "30分コース" },
      { name: "プレミアムヘッドスパ", price: "¥8,800", description: "60分コース" },
    ],
  },
  {
    id: "set",
    name: "セットメニュー",
    nameEn: "Set Menu",
    items: [
      { name: "カット + カラー", price: "¥14,300〜" },
      { name: "カット + パーマ", price: "¥18,700〜" },
      { name: "カット + カラー + トリートメント", price: "¥19,800〜" },
      { name: "ブライダルセット", price: "¥22,000〜", description: "ヘアメイク込み" },
    ],
  },
];

export const STAFF_MEMBERS: StaffMember[] = [
  {
    name: "田中 美咲",
    nameEn: "Misaki Tanaka",
    role: "Owner Stylist",
    experience: "経歴15年",
    message: "一人ひとりの\"なりたい\"を、確かな技術で叶えます。お客様の内面の美しさを引き出すことが私の喜びです。",
    specialties: ["ショートカット", "ハイトーンカラー", "髪質改善"],
    image: "/images/staff/staff-1.png",
  },
  {
    name: "佐藤 健太",
    nameEn: "Kenta Sato",
    role: "Top Stylist",
    experience: "経歴8年",
    message: "トレンドとライフスタイルに合わせた、再現性の高いスタイルをご提案します。",
    specialties: ["メンズカット", "ナチュラルパーマ", "バレイヤージュ"],
    image: "/images/staff/staff-2.png",
  },
  {
    name: "鈴木 あかり",
    nameEn: "Akari Suzuki",
    role: "Colorist",
    experience: "経歴5年",
    message: "透明感のある、あなただけの色を見つけます。ダメージレスなカラーリングにこだわっています。",
    specialties: ["バレイヤージュ", "インナーカラー", "ブリーチワーク"],
    image: "/images/staff/staff-3.png",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { image: "/images/gallery/style-1.png", styleName: "レイヤーボブ", stylist: "田中 美咲" },
  { image: "/images/gallery/style-2.png", styleName: "ストレートロング", stylist: "鈴木 あかり" },
  { image: "/images/gallery/style-3.png", styleName: "アップスタイル", stylist: "田中 美咲" },
  { image: "/images/gallery/style-4.png", styleName: "ショートピクシー", stylist: "佐藤 健太" },
  { image: "/images/gallery/style-5.png", styleName: "ウェーブミディ", stylist: "鈴木 あかり" },
  { image: "/images/gallery/style-6.png", styleName: "ナチュラルパーマ", stylist: "佐藤 健太" },
];

export const INSTAGRAM_POSTS = [
  { image: "/images/instagram/insta-1.png", likes: 124 },
  { image: "/images/instagram/insta-2.png", likes: 89 },
  { image: "/images/instagram/insta-3.png", likes: 203 },
  { image: "/images/instagram/insta-4.png", likes: 156 },
  { image: "/images/instagram/insta-5.png", likes: 178 },
  { image: "/images/instagram/insta-6.png", likes: 95 },
];
