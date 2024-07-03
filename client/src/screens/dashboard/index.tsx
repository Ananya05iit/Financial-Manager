import { useUser } from "@clerk/clerk-react";
import { useMemo } from "react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { Financeform } from "./form";
import { Financelist } from "./list";
import "./record.css";

export const Dashboard = () =>{
    const {user} = useUser();
    const {records} = useFinancialRecords();

    const totalMonthly = useMemo(() => {
        let totalAmount = 0;
        records.forEach((record) => {
            totalAmount += record.Amount;
        });
        return totalAmount;
    }, [records]);
    return (
        <div className="dashboard-container">
            <h1> Welcome {user?.firstName}! Here are your finances:</h1>
            <Financeform/>
            <div> Total Monthly: Rs.{totalMonthly} </div>
            <Financelist/>
        </div>
    );
}