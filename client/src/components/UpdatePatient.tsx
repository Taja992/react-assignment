import React, { useState } from "react";
import { Api } from "../Api";

const api = new Api();


const UpdatePatient = ({id, currentName, onPatientUpdated}: {id: string, currentName: string, onPatientUpdated: () => void }) => {
    const [name, setName] = useState(currentName);

    const handleUpdate = async () => {
        try {
            const query = { id: `eq.${id}` };
            await api.patients.patientsPartialUpdate({name}, query);
            onPatientUpdated();
        } catch (error) {
            console.error("Error updating patient", error);
        }
    };

    return (
        <>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border p-1"/>
            <button onClick={handleUpdate} className="ml-2 text-blue-500 hover:underline">Update</button>

        </>
    )
}

export default UpdatePatient;