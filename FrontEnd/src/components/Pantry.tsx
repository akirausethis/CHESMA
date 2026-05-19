import React, { useEffect, useState } from 'react';
import { deleteIngredients, fetchIngredients, updateIngredient } from '../apis/ingredientsAPI';
import { Search, Plus, Leaf, AlertTriangle, Recycle, Calendar, Minus, Trash2, X, Check, ThumbsUp } from 'lucide-react';

function Pantry(){
  // --- STATE MANAGEMENT ---
  
  // 1. Data Dummy Awal (Sekarang dalam State agar bisa ditambah/hapus)
  const [pantryItems, setPantryItems] = useState<any[]>([]);

  // 2. State untuk Search
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem('token');

  // --- LOGIC FUNCTIONS ---

  // Fungsi Filter Search
  const filteredItems = pantryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
  


    getIngredients()
  }, [token])

  const getIngredients = async () => {
      if (token) {
        const ingredients = await fetchIngredients(token)
        setPantryItems(ingredients.data)

      }


    };


  // Fungsi Hapus Item
  const handleDeleteItem = async (id) => {
    

    if(token){
      await deleteIngredients(id, token)
      getIngredients()
    }
    
  };

  const handleUpdateItem = async (id, value) => {
    if(!token) return;

    const item = pantryItems.find(i => i.id === id);
    if (!item) return;

    var newQuantity = item.quantity + value

    if (newQuantity < 0) return;
      await updateIngredient(
          id, {
        name: item.name,
        quantity: newQuantity,
        unit: item.unit
      }, token
      )
      getIngredients()
    
  }

  return (
    <div className="animate-fade-in pb-10 relative w-full px-5">
      
      {/* --- HEADER & ACTIONS --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-brand-dark">My Smart Pantry</h2>
        
        <div className="flex gap-4 w-full md:w-auto">
          {/* Search Bar (Terhubung ke State) */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search ingredients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
            />
          </div>
          
          {/* Add Button (Buka Modal) */}
          <a
            href='/scanPage'
            className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-brand-dark transition flex items-center gap-2 whitespace-nowrap"
          >
            Add Item <Plus size={20} />
          </a>
        </div>
      </div>

      {/* --- STATS CARDS (Dinamis berdasarkan jumlah item) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={<Leaf size={24} />} 
          label="Total Items" 
          value={pantryItems.length} 
          color="text-brand-dark" 
          bgColor="bg-white"
        />
        <StatCard 
          icon={<ThumbsUp size={24} />} 
          label="Pantry Health" 
          value="100%" 
          color="text-brand-primary" 
          bgColor="bg-brand-light" 
        />
        {/* <StatCard 
          icon={<Recycle size={24} />} 
          label="Waste Saved" 
          value="1.5kg" 
          color="text-blue-600" 
          bgColor="bg-blue-50"
        /> */}
      </div>

      {/* --- PANTRY LIST TABLE --- */}
      <div className="bg-white rounded-3xl shadow-soft border border-gray-50 overflow-hidden min-h-[300px]">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-100 text-sm font-bold text-gray-500 uppercase tracking-wider">
          <div className="col-span-5">Item</div>
          <div className="col-span-3 text-center">Quantity</div>
          <div className="col-span-4 pl-4">Unit</div>
        </div>

        {/* Table Rows (Mapping dari filteredItems) */}
        <div className="divide-y divide-gray-50">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <PantryRow 
                key={item.id}
                item={item}
                onDelete={() => handleDeleteItem(item.id)}
                onAdd={() => handleUpdateItem(item.id,1)}
                onSubstract={() => handleUpdateItem(item.id,-1)}
              />
            ))
          ) : (
            <div className="p-10 text-center text-gray-400">
              <p>No items found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>

      

    </div>
  );
};

// --- SUB-COMPONENTS ---

const StatCard = ({ icon, label, value, color, bgColor }) => (
  <div className={`${bgColor} p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4`}>
    <div className={`p-3 bg-white rounded-xl shadow-sm ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <h4 className="text-2xl font-bold text-gray-800">{value}</h4>
    </div>
  </div>
);

const PantryRow = ({ item, onDelete, onAdd, onSubstract }) => {
  // Logic warna status
  let statusStyle = "bg-green-100 text-green-700";
  let statusIcon = <Leaf size={14} />;
  
  if (item.status === "Expiring") {
    statusStyle = "bg-orange-100 text-orange-700";
    statusIcon = <AlertTriangle size={14} />;
  } else if (item.status === "Expired") {
    statusStyle = "bg-red-100 text-red-700";
    statusIcon = <Trash2 size={14} />;
  }

  return (
    <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition group">
      {/* Item Column */}
      <div className="col-span-5 flex items-center gap-4">
        <span className="font-bold text-gray-800 text-lg">{item.name}</span>
      </div>

      {/* Quantity Column */}
      <div className="col-span-3 flex justify-center">
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm">
          <button onClick={onSubstract}  className="w-6 h-6 flex items-center justify-center bg-brand-primary text-white rounded hover:bg-brand-dark transition"><Minus size={14}/></button>
          <span className="font-semibold w-12 text-center text-sm truncate">{item.quantity}</span>
          <button onClick={onAdd}   className="w-6 h-6 flex items-center justify-center bg-brand-primary text-white rounded hover:bg-brand-dark transition"><Plus size={14}/></button>
        </div>
      </div>

      {/* Date & Status Column */}
      <div className="col-span-4 flex items-center justify-between pl-4">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          {item.unit}
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${statusStyle}`}>
            {statusIcon}
            {item.status === "Expiring" ? "Expiring Soon" : item.status}
          </div>
          {/* Tombol Hapus (Muncul saat Hover) */}
          <button 
            onClick={onDelete}
            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition"
            title="Delete Item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pantry;