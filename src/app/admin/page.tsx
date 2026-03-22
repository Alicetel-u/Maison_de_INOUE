"use client";

import { useState, useEffect } from "react";

const REPO = "Alicetel-u/Maison_de_INOUE";
const FILE_PATH = "public/content.json";
const ADMIN_PASS = "inoue2025";

interface MenuItem {
  name: string;
  price: string;
  description: string;
}

interface MenuCategory {
  id: string;
  name: string;
  nameEn: string;
  items: MenuItem[];
}

interface StaffMember {
  name: string;
  nameEn: string;
  role: string;
  experience: string;
  message: string;
  specialties: string[];
  image: string;
}

interface SalonInfo {
  name: string;
  nameJa: string;
  address: string;
  zip: string;
  tel: string;
  hours: { label: string; time: string }[];
  closedDays: string;
  access: string;
}

interface ContentData {
  salon: SalonInfo;
  menu: MenuCategory[];
  staff: StaffMember[];
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [token, setToken] = useState("");
  const [tokenSaved, setTokenSaved] = useState(false);
  const [content, setContent] = useState<ContentData | null>(null);
  const [activeTab, setActiveTab] = useState<"salon" | "menu" | "staff">("salon");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [activeMenuIdx, setActiveMenuIdx] = useState(0);

  // Load saved token
  useEffect(() => {
    const saved = localStorage.getItem("gh_token");
    if (saved) {
      setToken(saved);
      setTokenSaved(true);
    }
  }, []);

  // Load content
  useEffect(() => {
    if (!authed) return;
    fetch(`${window.location.origin}${getBasePath()}/content.json?t=${Date.now()}`)
      .then((r) => r.json())
      .then((d) => setContent(d))
      .catch(() => setMessage("コンテンツの読み込みに失敗しました"));
  }, [authed]);

