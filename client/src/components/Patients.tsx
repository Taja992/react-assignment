import React, { useEffect, useState } from "react";
import { Api, Patients } from "..//Api";
import {Link} from "react-router-dom";
import CreatePatient from "./CreatePatient.tsx";
import DeletePatient from "./DeletePatient.tsx";
import UpdatePatient from "./UpdatePatient";

const api = new Api();

const PatientsComponent = () => {
    const [patients, setPatients] = useState<Patients[]>([]);

    const fetchPatients = async () => {
        try {
            const response = await api.patients.patientsList();
            setPatients(response.data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    useEffect(() => {

        fetchPatients();
    }, []);

    return (
        <div>
            <h1>Patients:</h1>
            <ul>
                {patients.map((patient) => (
                    <li key={patient.id}>
                        ID#{patient.id}: <Link to={`/patients/${patient.id}`} className="text-blue-500 hover:underline">{patient.name}</Link>
                        <DeletePatient id={patient.id?.toString() || ''} onPatientDeleted={fetchPatients} />
                        <UpdatePatient id={patient.id?.toString() || ''} currentName={patient.name} onPatientUpdated={fetchPatients} />

                    </li>
                ))}
            </ul>
            <CreatePatient onPatientAdded={fetchPatients} />
        </div>
    );
};

export default PatientsComponent;