import mongoose from 'mongoose';

const LinkedinFiltersSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users_collection',
        required: true
    },
    targetName:{
        type: String,
    },
    connections: {
        type: Number,
    },
    keyWords: {
        type: String,
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