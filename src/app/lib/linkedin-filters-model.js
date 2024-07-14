import mongoose from 'mongoose';

const LinkedinFiltersSchema = new mongoose.Schema({
    connections: {
        type: Number,
    },
    keyWords: {
        type: Array,
    },
    locations: {
        type: Array,
    },
    title: {
        type: String,
    },
    languages: {
        type: Array,
    },
    industries: {
        type: Array,
    },
    serviceCategories: {
        type: Array,
    },


});

const LinkedinFilters = mongoose.models.LinkedinFilters || mongoose.model('LinkedinFilters', LinkedinFiltersSchema);


export default LinkedinFilters;