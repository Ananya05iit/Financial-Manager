import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export { createContext } from "react";

export interface FinancialRecord {
    _id?: string;
    userId: string;
    date: Date;
    Description: string;
    Amount: number;
    Category: string;
    PaymentMethod: string;
}

interface FinancialRecordsContextType{
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    updateRecord: (id: string, newRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void;
}


export const FinancialRecordsContext = createContext<
    FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [records, setRecords] = useState<FinancialRecord[]>([]);
    const {user} = useUser();
    //now to list the elements of the database
    const fetchRecords = async () => {
        if(!user) return;
        const response = await fetch(
            `http://localhost:3001/financial-records/getAllByUserID/${user?.id}`
        );
        if(response.ok){
            const records = await response.json();
            setRecords(records);
        }
    };

    //for rendering the fetchRecords
    useEffect(() =>{
        fetchRecords()
    }, [user]); //this line means we only wanna run it once


    //this adds record to database 
    const addRecord = async (record: FinancialRecord) => {
        //here response makes a api post request to access data
        const response = await fetch("http://localhost:3001/financial-records", {
            method: "POST", 
            body: JSON.stringify(record),
            headers: { //to specify the content types
                "Content-Type": "application/json",
            },
        });

        try{
            if(response.ok){
                const newRecord = await response.json(); //returns a new request from json
                setRecords((prev) => [...prev, newRecord]); //firstly make it same array as before then add newRecord
            }
        } catch (err) {}
    };


    //this updates record to database 
    const updateRecord = async (id: string, newRecord: FinancialRecord) => {
        //here response makes a api post request to access data
        const response = await fetch(`http://localhost:3001/financial-records/${id}`,
        {
            method: "PUT", 
            body: JSON.stringify(newRecord),
            headers: { //to specify the content types
                "Content-Type": "application/json",
            },
        });

        try{
            if(response.ok){
                const newRecord = await response.json(); //returns a new request from json
                setRecords((prev) => prev.map((record) =>{
                    if(record._id === id){
                        return newRecord;
                    }
                    else{
                        return record;
                    }
                })); //firstly make it same array as before then add newRecord
            }
        } catch (err) {}
    };

    const deleteRecord =async (id: string) => {
        const response = await fetch(`http://localhost:3001/financial-records/${id}`, {
            method: "DELETE",
        });

        try{
            if(response.ok){
                const deletedRecord = await response.json(); //returns a new request from json
                setRecords((prev) => prev.filter((record) => record._id !== deletedRecord._id)); //firstly make it same array as before then add newRecord
            }
        } catch (err) {}
    }

    return (
        <FinancialRecordsContext.Provider value = {{records, addRecord, updateRecord, deleteRecord}}>
            {children}
        </FinancialRecordsContext.Provider>
    );
};

//this component is to check that the financial recordds are accessed in the 
//financial record provider only n not in any other function like the auth

export const useFinancialRecords = () => {
    const context = useContext<FinancialRecordsContextType | undefined>(
        FinancialRecordsContext
    );

    if(!context){
        throw new Error(
            "useFinancialRecords must be used within FinancialRecordProvider"
        );
    }

    return context;
};