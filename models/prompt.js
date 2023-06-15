import { model, Schema, models } from 'mongoose';

const promptSchema = new Schema( {
    prompt: {
        type: String,
        required: [ true, 'Prompt is required' ]
    },
    tag: {
        type: String,
        required: [ true, 'tag is required' ],
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
} );
const Prompt = models.Prompt || model( 'Prompt', promptSchema );

export default Prompt;