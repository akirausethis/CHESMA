import React, { useState, useRef } from 'react';
import {
  Camera,
  Trash2,
  Plus,
  Minus,
  Type,
  Search,
  Upload,
  Package,
  Save,
  ChefHat,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ingredient } from '@/models/ingredient-model';
import {
  saveIngredients as saveIngredientsAPI,
  scanImage,
} from '../apis/ingredientsAPI';

function ScanPage() {
  const [activeTab, setActiveTab] = useState('camera');
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState<'error' | 'success'>('error');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('pcs');
  const [customUnit, setCustomUnit] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [items, setItems] = useState<Ingredient[]>([]);
  const [scanAttempted, setScanAttempted] = useState(false);

  const addItem = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setAlertMsg('Please enter an ingredient name'); setAlertType('error');
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
      setAlertMsg('You must be logged in'); setAlertType('error');
      return;
    }

    if (items.length === 0) {
      setAlertMsg('No ingredients to save'); setAlertType('error');
      return;
    }

    try {
      const payload: Ingredient[] = items.map((it) => ({
        name: it.name,
        quantity: it.quantity,
        unit: it.unit,
      }));

      await saveIngredientsAPI(payload, token);

      setAlertMsg('Ingredients saved to pantry ✅'); setAlertType('success');
      setItems([]);
    } catch (err) {
      console.error('Save ingredients failed:', err);
      setAlertMsg('Failed to save ingredients'); setAlertType('error');
    }
  };

  return (
    <div className="animate-fade-in w-full max-w-6xl mx-auto px-4 md:px-8 py-8">
      {/* ================= CUSTOM MODAL OVERLAY ================= */}
      <AnimatePresence>
        {alertMsg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 ${
                  alertType === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              ></div>

              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-inner ${
                  alertType === 'success'
                    ? 'bg-emerald-50 text-emerald-500'
                    : 'bg-red-50 text-red-500'
                }`}
              >
                {alertType === 'success' ? (
                  <CheckCircle size={32} />
                ) : (
                  <AlertCircle size={32} />
                )}
              </div>

              {/* Text */}
              <h3 className="text-xl font-black text-gray-900 mb-2">
                {alertType === 'success' ? 'Success!' : 'Oops!'}
              </h3>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                {alertMsg}
              </p>

              {/* Action */}
              <button
                onClick={() => setAlertMsg('')}
                className={`w-full py-3.5 rounded-2xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${
                  alertType === 'success'
                    ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200'
                    : 'bg-red-500 hover:bg-red-600 shadow-red-200'
                }`}
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* ================= LOADING OVERLAY ================= */}
      {uploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-gray-100 flex flex-col items-center gap-5">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900 mb-1">Analyzing Image</p>
              <p className="text-gray-500">
                AI is detecting your ingredients...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= HERO HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">AI Ingredient Scanner</h1>
        <p className="text-gray-500 mt-2">Scan or manually add ingredients to your pantry.</p>
      </div>

      {/* ================= TAB SWITCHER ================= */}
      <div className="inline-flex bg-gray-100/80 p-1.5 rounded-xl mb-8">
        <button
          onClick={() => setActiveTab('camera')}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'camera'
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Camera size={16} />
          AI Scan
        </button>
        <button
          onClick={() => setActiveTab('manual')}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'manual'
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Type size={16} />
          Manual Entry
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ================= LEFT PANEL ================= */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col">
          {activeTab === 'camera' ? (
            <>
              {/* Camera Mode Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Scan Your Groceries
                </h3>
                <p className="text-sm text-gray-500">
                  Upload a photo and let AI automatically detect all ingredients.
                </p>
              </div>

              {/* Upload Preview Area */}
              <div 
                onClick={() => !previewUrl && fileInputRef.current?.click()}
                className={`relative flex-1 min-h-[360px] rounded-2xl overflow-hidden border-2 border-dashed ${previewUrl ? 'border-transparent' : 'border-gray-200 bg-gray-50 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30'} transition-all flex items-center justify-center group`}
              >
                {previewUrl ? (
                  <>
                    <img
                      src={previewUrl}
                      alt="Scan Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <button
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="bg-white text-gray-900 font-bold px-6 py-3 rounded-xl shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
                      >
                        <Camera size={18} />
                        Choose Another Image
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-emerald-500 transition-colors pointer-events-none p-6 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-gray-100">
                      <Upload size={28} />
                    </div>
                    <p className="text-gray-800 font-bold mb-1">Click to Upload Image</p>
                    <p className="text-sm">JPG, PNG, or HEIC supported</p>
                  </div>
                )}
              </div>

              {!previewUrl && (
                 <p className="text-xs text-center text-gray-400 mt-4">
                   Our AI can detect multiple ingredients in a single image.
                 </p>
              )}
            </>
          ) : (
            <>
              {/* Manual Mode Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Manual Entry
                </h3>
                <p className="text-sm text-gray-500">
                  Add ingredients one by one with quantity and units.
                </p>
              </div>

              <div className="flex-1 flex flex-col gap-6">
                {/* Ingredient Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
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
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                {/* Quantity & Unit */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
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
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                  </div>

                  {/* Unit */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Unit
                    </label>

                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition appearance-none cursor-pointer"
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
                        className="mt-3 w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      />
                    )}
                  </div>
                </div>

                {/* Add Button */}
                <div className="mt-auto pt-4">
                  <button
                    onClick={addItem}
                    className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
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
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col h-full min-h-[500px]">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {activeTab === 'camera'
                  ? 'Detected Items'
                  : 'Items to Add'}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Review and adjust before saving.
              </p>
            </div>

            <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-100">
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
              <div className="h-full flex flex-col items-center justify-center text-center px-4 py-12">
                <div className="w-20 h-20 rounded-[1.5rem] bg-gray-50 flex items-center justify-center mb-5 border border-gray-100">
                  <Package
                    size={36}
                    className="text-gray-300"
                  />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{scanAttempted ? 'No Ingredients Found' : 'No Ingredients Yet'}</h4>
                <p className="text-sm text-gray-500 max-w-[240px]">{scanAttempted ? "We couldn't detect any food ingredients in this image. Try uploading a different photo!" : 'Scan an image or manually add ingredients to build your pantry list.'}</p>
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
                setAlertMsg('Please login to use the scanner.'); setAlertType('error');
                return;
              }

              setSelectedFile(f);
              setPreviewUrl(URL.createObjectURL(f));

              try {
                setUploading(true);

                const result = await scanImage(f, token);
                const detectedObjects =
                  result.data?.detected_ingredients || [];

                
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
              } catch (err: any) {
                console.error('upload error', err);
                setAlertMsg('Upload failed: ' + (err?.message || String(err))); setAlertType('error');
              } finally {
                setUploading(false);
        setScanAttempted(true);
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
              disabled={items.length === 0}
              className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-emerald-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:cursor-not-allowed"
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
    <div className="group flex items-center gap-4 p-3.5 bg-white rounded-xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow transition-all duration-200">
      {/* Ingredient Icon */}
      <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
        <ChefHat size={18} className="text-emerald-500" />
      </div>

      {/* Ingredient Name */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-gray-900 text-sm truncate capitalize">
          {name}
        </h4>
        <p className="text-xs text-gray-400">
          Pantry Ingredient
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Quantity Stepper */}
        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
          <button
            onClick={onDecrease}
            className="px-2 py-1.5 hover:bg-gray-200 text-gray-500 transition"
          >
            <Minus size={12} />
          </button>

          <span className="text-sm font-bold px-2 min-w-[32px] text-center text-gray-700">
            {qty}
          </span>

          <button
            onClick={onIncrease}
            className="px-2 py-1.5 hover:bg-gray-200 text-gray-500 transition"
          >
            <Plus size={12} />
          </button>
        </div>

        {/* Unit */}
        <span className="text-xs font-bold text-gray-400 min-w-[32px]">
          {unit}
        </span>

        {/* Remove */}
        <button
          onClick={onRemove}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default ScanPage;








