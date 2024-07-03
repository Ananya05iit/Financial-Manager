import mongoose from "mongoose";

interface FinancialRecord{
    userId: string;
    date: Date;
    Description: string;
    Amount: number;
    Category: string;
    PaymentMethod: string;
}

const financialRecordSchema = new mongoose.Schema <FinancialRecord>({
    userId: {type: String, required: true},
    date: {type: Date, required: true},
    Description: {type: String, required: true},
    Amount: {type: Number, required: true},
    Category: {type: String, required: true},
    PaymentMethod: {type: String, required: true},
});

const FinancialRecordModel = mongoose.model<FinancialRecord>(
    "FinancialRecord",
    financialRecordSchema
);

export default FinancialRecordModel;