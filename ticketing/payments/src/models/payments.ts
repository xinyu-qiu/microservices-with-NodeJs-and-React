import mongoose from "mongoose";

interface PaymentAttrs {
  orderId: string;
  stripedId: string;
}

interface PaymentDoc extends mongoose.Document {
  orderId: string;
  stripedId: string;
}

interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
}

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true
  },
  stripedId: {
    type: String,
    required: true 
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id= ret._id;
      delete ret._id;
    }
  }
});

paymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>('Payment', paymentSchema);

export { Payment };