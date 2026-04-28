"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, Upload, Package, ArrowLeft, Check } from "lucide-react";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { Badge } from "@/components/ui/Badge";

const OUTLETS = ["Kiserian", "Rongai", "Ongata", "Ngong", "Karen", "Magadi"];
const CATEGORIES = ["Power tools", "Hand tools", "Plumbing", "Electrical", "Safety", "Paints", "Building", "Other"];
const ICONS = ["drill", "hammer", "wrench", "ruler", "zap", "hard-hat", "paintbrush", "cable", "package"];

export type NewInventoryItem = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  icon: string;
  stocks: number[]; // per outlet
  isNew?: boolean;
};

const STORAGE_KEY = "jp_inventory_upload_draft";
const NEW_ITEMS_KEY = "jp_inventory_new_items";

function generateId() {
  return `new-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function InventoryUploadPage() {
  const [items, setItems] = useState<NewInventoryItem[]>([]);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load draft from localStorage
  useEffect(() => {
    try {
      const draft = localStorage.getItem(STORAGE_KEY);
      if (draft) {
        setItems(JSON.parse(draft));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = useCallback(() => {
    setItems((prev) => [
      ...prev,
      {
        id: generateId(),
        name: "",
        sku: "",
        category: CATEGORIES[0],
        price: 0,
        icon: ICONS[0],
        stocks: OUTLETS.map(() => 0),
      },
    ]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateItem = useCallback((id: string, field: keyof NewInventoryItem, value: unknown) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  }, []);

  const updateStock = useCallback((id: string, outletIndex: number, value: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, stocks: i.stocks.map((s, idx) => (idx === outletIndex ? Math.max(0, value) : s)) }
          : i
      )
    );
  }, []);

  const uploadToInventory = useCallback(() => {
    // Mark all items as new and save to localStorage
    const newItems = items.map((i) => ({ ...i, isNew: true }));
    
    try {
      const existing = JSON.parse(localStorage.getItem(NEW_ITEMS_KEY) || "[]");
      localStorage.setItem(NEW_ITEMS_KEY, JSON.stringify([...existing, ...newItems]));
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }

    setUploadedCount(items.length);
    setItems([]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, [items]);

  const canUpload = items.length > 0 && items.every((i) => i.name.trim() && i.sku.trim() && i.price > 0);

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-rule pb-3.5">
        <div className="flex items-center gap-3">
          <Link
            href="/inventory"
            className="flex h-9 w-9 items-center justify-center border border-border bg-surface hover:bg-paper-2 transition-colors"
          >
            <ArrowLeft size={18} strokeWidth={2} />
          </Link>
          <div className="flex flex-col gap-1.5">
            <BracketLabel>OPS // INVENTORY // UPLOAD</BracketLabel>
            <h1 className="m-0 font-serif text-[32px] font-semibold leading-[1.05]">Batch Upload</h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={addItem} className="btn btn-outline btn-sm inline-flex items-center gap-2">
            <Plus size={16} />
            Add Item
          </button>
          <button
            type="button"
            onClick={uploadToInventory}
            disabled={!canUpload}
            className="btn btn-primary btn-sm inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload size={16} />
            Upload {items.length > 0 ? `(${items.length})` : ""}
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {showSuccess && (
        <div className="mb-6 border-2 border-success bg-success-bg px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 bg-success text-white flex items-center justify-center">
            <Check size={18} strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-semibold text-[14px]">{uploadedCount} item{uploadedCount > 1 ? 's' : ''} uploaded to inventory</div>
            <div className="font-mono text-[11px] text-ink-3">New items highlighted in pink</div>
          </div>
          <Link href="/inventory" className="btn btn-outline btn-sm ml-auto no-underline">
            View Inventory
          </Link>
        </div>
      )}

      {/* Empty State */}
      {items.length === 0 && !showSuccess && (
        <div className="border-2 border-dashed border-border bg-paper-2 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-2 border-brand-black bg-brand-yellow flex items-center justify-center">
            <Package className="w-8 h-8 text-brand-black" strokeWidth={2} />
          </div>
          <h2 className="font-serif text-[1.5rem] font-semibold m-0">No items to upload</h2>
          <p className="mt-2 font-serif text-[1rem] text-ink-2">Add products to upload to inventory</p>
          <button type="button" onClick={addItem} className="btn btn-primary btn-lg mt-6">
            <Plus size={18} className="mr-2" />
            Add First Item
          </button>
        </div>
      )}

      {/* Items Grid */}
      {items.length > 0 && (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="border-2 border-rule bg-surface p-4 transition-colors hover:border-brand-black"
            >
              {/* Item Header */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-brand-black text-brand-yellow flex items-center justify-center font-mono text-[13px] font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">New Item</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-ink-3 hover:text-danger hover:bg-danger-bg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-12 gap-4">
                {/* Name */}
                <div className="col-span-4">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3 mb-1.5">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, "name", e.target.value)}
                    placeholder="e.g. Ingco Cordless Drill 12V"
                    className="w-full border-2 border-brand-black bg-paper px-3 py-2 text-[14px] outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                </div>

                {/* SKU */}
                <div className="col-span-3">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3 mb-1.5">
                    SKU *
                  </label>
                  <input
                    type="text"
                    value={item.sku}
                    onChange={(e) => updateItem(item.id, "sku", e.target.value.toUpperCase())}
                    placeholder="e.g. ING-CD45-12V"
                    className="w-full border-2 border-brand-black bg-paper px-3 py-2 text-[14px] font-mono outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                </div>

                {/* Category */}
                <div className="col-span-3">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3 mb-1.5">
                    Category
                  </label>
                  <select
                    value={item.category}
                    onChange={(e) => updateItem(item.id, "category", e.target.value)}
                    className="w-full border-2 border-brand-black bg-paper px-3 py-2 text-[14px] outline-none focus:ring-2 focus:ring-brand-yellow"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="col-span-2">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3 mb-1.5">
                    Price (KES) *
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={item.price || ""}
                    onChange={(e) => updateItem(item.id, "price", Number(e.target.value))}
                    placeholder="0"
                    className="w-full border-2 border-brand-black bg-paper px-3 py-2 text-[14px] outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                </div>
              </div>

              {/* Stock by Outlet */}
              <div className="mt-4 pt-4 border-t border-rule-soft">
                <label className="block font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3 mb-2">
                  Stock by Outlet
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {OUTLETS.map((outlet, idx) => (
                    <div key={outlet}>
                      <span className="block font-mono text-[10px] text-ink-3 mb-1">{outlet}</span>
                      <input
                        type="number"
                        min={0}
                        value={item.stocks[idx] || ""}
                        onChange={(e) => updateStock(item.id, idx, Number(e.target.value))}
                        className="w-full border border-border bg-paper px-2 py-1.5 text-[13px] text-center outline-none focus:border-brand-black"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Footer */}
      {items.length > 0 && (
        <div className="mt-6 flex items-center justify-between border-t-2 border-brand-black pt-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
              {items.length} item{items.length > 1 ? 's' : ''} ready
            </span>
            {items.some((i) => !i.name || !i.sku || !i.price) && (
              <Badge variant="warn" dot>
                Complete required fields
              </Badge>
            )}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setItems([])} className="btn btn-outline btn-sm">
              Clear All
            </button>
            <button
              type="button"
              onClick={uploadToInventory}
              disabled={!canUpload}
              className="btn btn-primary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload to Inventory
            </button>
          </div>
        </div>
      )}
    </>
  );
}
