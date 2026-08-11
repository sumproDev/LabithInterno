"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Database, ImagePlus, Loader2, LogOut, Plus, Save, Star, Trash2 } from "lucide-react";

type Resource = "products" | "collections" | "projects" | "testimonials";
type RecordItem = Record<string, string | number | boolean | string[] | undefined> & { _id?: string };
type Toast = { id: number; type: "success" | "error"; message: string };

const resources: { key: Resource; label: string; description: string }[] = [
  { key: "products", label: "Products", description: "Product catalog, specifications, finishes and gallery images." },
  { key: "collections", label: "Collections", description: "Curated groups of products and visual collections." },
  { key: "projects", label: "Projects", description: "Portfolio stories, project imagery and case-study content." },
  { key: "testimonials", label: "Testimonials", description: "Client quotes shown across the website." },
];

const emptyRecords: Record<Resource, RecordItem> = {
  products: { id: "", slug: "", title: "", category: "", shortDescription: "", fullDescription: "", images: [], finishes: [], applications: [], features: [], dimensions: "", installation: "", maintenance: "", featured: true, order: 0 },
  collections: { slug: "", title: "", description: "", images: [], productSlugs: [], featured: true, order: 0 },
  projects: { slug: "", title: "", location: "", type: "", products: [], image: "", challenge: "", approach: "", result: "", featured: true, order: 0 },
  testimonials: { quote: "", name: "", role: "", rating: 5, image: "", featured: true, order: 0 },
};

const arrayFields = new Set(["images", "finishes", "applications", "features", "productSlugs", "products"]);
const longFields = new Set(["shortDescription", "fullDescription", "description", "dimensions", "installation", "maintenance", "challenge", "approach", "result", "quote"]);
const hiddenFields = new Set(["__v", "createdAt", "updatedAt"]);

