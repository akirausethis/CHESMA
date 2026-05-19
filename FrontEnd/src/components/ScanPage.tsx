import React, { useState, useRef } from 'react';
import { Camera, Trash2, Plus, Minus, Calendar, Type, Search } from 'lucide-react';
import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_CREATE_ROOT_CONTAINERS } from 'react-dom/client';
import { Ingredient } from '@/models/ingredient-model';
import { saveIngredients as saveIngredientsAPI, scanImage } from '../apis/ingredientsAPI';


function ScanPage(){
  // State untuk mengatur Tab aktif: 'camera' atau 'manual'
  
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

  const unitFinal = unit === 'other'
    ? (customUnit.trim() || 'pcs')
    : unit;

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
    setItems((prev) => prev.map((it, i) => i === index ? { ...it, quantity: Number((it.quantity + 1).toFixed(2)) } : it));
  };

  const decrementItem = (index: number) => {
    setItems((prev) => prev.map((it, i) => {
      if (i !== index) return it;
      const newQty = Math.max(0, Number((it.quantity - 1).toFixed(2)));
      return { ...it, quantity: newQty };
    }));
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const saveIngredients = async () =>{
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
    const payload: Ingredient[] = items.map(it => ({
      name: it.name,
      quantity: it.quantity,
      unit: it.unit,
    }));

    await saveIngredientsAPI(payload, token);

    alert('Ingredients saved to pantry ✅');
    setItems([]); // clear list after save
  } catch (err) {
    console.error('Save ingredients failed:', err);
    alert('Failed to save ingredients');
  }
  }




  return (
    <div className="animate-fade-in pb-10  w-full px-5">
      {uploading && (
        <div className="fixed inset-0 bg-black/25 flex justify-center items-center z-50">
          <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* --- 1. TOP TABS SWITCHER --- */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('camera')}
          className={`px-6 py-3 rounded-full font-semibold transition transform hover:scale-105 flex items-center gap-2 ${
            activeTab === 'camera' 
              ? 'bg-brand-primary text-white shadow-lg shadow-green-200' 
              : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Camera size={18} /> AI Camera Scan
        </button>
        <button 
          onClick={() => setActiveTab('manual')}
          className={`px-6 py-3 rounded-full font-semibold transition transform hover:scale-105 flex items-center gap-2 ${
            activeTab === 'manual' 
              ? 'bg-brand-primary text-white shadow-lg shadow-green-200' 
              : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Type size={18} /> Manual Text Input
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* --- 2. LEFT PANEL (Dynamic Content) --- */}
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-gray-50 flex flex-col">
          
          {activeTab === 'camera' ? (
            <>
              <h3 className="font-bold text-xl mb-4 text-brand-dark">Scan your groceries</h3>
              <div className="relative w-full aspect-[4/3] bg-gray-900 rounded-2xl overflow-hidden shadow-inner group flex-1">
                {/* Preview if selected, otherwise placeholder image */}
                <img src={previewUrl ?? "https://www.instacart.com/company/_next/image?url=https%3A%2F%2Fimages.contentstack.io%2Fv3%2Fassets%2Fblta100b44b847ff4ca%2Fblt94c2cd5338f20ef5%2F68dc4296a07e11d2e2ad5ed2%2Ffun-food-facts-hero.jpg%3Fwidth%3D1050%26auto%3Dwebp&w=1920&q=75"} 
                      alt="Kitchen Counter" 
                      className="w-full h-full object-cover opacity-90" />

                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                    <button onClick={() => fileInputRef.current?.click()} className="bg-white text-brand-dark font-bold px-6 py-3 rounded-full shadow-lg border border-gray-200 hover:bg-brand-light flex items-center gap-2 transition">
                      <Camera size={18} /> Capture & Detect
                    </button>
                </div>
              </div>
              <p className="text-xs text-center text-text-muted mt-4">
                Upload your images with ingredients. AI will auto-detect multiple items.
              </p>
            </>
          ) : (
            // === TAMPILAN FORM MANUAL (Baru!) ===
            <>
              <h3 className="font-bold text-xl mb-6 text-brand-dark">Manual Entry</h3>
              
              <div className="flex-1 flex flex-col gap-5">
                {/* Input Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Ingredient Name</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      value={name} onChange={(e) => setName(e.target.value)}
                      type="text" 
                      placeholder="e.g., Cheddar Cheese" 
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-gray-50 transition"
                    />
                  </div>
                </div>

                {/* Input Quantity & Unit */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Quantity</label>
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary bg-gray-50 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Unit</label>
                    <div>
                      <select value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary bg-gray-50 transition appearance-none cursor-pointer">
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
                          placeholder="Enter unit (e.g., bunch, sprig)"
                          className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
                        />
                      )}
                    </div>
                  </div>
                </div>


                {/* Add Button */}
                <div className="mt-auto pt-4">
                  <button onClick={addItem} className="w-full bg-brand-dark text-white font-bold py-3 rounded-xl shadow-md hover:bg-brand-primary transition flex items-center justify-center gap-2">
                    <Plus size={20} /> Add to List
                  </button>
                </div>
              </div>
            </>
          )}

        </div>

        {/* --- 3. RIGHT PANEL (Detected / Added Items List) --- */}
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-gray-50 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-brand-dark">
              {activeTab === 'camera' ? 'Detected Items' : 'Items to Add'}
            </h3>
            <span className="bg-brand-light text-brand-primary text-xs font-bold px-2 py-1 rounded">{items.length} Items</span>
          </div>
          
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
            {/* List rendered from state */}
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
            { items.length == 0 &&
           <p className='text-center h-full w-full flex items-center justify-center text-text-muted'>No ingredients yet</p>
            }

          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            {/* Image preview and upload controls */}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={async (e) => {
              const f = e.target.files && e.target.files[0];
                    if (!f) return;

                    const token = localStorage.getItem('token');
                    if (!token) {
                        alert("Please login to use the scanner.");
                        return;
                    }

                    setSelectedFile(f);
                    setPreviewUrl(URL.createObjectURL(f));
                    
              try {
                        setUploading(true);
                        const result = await scanImage(f, token);
                        const detectedObjects = result.data?.detected_ingredients || [];
                        setUploading(false);

                        if (detectedObjects.length === 0) {
                            alert('No ingredients detected. Try a clearer image.');
                        } else {

                            const newIngredients: Ingredient[] = detectedObjects.map((ingredient: any) => ({
                                name: ingredient.name,
                                quantity: ingredient.quantity,
                                unit: ingredient.unit
                            }));

                            setItems((prev) => [...prev, ...newIngredients]);
                        }
              } catch (err:any) {
                console.error('upload error', err);
                alert('Upload failed: ' + (err?.message || String(err)));
              } finally {
                setUploading(false);
                setSelectedFile(null);
                setPreviewUrl(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }
            }} />


             <button onClick={saveIngredients} className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 hover:bg-brand-dark transition transform hover:-translate-y-1 flex justify-center items-center gap-2">
                Save to Pantry
             </button>
          </div>
        </div>
        
      </div>
    </div>
  );
interface DetectedProps {
  name: string;
  qty: number;
  unit: string;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
}

function DetectedItemRow({ name, qty, unit, onIncrease, onDecrease, onRemove }: DetectedProps) {
  return (
    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 group hover:border-brand-primary/50 transition">
      <div className="flex-1">
        <h4 className="font-bold text-gray-800 truncate">{name}</h4>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-white rounded-md border border-gray-200 h-6">
          <button onClick={onDecrease} className="px-2 hover:bg-gray-100 text-gray-500 transition"><Minus size={10} /></button>
          <span className="text-xs font-semibold px-1 min-w-[20px] text-center">{qty}</span>
          <button onClick={onIncrease} className="px-2 hover:bg-gray-100 text-gray-500 transition"><Plus size={10} /></button>
        </div>
        <span className="text-xs text-gray-500 mr-4">{unit}</span>
        <button onClick={onRemove} className="text-gray-400 hover:text-red-500 transition"><Trash2 size={16} /></button>
      </div>
    </div>
  );
}
}




  


export default ScanPage;