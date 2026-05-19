import React, { useState, useRef } from 'react';
import {
  Camera,
  Trash2,
  Plus,
  Minus,
  Type,
  Search,
  Sparkles,
  Upload,
  Package,
  Save,
  ChefHat,
} from 'lucide-react';
import { Ingredient } from '@/models/ingredient-model';
import {
  saveIngredients as saveIngredientsAPI,
  scanImage,
} from '../apis/ingredientsAPI';

function ScanPage() {
  const [activeTab, setActiveTab] = useState('camera');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('pcs');
  const [customUnit, setCustomUnit] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [items, setItems] = useState<Ingredient[]>([]);

  const addItem = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      alert('Please enter an ingredient name');
      return;
    }

    const unitFinal =
      unit === 'other' ? customUnit.trim() || 'pcs' : unit;

    const newItem: Ingredient = {
      name: trimmed,
      quantity: quantity || 1,
      unit: unitFinal,
    };

    setItems((prev) => [newItem, ...prev]);

    setName('');
    setQuantity(0);
    setUnit('pcs');
    setCustomUnit('');
  };

  const incrementItem = (index: number) => {
    setItems((prev) =>
      prev.map((it, i) =>
        i === index
          ? {
              ...it,
              quantity: Number((it.quantity + 1).toFixed(2)),
            }
          : it
      )
    );
  };

  const decrementItem = (index: number) => {
    setItems((prev) =>
      prev.map((it, i) => {
        if (i !== index) return it;
        const newQty = Math.max(
          0,
          Number((it.quantity - 1).toFixed(2))
        );
        return { ...it, quantity: newQty };
      })
    );
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const saveIngredients = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in');
      return;
    }

    if (items.length === 0) {
      alert('No ingredients to save');
      return;
    }

    try {
      const payload: Ingredient[] = items.map((it) => ({
        name: it.name,
        quantity: it.quantity,
        unit: it.unit,
      }));

      await saveIngredientsAPI(payload, token);

      alert('Ingredients saved to pantry ✅');
      setItems([]);
    } catch (err) {
      console.error('Save ingredients failed:', err);
      alert('Failed to save ingredients');
    }
  };

  return (
    <div className="animate-fade-in w-full px-5 pb-10">
      {/* ================= LOADING OVERLAY ================= */}
      {uploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl px-8 py-6 shadow-2xl border border-gray-100 flex flex-col items-center gap-4">
            <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-center">
              <p className="font-bold text-gray-800">Analyzing Image</p>
              <p className="text-sm text-gray-500">
                AI is detecting your ingredients...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= HERO HEADER ================= */}
      <div className="mb-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
            <Sparkles size={30} />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold">
              AI Ingredient Scanner
            </h1>
            <p className="text-emerald-100 mt-1">
              Scan or manually add ingredients to your pantry.
            </p>
          </div>
        </div>
      </div>

      {/* ================= TAB SWITCHER ================= */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setActiveTab('camera')}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
            activeTab === 'camera'
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-200'
              : 'bg-white text-gray-600 border border-gray-200 hover:shadow-md'
          }`}
        >
          <Camera size={18} />
          AI Camera Scan
        </button>

        <button
          onClick={() => setActiveTab('manual')}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
            activeTab === 'manual'
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-200'
              : 'bg-white text-gray-600 border border-gray-200 hover:shadow-md'
          }`}
        >
          <Type size={18} />
          Manual Input
        </button>
      </div>
      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ================= LEFT PANEL ================= */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/60 flex flex-col">
          {activeTab === 'camera' ? (
            <>
              {/* Camera Mode Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Scan Your Groceries
                </h3>
                <p className="text-sm text-gray-500">
                  Upload a photo and let AI automatically detect all ingredients.
                </p>
              </div>

              {/* Upload Preview Area */}
              <div className="relative flex-1 min-h-[420px] rounded-3xl overflow-hidden border-2 border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 group">
                <img
                  src={
                    previewUrl ??
                    'https://www.instacart.com/company/_next/image?url=https%3A%2F%2Fimages.contentstack.io%2Fv3%2Fassets%2Fblta100b44b847ff4ca%2Fblt94c2cd5338f20ef5%2F68dc4296a07e11d2e2ad5ed2%2Ffun-food-facts-hero.jpg%3Fwidth%3D1050%26auto%3Dwebp&w=1920&q=75'
                  }
                  alt="Kitchen Counter"
                  className="w-full h-full object-cover opacity-90"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                {/* Center Icon */}
                {!previewUrl && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-3xl flex items-center justify-center mb-4">
                      <Upload size={36} />
                    </div>
                    <p className="text-lg font-bold">
                      Upload Ingredient Image
                    </p>
                    <p className="text-sm text-white/80">
                      JPG, PNG, or HEIC supported
                    </p>
                  </div>
                )}

                {/* Upload Button */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white text-gray-900 font-bold px-6 py-3 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <Camera size={18} />
                    Capture & Detect
                  </button>
                </div>
              </div>

              <p className="text-xs text-center text-gray-500 mt-4">
                Our AI can detect multiple ingredients in a single image.
              </p>
            </>
          ) : (
            <>
              {/* Manual Mode Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Manual Entry
                </h3>
                <p className="text-sm text-gray-500">
                  Add ingredients one by one with quantity and units.
                </p>
              </div>

              <div className="flex-1 flex flex-col gap-5">
                {/* Ingredient Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ingredient Name
                  </label>
                  <div className="relative">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="e.g., Cheddar Cheese"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                {/* Quantity & Unit */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      min="0"
                      pattern="[0-9]*[.,]?[0-9]*"
                      value={quantity === 0 ? '' : quantity}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === '') return setQuantity(0);
                        const parsed = parseFloat(v.replace(',', '.'));
                        setQuantity(Number.isNaN(parsed) ? 0 : parsed);
                      }}
                      placeholder="0"
                      className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                  </div>

                  {/* Unit */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Unit
                    </label>

                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition appearance-none cursor-pointer"
                    >
                      <option value="pcs">pcs</option>
                      <option value="kg">kg</option>
                      <option value="grams">grams</option>
                      <option value="lt">lt</option>
                      <option value="pack">pack</option>
                      <option value="other">Other...</option>
                    </select>

                    {unit === 'other' && (
                      <input
                        type="text"
                        value={customUnit}
                        onChange={(e) => setCustomUnit(e.target.value)}
                        placeholder="Enter custom unit"
                        className="mt-3 w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      />
                    )}
                  </div>
                </div>

                {/* Add Button */}
                <div className="mt-auto pt-4">
                  <button
                    onClick={addItem}
                    className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Add to List
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        {/* ================= RIGHT PANEL ================= */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/60 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {activeTab === 'camera'
                  ? 'Detected Items'
                  : 'Items to Add'}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Review and adjust your ingredients before saving.
              </p>
            </div>

            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full">
              {items.length} Items
            </span>
          </div>

          {/* Ingredient List */}
          <div className="flex-1 overflow-y-auto max-h-[55vh] pr-2 space-y-3 custom-scrollbar">
            {items.map((it, idx) => (
              <DetectedItemRow
                key={idx}
                name={it.name}
                qty={it.quantity}
                unit={it.unit}
                onIncrease={() => incrementItem(idx)}
                onDecrease={() => decrementItem(idx)}
                onRemove={() => removeItem(idx)}
              />
            ))}

            {/* Empty State */}
            {items.length === 0 && (
              <div className="h-full min-h-[320px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center mb-4">
                  <Package
                    size={36}
                    className="text-emerald-400"
                  />
                </div>

                <h4 className="text-lg font-bold text-gray-800 mb-1">
                  No Ingredients Yet
                </h4>

                <p className="text-sm text-gray-500 max-w-xs">
                  Scan an image or manually add ingredients to build
                  your pantry list.
                </p>
              </div>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files && e.target.files[0];
              if (!f) return;

              const token = localStorage.getItem('token');
              if (!token) {
                alert('Please login to use the scanner.');
                return;
              }

              setSelectedFile(f);
              setPreviewUrl(URL.createObjectURL(f));

              try {
                setUploading(true);

                const result = await scanImage(f, token);
                const detectedObjects =
                  result.data?.detected_ingredients || [];

                if (detectedObjects.length === 0) {
                  alert(
                    'No ingredients detected. Try a clearer image.'
                  );
                } else {
                  const newIngredients: Ingredient[] =
                    detectedObjects.map((ingredient: any) => ({
                      name: ingredient.name,
                      quantity: ingredient.quantity,
                      unit: ingredient.unit,
                    }));

                  setItems((prev) => [
                    ...prev,
                    ...newIngredients,
                  ]);
                }
              } catch (err: any) {
                console.error('upload error', err);
                alert(
                  'Upload failed: ' +
                    (err?.message || String(err))
                );
              } finally {
                setUploading(false);
                setSelectedFile(null);
                setPreviewUrl(null);

                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }
            }}
          />

          {/* Save Button */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button
              onClick={saveIngredients}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Save to Pantry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= ITEM ROW COMPONENT ================= */

interface DetectedProps {
  name: string;
  qty: number;
  unit: string;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
}

function DetectedItemRow({
  name,
  qty,
  unit,
  onIncrease,
  onDecrease,
  onRemove,
}: DetectedProps) {
  return (
    <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300">
      {/* Ingredient Icon */}
      <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
        <ChefHat size={18} className="text-emerald-500" />
      </div>

      {/* Ingredient Name */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-gray-800 truncate">
          {name}
        </h4>
        <p className="text-xs text-gray-400">
          Pantry Ingredient
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Quantity Stepper */}
        <div className="flex items-center bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            onClick={onDecrease}
            className="px-2.5 py-2 hover:bg-gray-50 text-gray-500 transition"
          >
            <Minus size={12} />
          </button>

          <span className="text-sm font-bold px-2 min-w-[36px] text-center">
            {qty}
          </span>

          <button
            onClick={onIncrease}
            className="px-2.5 py-2 hover:bg-gray-50 text-gray-500 transition"
          >
            <Plus size={12} />
          </button>
        </div>

        {/* Unit */}
        <span className="text-xs font-semibold text-gray-500 min-w-[36px]">
          {unit}
        </span>

        {/* Remove */}
        <button
          onClick={onRemove}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default ScanPage;