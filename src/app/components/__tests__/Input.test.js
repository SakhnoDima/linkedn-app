import { render, screen } from '@testing-library/react';
import Input from '../Input';
import { Formik, Form, Field } from 'formik';

describe('Input', () => {
    it('renders the input component', () => {
        render(
            <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
                <Form>
                    <Field name="test" placeholder="Test Input" as={Input} />
                </Form>
            </Formik>
        );
        expect(screen.getByPlaceholderText('Test Input')).toBeInTheDocument();
    });
});
