import {Schema, arrayOf} from 'normalizr';

// Schemas for Github API responses.
const authorPerformanceIndexSchema = new Schema('articleAuthor', {
    idAttribute: 'articleAuthor'
});
export const authorPerformanceIndexSchemaArray = arrayOf(authorPerformanceIndexSchema);