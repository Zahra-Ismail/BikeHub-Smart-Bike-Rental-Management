import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Bike } from '../../lib/database.types';
import { Plus, Bike as BikeIcon, Edit2, Trash2 } from 'lucide-react';

interface BikeManagementProps {
  bikes: Bike[];
  onUpdate: () => void;
}

export default function BikeManagement({ bikes, onUpdate }: BikeManagementProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingBike, setEditingBike] = useState<Bike | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    price_per_hour: 10,
    status: 'available' as 'available' | 'rented' | 'maintenance',
  });
  const [processing, setProcessing] = useState(false);

  const openModal = (bike?: Bike) => {
    if (bike) {
      setEditingBike(bike);
      setFormData({
        name: bike.name,
        description: bike.description || '',
        image_url: bike.image_url || '',
        price_per_hour: bike.price_per_hour,
        status: bike.status,
      });
    } else {
      setEditingBike(null);
      setFormData({
        name: '',
        description: '',
        image_url: '',
        price_per_hour: 10,
        status: 'available',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      if (editingBike) {
        const { error } = await supabase
          .from('bikes')
          .update(formData)
          .eq('id', editingBike.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('bikes')
          .insert(formData);

        if (error) throw error;
      }

      setShowModal(false);
      onUpdate();
    } catch (error) {
      console.error('Error saving bike:', error);
      alert('Failed to save bike');
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (bikeId: string) => {
    if (!confirm('Are you sure you want to delete this bike?')) return;

    try {
      const { error } = await supabase
        .from('bikes')
        .delete()
        .eq('id', bikeId);

      if (error) throw error;
      onUpdate();
    } catch (error) {
      console.error('Error deleting bike:', error);
      alert('Failed to delete bike');
    }
  };

  return (
    <>
      <div className="mb-6">
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Bike</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bikes.map((bike) => (
          <div key={bike.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              {bike.image_url ? (
                <img src={bike.image_url} alt={bike.name} className="w-full h-full object-cover" />
              ) : (
                <BikeIcon className="w-20 h-20 text-white" />
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900">{bike.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  bike.status === 'available' ? 'bg-green-100 text-green-800' :
                  bike.status === 'rented' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {bike.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{bike.description || 'No description'}</p>
              <p className="text-2xl font-bold text-blue-600 mb-4">${bike.price_per_hour}/hr</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(bike)}
                  className="flex-1 flex items-center justify-center space-x-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(bike.id)}
                  className="flex-1 flex items-center justify-center space-x-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingBike ? 'Edit Bike' : 'Add New Bike'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Hour
                </label>
                <input
                  type="number"
                  value={formData.price_per_hour}
                  onChange={(e) => setFormData({ ...formData, price_per_hour: Number(e.target.value) })}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {processing ? 'Saving...' : editingBike ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
