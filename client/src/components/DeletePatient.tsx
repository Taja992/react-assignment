
import { Api } from "../Api";

const api = new Api();

const DeletePatient = ({ id, onPatientDeleted }: {id: string, onPatientDeleted: () => void }) => {
    const handleDelete = async () => {
        try {
            await api.patients.patientsDelete({id: 'eq.'+id})
            onPatientDeleted();
        } catch (error) {
            console.error("Error deleting", error);
        }
    };

    return (
        <button onClick={handleDelete} className="ml-2 text-red-500 hover:underline">Delete Patient</button>
    )
};

export default DeletePatient;