  function getBasePath() {
    const path = window.location.pathname;
    const idx = path.indexOf("/admin");
    return idx > 0 ? path.substring(0, idx) : "";
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pass === ADMIN_PASS) {
      setAuthed(true);
      setMessage("");
    } else {
      setMessage("パスワードが違います");
    }
  }

  function saveToken() {
    localStorage.setItem("gh_token", token);
    setTokenSaved(true);
    setMessage("トークンを保存しました");
  }

  async function handleSave() {
    if (!content || !token) {
      setMessage("GitHubトークンを設定してください");
      return;
    }

    setSaving(true);
    setMessage("保存中...");

    try {
      // Get current file SHA
      const getRes = await fetch(
        `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!getRes.ok) {
        throw new Error("ファイル情報の取得に失敗しました。トークンを確認してください。");
      }

      const fileData = await getRes.json();
      const sha = fileData.sha;

      // Update file
      const newContent = btoa(
        unescape(encodeURIComponent(JSON.stringify(content, null, 2)))
      );

      const putRes = await fetch(
        `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `update: コンテンツ更新 (管理画面から)`,
            content: newContent,
            sha,
          }),
        }
      );

      if (!putRes.ok) {
        throw new Error("保存に失敗しました");
      }

      setMessage("✅ 保存しました！数分後にサイトに反映されます。");
    } catch (err) {
      setMessage(`❌ ${err instanceof Error ? err.message : "エラーが発生しました"}`);
    } finally {
      setSaving(false);
    }
  }

  // --- Login Screen ---
  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-xl font-bold mb-6 text-center">管理画面ログイン</h1>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="パスワード"
            className="w-full border border-gray-300 rounded px-4 py-3 mb-4 text-base"
          />
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded font-medium hover:bg-gray-700"
          >
            ログイン
          </button>
          {message && <p className="mt-4 text-red-500 text-sm text-center">{message}</p>}
        </form>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold">Maison de INOUE 管理画面</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700 disabled:opacity-50 text-sm"
          >
            {saving ? "保存中..." : "💾 サイトを更新"}
          </button>
        </div>
        {message && (
          <div className={`text-center py-2 text-sm ${message.includes("✅") ? "bg-green-50 text-green-700" : message.includes("❌") ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"}`}>
            {message}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Token Setup */}
        {!tokenSaved && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-yellow-800 mb-2">初回設定: GitHubトークン</h3>
            <p className="text-sm text-yellow-700 mb-3">
              サイトを更新するにはGitHubのトークンが必要です。
              オーナーから受け取ったトークンを入力してください。
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxx"
                className="flex-1 border border-yellow-300 rounded px-3 py-2 text-sm"
              />
              <button onClick={saveToken} className="bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700">
                保存
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1">
          {[
            { key: "salon" as const, label: "🏠 店舗情報" },
            { key: "menu" as const, label: "📋 メニュー・料金" },
            { key: "staff" as const, label: "👤 スタッフ" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Salon Info */}
        {activeTab === "salon" && (
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold mb-4">店舗情報</h2>
            <Field label="店名" value={content.salon.name} onChange={(v) => setContent({ ...content, salon: { ...content.salon, name: v } })} />
            <Field label="店名（日本語）" value={content.salon.nameJa} onChange={(v) => setContent({ ...content, salon: { ...content.salon, nameJa: v } })} />
            <Field label="郵便番号" value={content.salon.zip} onChange={(v) => setContent({ ...content, salon: { ...content.salon, zip: v } })} />
            <Field label="住所" value={content.salon.address} onChange={(v) => setContent({ ...content, salon: { ...content.salon, address: v } })} />
            <Field label="電話番号" value={content.salon.tel} onChange={(v) => setContent({ ...content, salon: { ...content.salon, tel: v } })} />
            <Field label="定休日" value={content.salon.closedDays} onChange={(v) => setContent({ ...content, salon: { ...content.salon, closedDays: v } })} />
            <Field label="アクセス" value={content.salon.access} onChange={(v) => setContent({ ...content, salon: { ...content.salon, access: v } })} />
            <div className="border-t pt-4 mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">営業時間</p>
              {content.salon.hours.map((h, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    value={h.label}
                    onChange={(e) => {
                      const hours = [...content.salon.hours];
                      hours[i] = { ...hours[i], label: e.target.value };
                      setContent({ ...content, salon: { ...content.salon, hours } });
                    }}
                    className="border rounded px-3 py-2 w-24 text-sm"
                  />
                  <input
                    value={h.time}
                    onChange={(e) => {
                      const hours = [...content.salon.hours];
                      hours[i] = { ...hours[i], time: e.target.value };
                      setContent({ ...content, salon: { ...content.salon, hours } });
                    }}
                    className="border rounded px-3 py-2 flex-1 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menu */}
        {activeTab === "menu" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">メニュー・料金</h2>
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {content.menu.map((cat, i) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveMenuIdx(i)}
                  className={`px-3 py-1.5 rounded text-sm ${
                    activeMenuIdx === i
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Items */}
            <div className="space-y-3">
              {content.menu[activeMenuIdx]?.items.map((item, itemIdx) => (
                <div key={itemIdx} className="border rounded-lg p-3">
                  <div className="flex gap-2 mb-2">
                    <input
                      value={item.name}
                      onChange={(e) => {
                        const menu = [...content.menu];
                        menu[activeMenuIdx].items[itemIdx].name = e.target.value;
                        setContent({ ...content, menu });
                      }}
                      placeholder="メニュー名"
                      className="border rounded px-3 py-2 flex-1 text-sm"
                    />
                    <input
                      value={item.price}
                      onChange={(e) => {
                        const menu = [...content.menu];
                        menu[activeMenuIdx].items[itemIdx].price = e.target.value;
                        setContent({ ...content, menu });
                      }}
                      placeholder="¥0,000"
                      className="border rounded px-3 py-2 w-28 text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={item.description}
                      onChange={(e) => {
                        const menu = [...content.menu];
                        menu[activeMenuIdx].items[itemIdx].description = e.target.value;
                        setContent({ ...content, menu });
                      }}
                      placeholder="補足説明（任意）"
                      className="border rounded px-3 py-2 flex-1 text-sm text-gray-500"
                    />
                    <button
                      onClick={() => {
                        const menu = [...content.menu];
                        menu[activeMenuIdx].items.splice(itemIdx, 1);
                        setContent({ ...content, menu });
                      }}
                      className="text-red-400 hover:text-red-600 px-2 text-sm"
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const menu = [...content.menu];
                  menu[activeMenuIdx].items.push({ name: "", price: "", description: "" });
                  setContent({ ...content, menu });
                }}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700"
              >
                ＋ メニューを追加
              </button>
            </div>
          </div>
        )}

        {/* Staff */}
        {activeTab === "staff" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">スタッフ</h2>
            {content.staff.map((s, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <img src={`${getBasePath()}${s.image}`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <Field label="名前" value={s.name} onChange={(v) => { const staff = [...content.staff]; staff[i].name = v; setContent({ ...content, staff }); }} />
                  </div>
                </div>
                <Field label="英語名" value={s.nameEn} onChange={(v) => { const staff = [...content.staff]; staff[i].nameEn = v; setContent({ ...content, staff }); }} />
                <Field label="役職" value={s.role} onChange={(v) => { const staff = [...content.staff]; staff[i].role = v; setContent({ ...content, staff }); }} />
                <Field label="経歴" value={s.experience} onChange={(v) => { const staff = [...content.staff]; staff[i].experience = v; setContent({ ...content, staff }); }} />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">メッセージ</label>
                  <textarea
                    value={s.message}
                    onChange={(e) => { const staff = [...content.staff]; staff[i].message = e.target.value; setContent({ ...content, staff }); }}
                    className="w-full border rounded px-3 py-2 text-sm"
                    rows={2}
                  />
                </div>
                <Field
                  label="得意分野（カンマ区切り）"
                  value={s.specialties.join(", ")}
                  onChange={(v) => {
                    const staff = [...content.staff];
                    staff[i].specialties = v.split(",").map((x) => x.trim()).filter(Boolean);
                    setContent({ ...content, staff });
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Token management */}
        {tokenSaved && (
          <div className="mt-8 text-center">
            <button
              onClick={() => { localStorage.removeItem("gh_token"); setTokenSaved(false); setToken(""); }}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              GitHubトークンをリセット
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
      />
    </div>
  );
}
