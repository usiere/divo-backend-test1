import mongoose from 'mongoose';

const nestSchema = new mongoose.Schema({
    category: String,
    item: String,
    size: String,
    price: String,
    qty: String,
    brand: String,
    settime: String,
    itempic: String,
    body: String,
    dueDate: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
});
nestSchema.set('timestamps', true); // Adds create_at and updated_at timestamps

export default mongoose.model('nest', nestSchema);