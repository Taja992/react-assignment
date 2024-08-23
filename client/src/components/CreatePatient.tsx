import React, { useState } from "react";
import { Api } from "../Api";

const api = new Api();

const AddPatient = ({ onPatientAdded }: {onPatientAdded: () => void }) => {
    const [name, setName] = useState("");

    const submitPatient = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await api.patients.patientsCreate({name});
            onPatientAdded();
            setName("");
        } catch (error) {
            console.error("Error Adding patient.", error);
        }
    };

    return (
        <form onSubmit={submitPatient}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Patient Name"
                   className="border p-2"/>
            <button type="submit" className="bg-blue-500 text-white p-2 ml-2"> Add Patient</button>
        </form>
    );
};

export default AddPatient;