'use client';
import Input from './Input';
import Button from './Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ArrayInput from "@/app/components/array-input";

const validationSchema = Yup.object({
    connections: Yup.number().required('Required*'),
    keyWords: Yup.array().of(Yup.string()).required('Required*'),
    locations: Yup.array().of(Yup.string()).required('Required*'),
    title: Yup.string().required('Required*'),
    languages: Yup.array().of(Yup.string()).required('Required*'),
    industries: Yup.array().of(Yup.string()).required('Required*'),
    serviceCategories: Yup.array().of(Yup.string()).required('Required*'),
});


const ConnectionForm = () => {
    const languageOptions = [
        { value: 'en', label: 'English' },
        { value: 'fr', label: 'French' },
        { value: 'es', label: 'Spanish' },
        { value: 'ru', label: 'Russian' },
        { value: 'de', label: 'German' }
    ];
    return (
        <Formik
            initialValues={{
                connections: '',
                keyWords: [],
                locations: [],
                title: '',
                languages: [],
                industries: [],
                serviceCategories: [],
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values.connections);
                console.log(values.keyWords);
                console.log(values.locations);
                console.log(values.title);
                console.log(values.languages);
                console.log(values.industries);
                console.log(values.serviceCategories);

                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col space-y-4 p-4">
                    <div className="flex center gap-[30px] mx-auto">
                        <label className="flex flex-col space-y-2 w-[500px]">
                            1. How many connections would you like to send?
                            <Field name="connections" type="number" placeholder="Connections" as={Input}/>
                            <ErrorMessage name="connections" component="div" className="text-red-500"/>
                        </label>
                        <label className="flex flex-col space-y-2 w-[500px]">
                            2. Add Title
                            <Field className="mt-1" name="title" type="text" placeholder="Title" as={Input}/>
                            <ErrorMessage name="title" component="div" className="text-red-500"/>
                        </label>
                    </div>
                    <div
                        className="mx-auto py-2 px-4 mb-4 text-sm text-red-800 bg-yellow-50 border border-yellow-200 rounded-lg">
                        Separate the values ​​with a comma in the 3-6 fields!
                    </div>
                    <div className="flex center gap-[30px] mx-auto">
                        <label className="flex flex-col space-y-2">
                            3. Add Locations
                            <Field name="locations" placeholder="Locations" component={ArrayInput}/>
                            <ErrorMessage name="locations" component="div" className="text-red-500"/>
                        </label>
                        <label className="flex flex-col space-y-2">
                            4. Add keywords
                            <Field name="keyWords" placeholder="Keywords" component={ArrayInput}/>
                            <ErrorMessage name="keyWords" component="div" className="text-red-500"/>
                        </label>
                    </div>
                    <div className="flex center gap-[30px] mx-auto">
                        <label className="flex flex-col space-y-2">
                            5. Add service categories
                            <Field name="serviceCategories" placeholder="Service categories" component={ArrayInput}/>
                            <ErrorMessage name="serviceCategories" component="div" className="text-red-500"/>
                        </label>
                        <label className="flex flex-col space-y-2 w-[500px]">
                            6. Add industry
                            <Field name="industries" type="text" placeholder="Industries" component={ArrayInput}/>
                            <ErrorMessage name="industries" component="div" className="text-red-500"/>
                        </label>
                    </div>

                    <label className="flex flex-col mx-auto">
                        <span className="mt-5">7. Add profile language</span>
                        <Field
                            name="languages"
                            component={({field, form, ...props}) => (
                                <div className="flex space-x-4 bg-indigo-50 p-2 border-2 rounded-[5px]">
                                    {languageOptions.map(option => (
                                        <div key={option.value} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={option.value}
                                                {...field}
                                                {...props}
                                                value={option.value}
                                                checked={field.value.includes(option.value)}
                                                onChange={() => {
                                                    if (field.value.includes(option.value)) {
                                                        const nextValue = field.value.filter(value => value !== option.value);
                                                        form.setFieldValue(field.name, nextValue);
                                                    } else {
                                                        const nextValue = [...field.value, option.value];
                                                        form.setFieldValue(field.name, nextValue);
                                                    }
                                                }}
                                                className="mr-2"
                                            />
                                            <label htmlFor={option.value}>{option.label}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                        <ErrorMessage name="languages" component="div" className="text-red-500"/>
                    </label>


                    <Button type="submit"
                            className="mx-auto w-72 bg-indigo-600 hover:bg-indigo-800 rounded-[10px] text-white p-2"
                            disabled={isSubmitting}>
                        <p>CONNECTING</p>
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default ConnectionForm;
