import { SignedIn, UserButton } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import { FinancialRecordProvider } from "./contexts/financial-record-context";
import { Auth } from "./screens/auth";
import { Dashboard } from "./screens/dashboard";

function App() {

  return <Router>
    <div className="app-container">
      <div className="navbar">
        <Link to = "/"> Dashboard</Link> 
        <SignedIn>
                <UserButton appearance={{baseTheme: dark}}/>
        </SignedIn>
      </div>
      <Routes>
        <Route path = "/" element = {
            <FinancialRecordProvider>
                <Dashboard/>
            </FinancialRecordProvider>
            }
          />
        <Route path = "/auth" element = {<Auth/>} />
      </Routes>
    </div>
  </Router>
}

export default App
