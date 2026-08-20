import React, { useEffect, useState } from 'react';
import {
  deleteIngredients,
  fetchIngredients,
  updateIngredient,
} from '../apis/ingredientsAPI';
import {
  Search,
  Plus,
  Leaf,
  AlertTriangle,
  Minus,
  Trash2,
  ThumbsUp,
  Sparkles,
  Package,
} from 'lucide-react';

function Pantry() {
  const [pantryItems, setPantryItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');

  const filteredItems = pantryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getIngredients();
  }, [token]);

  const getIngredients = async () => {
    if (token) {
      const ingredients = await fetchIngredients(token);
      setPantryItems(ingredients.data);
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (token) {
      await deleteIngredients(id, token);
      getIngredients();
    }
  };

  const handleUpdateItem = async (id: number, value: number) => {
    if (!token) return;

    const item = pantryItems.find((i) => i.id === id);
    if (!item) return;

    const newQuantity = item.quantity + value;
    if (newQuantity < 0) return;

    await updateIngredient(
      id,
      {
        name: item.name,
        quantity: newQuantity,
        unit: item.unit,
      },
      token
    );

    getIngredients();
  };

  return (
    <div className="animate-fade-in w-full max-w-6xl mx-auto px-4 md:px-8 py-8">
      {/* ================= HERO HEADER ================= */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Smart Pantry</h1>
          <p className="text-gray-500 mt-2">
            Manage all your ingredients in one intelligent pantry.
          </p>
        </div>

        <a
          href="/scanPage"
          className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-emerald-600 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Plus size={20} />
          Add Ingredients
        </a>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          icon={<Package size={24} />}
          label="Total Items"
          value={pantryItems.length}
          color="text-emerald-500"
          bgColor="bg-white"
        />

        <StatCard
          icon={<ThumbsUp size={24} />}
          label="Pantry Health"
          value="100%"
          color="text-blue-500"
          bgColor="bg-white"
        />
      </div>

      {/* ================= PANTRY LIST ================= */}
      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden min-h-[400px]">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Pantry Inventory
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Review and manage your saved ingredients.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>
            
            <span className="hidden md:flex bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-100 whitespace-nowrap">
              {filteredItems.length} Items Found
            </span>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-100/60 p-2 md:p-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <PantryRow
                key={item.id}
                item={item}
                onDelete={() => handleDeleteItem(item.id)}
                onAdd={() => handleUpdateItem(item.id, 1)}
                onSubstract={() => handleUpdateItem(item.id, -1)}
              />
            ))
          ) : (
            <div className="min-h-[320px] flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 rounded-[1.5rem] bg-gray-50 border border-gray-100 flex items-center justify-center mb-5">
                <Package
                  size={36}
                  className="text-gray-300"
                />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No Ingredients Found
              </h3>

              <p className="text-sm text-gray-500 max-w-sm">
                {searchTerm
                  ? `No ingredients match "${searchTerm}".`
                  : 'Your pantry is empty. Start adding ingredients to build your smart pantry.'}
              </p>

              {!searchTerm && (
                <a
                  href="/scanPage"
                  className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Your First Ingredient
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ================= STAT CARD =================
const StatCard = ({
  icon,
  label,
  value,
  color,
  bgColor,
}: any) => (
  <div
    className={`${bgColor} p-6 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-5`}
  >
    <div
      className={`w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center ${color}`}
    >
      {icon}
    </div>

    <div>
      <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{label}</p>
      <h4 className="text-3xl font-black text-gray-900 tracking-tight mt-0.5">
        {value}
      </h4>
    </div>
  </div>
);

// ================= PANTRY ROW =================
const PantryRow = ({
  item,
  onDelete,
  onAdd,
  onSubstract,
}: any) => {
  let statusStyle =
    'bg-emerald-50 text-emerald-600 border border-emerald-100';
  let statusIcon = <Leaf size={12} />;
  let statusText = 'Fresh';

  if (item.status === 'Expiring') {
    statusStyle =
      'bg-orange-50 text-orange-600 border border-orange-100';
    statusIcon = <AlertTriangle size={12} />;
    statusText = 'Expiring Soon';
  } else if (item.status === 'Expired') {
    statusStyle =
      'bg-red-50 text-red-600 border border-red-100';
    statusIcon = <Trash2 size={12} />;
    statusText = 'Expired';
  }

  return (
    <div className="group p-4 rounded-2xl hover:bg-gray-50/50 transition-colors duration-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center flex-shrink-0">
            <Sparkles
              size={18}
              className="text-emerald-500"
            />
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 text-base truncate capitalize">
              {item.name}
            </h3>
            <p className="text-xs font-semibold text-gray-400 mt-0.5">
              Pantry Ingredient
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={onSubstract}
              className="px-3 py-2 text-gray-500 hover:bg-gray-100 transition"
            >
              <Minus size={14} />
            </button>

            <span className="px-3 min-w-[48px] text-center font-bold text-gray-800 text-sm">
              {item.quantity}
            </span>

            <button
              onClick={onAdd}
              className="px-3 py-2 text-gray-500 hover:bg-gray-100 transition"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Unit */}
          <span className="text-xs font-bold text-gray-400 min-w-[40px] text-center uppercase tracking-wider">
            {item.unit}
          </span>

          {/* Status */}
          <div
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${statusStyle}`}
          >
            {statusIcon}
            {statusText}
          </div>

          {/* Delete Button */}
          <button
            onClick={onDelete}
            title="Delete Item"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pantry;

