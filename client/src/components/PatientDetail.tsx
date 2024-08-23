import React, { useEffect, useState } from "react";
import { Api, Patients } from "../Api"; // Adjust the import based on your file structure
import { useParams } from "react-router-dom"; // Assuming you are using react-router-dom for routing

const api = new Api(); // Instantiate the Api class

const PatientDetail = () => {
    const { id } = useParams<{ id: string }>(); // Get the patient ID from the route parameters
    const [patient, setPatient] = useState<Patients | null>(null);

    useEffect(() => {
        const fetchPatientDetail = async () => {
            try {
                const response = await api.patients.patientsList();
                // @ts-ignore
                const patient = response.data.find((p: Patients) => p.id.toString() === id);
                if (patient) {
                    setPatient(patient);
                }
            } catch (error) {
                console.error("Error fetching patient details:", error);
            }
        };

        fetchPatientDetail();
    }, [id]);

    if (!patient) {
        return <div>No patient found</div>;
    }

    return (
        <div>
            <h1>Patient Details</h1>
            <p>ID: {patient.id}</p>
            <p>Name: {patient.name}</p>
        </div>
    );
};

export default PatientDetail;