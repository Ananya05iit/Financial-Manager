import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useFinancialRecords } from "../../contexts/financial-record-context";

export const Financeform = () => {

    const [Description, setDescription] = useState<string>("");
    const [Amount, setAmount] = useState<string>("");
    const [Category, setCategory] = useState<string>("");
    const [PaymentMethod, setPaymentMethod] = useState<string>("");
    const {addRecord} = useFinancialRecords();
    const {user} = useUser();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newRecord = {
          userId: user?.id ?? "",
          date: new Date(),
          Description: Description,
          Amount: parseFloat(Amount),
          Category: Category,
          PaymentMethod: PaymentMethod,
        };

        addRecord(newRecord);

        setDescription("");
        setAmount("");
        setCategory("");
        setPaymentMethod("");
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className = "form-field">
                    <label>Description:</label>
                    <input type = "text" required className = "input" 
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label>Amount:</label>
                    <input type = "number" required className="input" 
                        value={Amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label>Category:</label>
                    <select required className="input"
                        value={Category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value = "">Select a category</option>
                        <option value = "Food">Food</option>
                        <option value = "Rent">Rent</option>
                        <option value = "Salary">Salary</option>
                        <option value = "Medical">Medical</option>
                        <option value = "Household expenditure">Household expenditure</option>
                        <option value = "Entertainment">Entertainment</option>
                        <option value = "Travel">Travel</option>
                        <option value = "Interest & Stocks">Interest & Stocks</option>
                        <option value = "Utilities">Utilities</option>
                        <option value = "Investment">Investment</option>
                        <option value = "Other">Other</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Payment Method:</label>
                    <select required className="input"
                        value={PaymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value ="">Select a Payment Method</option>
                        <option value = "Credit Card">Credit Card</option>
                        <option value = "Debit Card">Debit Card</option>
                        <option value = "UPI">UPI</option>
                        <option value = "Cash">Cash</option>
                        <option value = "Money Received">Money Received</option>
                    </select>
                </div>
                <button type="submit" className="button">
                    Add Record
                </button>
            </form>
        </div>
    );
}