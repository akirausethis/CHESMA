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
  ChefHat,
} from 'lucide-react';

function Pantry() {
  // ================= STATE MANAGEMENT =================
  const [pantryItems, setPantryItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');

  // ================= FILTERED ITEMS =================
  const filteredItems = pantryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ================= FETCH DATA =================
  useEffect(() => {
    getIngredients();
  }, [token]);

  const getIngredients = async () => {
    if (token) {
      const ingredients = await fetchIngredients(token);
      setPantryItems(ingredients.data);
    }
  };

  // ================= DELETE ITEM =================
  const handleDeleteItem = async (id: number) => {
    if (token) {
      await deleteIngredients(id, token);
      getIngredients();
    }
  };

  // ================= UPDATE QUANTITY =================
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
    <div className="animate-fade-in w-full px-5 pb-10">
      {/* ================= HERO HEADER ================= */}
      <div className="mb-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <ChefHat size={30} />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold">My Smart Pantry</h1>
              <p className="text-emerald-100 mt-1">
                Manage all your ingredients in one intelligent pantry.
              </p>
            </div>
          </div>

          <a
            href="/scanPage"
            className="bg-white text-emerald-600 px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} />
            Add Ingredients
          </a>
        </div>
      </div>

      {/* ================= SEARCH BAR ================= */}
      <div className="mb-8 bg-white/90 backdrop-blur-sm rounded-3xl p-5 shadow-xl border border-white/60">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          icon={<Package size={24} />}
          label="Total Items"
          value={pantryItems.length}
          color="text-gray-800"
          bgColor="bg-white"
        />

        <StatCard
          icon={<ThumbsUp size={24} />}
          label="Pantry Health"
          value="100%"
          color="text-emerald-600"
          bgColor="bg-emerald-50"
        />
      </div>

      {/* ================= PANTRY LIST ================= */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 overflow-hidden min-h-[400px]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Pantry Inventory
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Review and manage your saved ingredients.
            </p>
          </div>

          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full w-fit">
            {filteredItems.length} Items Found
          </span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-50">
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
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center mb-4">
                <Package
                  size={36}
                  className="text-emerald-400"
                />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
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
                  className="mt-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
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
    className={`${bgColor} p-6 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300`}
  >
    <div className="flex items-center gap-4">
      <div
        className={`w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center ${color}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <h4 className="text-3xl font-extrabold text-gray-900">
          {value}
        </h4>
      </div>
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
    'bg-green-100 text-green-700 border-green-200';
  let statusIcon = <Leaf size={12} />;
  let statusText = 'Fresh';

  if (item.status === 'Expiring') {
    statusStyle =
      'bg-orange-100 text-orange-700 border-orange-200';
    statusIcon = <AlertTriangle size={12} />;
    statusText = 'Expiring Soon';
  } else if (item.status === 'Expired') {
    statusStyle =
      'bg-red-100 text-red-700 border-red-200';
    statusIcon = <Trash2 size={12} />;
    statusText = 'Expired';
  }

  return (
    <div className="group p-5 hover:bg-gray-50 transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <Sparkles
              size={18}
              className="text-emerald-500"
            />
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 text-lg truncate">
              {item.name}
            </h3>
            <p className="text-sm text-gray-400">
              Pantry Ingredient
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <button
              onClick={onSubstract}
              className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition"
            >
              <Minus size={14} />
            </button>

            <span className="px-4 min-w-[60px] text-center font-bold text-gray-800">
              {item.quantity}
            </span>

            <button
              onClick={onAdd}
              className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Unit */}
          <span className="text-sm font-semibold text-gray-500 min-w-[50px] text-center">
            {item.unit}
          </span>

          {/* Status */}
          <div
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${statusStyle}`}
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