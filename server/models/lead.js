import { Schema, model } from 'mongoose'
import { generateUniqueIdentifier } from '../utils/utils.js'

const leadSchema = Schema({

    client: { type: Schema.Types.ObjectId, ref: 'User', required: true, },
    city: { type: String, required: true },
    country: { type: String, required: true },
    degree: { type: String, required: true },
    visa: { type: String, required: true },
    priority: { type: String, required: true, default: 'moderate', enum: ['veryCold', 'cold', 'moderate', 'hot', 'veryHot'] },
    status: { type: String, required: true },   // closed, followed up, contacted etc.
    source: { type: String, required: true },   // facebook,instagram etc.
    description: { type: String, required: true },
    allocatedTo: { type: [Schema.Types.ObjectId], ref: 'User' },
    images: { type: [String], required: true, default: [] },
    isArchived: { type: Boolean, required: false, default: false },
    followUps: { type: [Schema.Types.ObjectId], ref: 'FollowUp', default: [] },
    isAppliedForRefund: { type: Boolean, default: false },
    uid: { type: String, },
}, { timestamps: true })

// Before saving a new document, generate a unique readable identifier
leadSchema.pre('save', async function (next) {
    if (!this.uid) {
        let isUnique = false;
        let generatedIdentifier;

        while (!isUnique) {
            // Generate a unique identifier (you can use a library for this)
            generatedIdentifier = generateUniqueIdentifier();

            // Check if it's unique in the collection
            const existingDocument = await this.constructor.findOne({ uid: generatedIdentifier });

            if (!existingDocument) {
                isUnique = true; // Identifier is unique, exit the loop
            }
        }

        // Assign the generated identifier to the document
        this.uid = generatedIdentifier;
    }
    next();
});


const leadModel = model('Lead', leadSchema)
export default leadModel