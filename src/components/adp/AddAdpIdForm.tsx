import { useState } from 'react';
import { Formik, Form as FormikForm, Field } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { Button, Form, Spinner } from 'react-bootstrap';
import { agent } from '../../api/agent';
import { router } from '../../router/routes';

interface EmployeeOption {
    value: number;
    label: string;
}

const AddAdpIdForm = () => {
    const [employeeOptions, setEmployeeOptions] = useState<EmployeeOption[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchEmployees = async (inputValue: string) => {
        setLoading(true);
        try {
            const employees = await agent.Employees.search(inputValue); // Backend call to search employees
            const options = employees.map((employee) => ({
                value: employee.id,
                label: employee.fullName,
            }));
            setEmployeeOptions(options);
        } catch (error) {
            console.error('Error fetching employees', error);
        } finally {
            setLoading(false);
        }
    };

    const validationSchema = Yup.object({
        employeeId: Yup.number().required('Employee is required'),
        adpId: Yup.number().typeError('ADP ID must be a number').required('ADP ID is required'),
    });

    return (
        <Formik
            initialValues={{ employeeId: 0, adpId: 0 }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                try {
                    await agent.Adp.add(values.adpId, values.employeeId);
                    resetForm();
                    router.navigate('/adp');
                } catch (error) {
                    console.error('Error adding ADP ID', error);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ setFieldValue, isSubmitting }) => (
                <FormikForm>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Employee</Form.Label>
                        <Select
                            options={employeeOptions}
                            isLoading={loading}
                            onInputChange={(inputValue) => {
                                fetchEmployees(inputValue); // Fetches options but doesn’t interfere with React Select
                                return inputValue; // Ensure onInputChange returns the input value to React Select
                            }}
                            onChange={(option) => setFieldValue('employeeId', option?.value || 0)}
                            placeholder="Search and select an employee"
                        />
                        <Field name="employeeId">
                            {({ meta }: any) =>
                                meta.touched && meta.error ? (
                                    <div className="text-danger">{meta.error}</div>
                                ) : null
                            }
                        </Field>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>ADP ID</Form.Label>
                        <Field
                            name="adpId"
                            type="number"
                            as={Form.Control}
                            placeholder="Enter ADP ID"
                        />
                        <Field name="adpId">
                            {({ meta }: any) =>
                                meta.touched && meta.error ? (
                                    <div className="text-danger">{meta.error}</div>
                                ) : null
                            }
                        </Field>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <Spinner as="span" animation="border" size="sm" /> : 'Add ADP ID'}
                    </Button>
                </FormikForm>
            )}
        </Formik>
    );
};

export default AddAdpIdForm;