function readable(field: string) {
  return field.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

function normalizeItem(item: RecordItem) {
  const copy = { ...item };
  hiddenFields.forEach((field) => delete copy[field]);
  return copy;
}

function cleanPayload(item: RecordItem) {
  const copy = { ...item };
  delete copy._id;
  delete copy.__v;
  delete copy.createdAt;
  delete copy.updatedAt;
  return copy;
}

export function AdminDashboard() {
  const router = useRouter();
  const [active, setActive] = useState<Resource>("products");
  const [items, setItems] = useState<RecordItem[]>([]);
  const [selected, setSelected] = useState<RecordItem>(emptyRecords.products);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);

  const fields = useMemo(() => Object.keys(emptyRecords[active]), [active]);

  function toast(type: Toast["type"], message: string) {
    const id = Date.now();
    setToasts((current) => [...current, { id, type, message }]);
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 3200);
  }

  async function load(resource = active, preferredId?: string) {
    setLoading(true);
    const response = await fetch(`/api/admin/${resource}`);
    const data = await response.json().catch(() => ({}));
    setLoading(false);
    if (!response.ok) {
      toast("error", data.error || "Unable to load CMS records.");
      setItems([]);
      setSelected(emptyRecords[resource]);
      return;
    }
    const loadedItems: RecordItem[] = data.items || [];
    setItems(loadedItems);

    if (preferredId) {
      const match = loadedItems.find((item) => item._id === preferredId);
      if (match) {
        setSelected(normalizeItem(match));
        return;
      }
    }

    setSelected(loadedItems[0] ? normalizeItem(loadedItems[0]) : emptyRecords[resource]);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  function updateField(field: string, value: string | number | boolean | string[]) {
    setSelected((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const isEditing = Boolean(selected._id);
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `/api/admin/${active}/${selected._id}` : `/api/admin/${active}`;
    const payload = cleanPayload(selected);
    const response = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await response.json().catch(() => ({}));
    setSaving(false);

    if (!response.ok) {
      toast("error", data.error || "Save failed.");
      return;
    }

    const savedId = data.item?._id || selected._id;
    toast("success", isEditing ? "Record updated." : "Record created.");
    await load(active, savedId);
  }

  async function remove() {
    if (!selected._id || !confirm("Delete this record?")) return;
    const response = await fetch(`/api/admin/${active}/${selected._id}`, { method: "DELETE" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      toast("error", data.error || "Delete failed.");
      return;
    }
    toast("success", "Record deleted.");
    await load(active);
  }

  async function uploadImage(field: string, event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setUploading(field);
    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      form.append("files", files[i]);
    }
    const response = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await response.json().catch(() => ({}));
    setUploading("");
    event.target.value = "";

    if (!response.ok) {
      toast("error", data.error || "Image upload failed.");
      return;
    }

    const newUrls: string[] = data.urls || (data.url ? [data.url] : []);
    if (newUrls.length === 0) {
      toast("error", "No image URL returned from upload.");
      return;
    }

    if (arrayFields.has(field)) {
      const existing = (selected[field] as string[]) || [];
      updateField(field, [...existing, ...newUrls]);
      toast("success", `Uploaded ${newUrls.length} image${newUrls.length > 1 ? "s" : ""}.`);
    } else {
      updateField(field, newUrls[0]);
      toast("success", "Image uploaded successfully.");
    }
  }

  async function seed() {
    const response = await fetch("/api/admin/seed", { method: "POST" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      toast("error", data.error || "Seed failed.");
      return;
    }
    toast("success", "Default content seeded into MongoDB.");
    await load(active);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <div><span>CMS</span><h1>Labith Admin</h1><p>MongoDB content, Cloudinary images and website publishing controls.</p></div>
        <nav>{resources.map((resource) => <button key={resource.key} className={active === resource.key ? "active" : ""} onClick={() => setActive(resource.key)}>{resource.label}<small>{resource.description}</small></button>)}</nav>
        <button className="admin-logout" onClick={logout}><LogOut /> Logout</button>
      </aside>

      <section className="admin-workspace">
        <div className="admin-topbar">
          <div><p className="eyebrow">CONTENT MANAGER</p><h2>{resources.find((resource) => resource.key === active)?.label}</h2></div>
          <div className="admin-actions"><button onClick={seed}><Database /> Seed defaults</button><button onClick={() => setSelected(emptyRecords[active])}><Plus /> New</button></div>
        </div>

        <div className="admin-grid">
          <div className="admin-list">
            {loading ? <p className="admin-muted"><Loader2 className="spin" /> Loading records...</p> : items.length ? items.map((item) => (
              <button key={String(item._id)} className={selected._id === item._id ? "active" : ""} onClick={() => setSelected(normalizeItem(item))}>
                <strong>{String(item.title || item.name || item.slug)}</strong>
                <span>{String(item.slug || item.role || item.type || "CMS record")}</span>
              </button>
            )) : <p className="admin-muted">No records yet. Create one or seed defaults.</p>}
          </div>

          <form className="admin-form" onSubmit={submit}>
            {fields.map((field) => {
              const value = selected[field];
              const isArray = arrayFields.has(field);
              const isImageField = field === "image" || field === "images";
              const isBoolean = typeof value === "boolean";

              return (
                <label key={field} className={longFields.has(field) || isArray ? "wide" : ""}>
                  <span>{readable(field)}</span>
                  {isBoolean ? (
                    <select value={value ? "true" : "false"} onChange={(event) => updateField(field, event.target.value === "true")}><option value="true">Yes</option><option value="false">No</option></select>
                  ) : isArray ? (
                    <textarea value={(value as string[] | undefined)?.join("\n") || ""} onChange={(event) => updateField(field, event.target.value.split("\n").map((line) => line.trim()).filter(Boolean))} rows={field === "images" ? 5 : 3} />
                  ) : longFields.has(field) ? (
                    <textarea value={String(value || "")} onChange={(event) => updateField(field, event.target.value)} rows={4} />
                  ) : (
                    <input type={typeof value === "number" ? "number" : "text"} value={String(value ?? "")} onChange={(event) => updateField(field, typeof value === "number" ? Number(event.target.value) : event.target.value)} />
                  )}
                  {isImageField && (
                    <>
                      <div className="admin-upload">
                        <input type="file" accept="image/*" multiple onChange={(event) => uploadImage(field, event)} />
                        <ImagePlus /> {uploading === field ? "Uploading..." : isArray ? "Upload multiple images" : "Upload image"}
                      </div>
                      {isArray && Array.isArray(value) && value.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px" }}>
                          {(value as string[]).map((imgUrl, idx) => {
                            const isCover = idx === 0;
                            return (
                              <div
                                key={`${imgUrl}-${idx}`}
                                style={{
                                  position: "relative",
                                  width: "96px",
                                  height: "96px",
                                  borderRadius: "8px",
                                  overflow: "hidden",
                                  border: isCover ? "2px solid #ffe500" : "1px solid rgba(255, 255, 255, 0.18)",
                                  background: "#111",
                                  boxShadow: isCover ? "0 0 10px rgba(255, 229, 0, 0.35)" : "none",
                                }}
                              >
                                <img src={imgUrl} alt={`Uploaded ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

                                {/* Cover Badge or Set as Cover Button */}
                                {isCover ? (
                                  <span
                                    style={{
                                      position: "absolute",
                                      bottom: "4px",
                                      left: "4px",
                                      background: "#ffe500",
                                      color: "#000",
                                      fontSize: "10px",
                                      fontWeight: "800",
                                      padding: "2px 6px",
                                      borderRadius: "4px",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "3px",
                                      boxShadow: "0 2px 4px rgba(0,0,0,0.6)",
                                    }}
                                  >
                                    <Star style={{ width: "10px", height: "10px", fill: "#000" }} /> COVER
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const list = [...(value as string[])];
                                      const [target] = list.splice(idx, 1);
                                      list.unshift(target);
                                      updateField(field, list);
                                      toast("success", "Set as Cover Image (moved to 1st image)");
                                    }}
                                    style={{
                                      position: "absolute",
                                      bottom: "4px",
                                      left: "4px",
                                      background: "rgba(0, 0, 0, 0.8)",
                                      color: "#fff",
                                      border: "1px solid rgba(255, 255, 255, 0.35)",
                                      borderRadius: "4px",
                                      padding: "2px 6px",
                                      fontSize: "10px",
                                      fontWeight: "600",
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "3px",
                                      backdropFilter: "blur(4px)",
                                    }}
                                    title="Set as Cover Image (First Image)"
                                  >
                                    <Star style={{ width: "10px", height: "10px" }} /> Cover
                                  </button>
                                )}

                                {/* Remove Image Button */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = (value as string[]).filter((_, i) => i !== idx);
                                    updateField(field, updated);
                                  }}
                                  style={{
                                    position: "absolute",
                                    top: "4px",
                                    right: "4px",
                                    width: "22px",
                                    height: "22px",
                                    borderRadius: "50%",
                                    background: "rgba(220, 38, 38, 0.9)",
                                    color: "#fff",
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 0,
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.6)",
                                  }}
                                  title="Remove image"
                                >
                                  <Trash2 style={{ width: "12px", height: "12px" }} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {!isArray && typeof value === "string" && value.trim() !== "" && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
                          <div style={{ position: "relative", width: "70px", height: "70px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border)", background: "#111" }}>
                            <img src={value} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <button
                              type="button"
                              onClick={() => updateField(field, "")}
                              style={{ position: "absolute", top: "2px", right: "2px", width: "20px", height: "20px", borderRadius: "50%", background: "rgba(220, 38, 38, 0.85)", color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
                              title="Remove image"
                            >
                              <Trash2 style={{ width: "12px", height: "12px" }} />
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </label>
              );
            })}
            <div className="admin-form-actions"><button type="submit" disabled={saving}><Save /> {saving ? "Saving..." : selected._id ? "Update Record" : "Create Record"}</button>{selected._id && <button type="button" className="danger" onClick={remove}><Trash2 /> Delete</button>}</div>
          </form>
        </div>
      </section>

      <div className="admin-toasts">{toasts.map((toast) => <div key={toast.id} className={`admin-toast ${toast.type}`}>{toast.message}</div>)}</div>
    </main>
  );
}
