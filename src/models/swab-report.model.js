const mongoose = require('mongoose');

const { Schema } = mongoose;

const SwabReportSchema = new Schema(
  {
    // NOTE: Authorization shall be added as req metadata, not here

    // Used to identify the reporting patient
    node_id: { type: Schema.Types.String, required: true },

    // Info on patient's medical status
    patient_info: {
      // accepting negative just in case we do monitoring in the future
      test_result: { type: Schema.Types.Boolean, required: true },

      // Contacts up to this point will be notified
      test_result_date: { type: Schema.Types.Date, required: true },

      // first 2 is when positive, last is when negative
      // symptom: {
      //   type: Schema.Types.String,
      //   enum: ['symptomatic', 'asymptomatic', 'not-applicable'],
      //   required: true,
      // },

      // Onset of Illness, or Testing date (if asymp)
      // Contacts starting from this date will be notified
      reference_date: { type: Schema.Types.Date, required: true },
    },

  },
  {
    // What shall happen if user reported more than once?
    timestamps: { createdAt: 'created_at' },
  },
);

module.exports = mongoose.model('SwabReport', SwabReportSchema);
