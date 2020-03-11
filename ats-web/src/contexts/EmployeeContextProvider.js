import React, { useEffect } from "react";
import * as SharedApi from '../api/sharedApi';
import EmployeeContext from './EmployeeContext';

function EmployeeContextProvider({ children }) {
    const [employees, setEmployees] = React.useState(null);

    useEffect(() => {
        if (!employees) {
            async function fetchEmployeeDetails() {
                const _employeeDetails = await SharedApi.getDetails('employees');
                if (Object.entries(_employeeDetails).length !== 0) {
                    setEmployees(_employeeDetails);
                }
            }
            fetchEmployeeDetails();
        }
    }, [])

    return (
        <EmployeeContext.Provider value={employees}>
            {children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeContextProvider;