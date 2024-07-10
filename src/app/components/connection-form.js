'use client';
import Input from './Input';
import Button from './Button';

const ConnectionForm = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        console.log(formData.get('connections'));
        console.log(formData.get('keyWords'));
        console.log(formData.get('locations').split(','));
        console.log(formData.get('title'));
        console.log(formData.get('locations').split(','));
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="flex flex-col space-y-2">
                1. How many connections would you like to send?
                <Input name="connections" type="number" placeholder="Connections" className="input-bordered" />
            </label>

            <label className="flex flex-col space-y-2">
                2. Add keywords.
                <Input name="keyWords" type="text" placeholder="Keywords" className="input-bordered" />
            </label>
            <label className="flex flex-col space-y-2">
                3. Add Locations (There may be several. Separate the values ​​with a comma).
                <Input name="locations" type="text" placeholder="Locations" className="input-bordered" />
            </label>
            <label className="flex flex-col space-y-2">
                4. Add Title.
                <Input name="title" type="text" placeholder="Title" className="input-bordered" />
            </label>
            <label className="flex flex-col space-y-2">
                4. Add Profile language. (There may be several. Example: en, fr, es, ru).
                <Input name="languages" type="text" placeholder="Languages" className="input-bordered" />
            </label>

            <Button type="submit" className="btn-primary">
                <p>Connecting</p>
            </Button>
        </form>
    );
};

export default ConnectionForm;
