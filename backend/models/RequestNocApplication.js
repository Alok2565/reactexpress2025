// const mongoose = required('mongoose');

// const ExporterNocApplicationSchema = new mongoose.Schema({
//   user_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     },
//   iec_code: {
//     type: String,
//     unique: true,
//     required: true,
//     sparse: true,
//   },
//   name_of_applicant: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   denied_export_auth_last_3_years_yes_no: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   upload_comp_institute_denied_export:{
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   denied_export_authorization_details:{
//     type: String,
//     required : true,
//     sparse: true,
//   },

//   upload_comp_instof_sending: {
//     type: String,
//     required: true,
//     sparse: true,
//   },
//   nameof_recipient: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   designationof_recipient: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   company_instof_recipient:{
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   upload_comp_instof_recipient:{
//     type: String,
//     required : true,
//     sparse: true,
//   },

//   end_user_receiving_party_yesno: {
//     type: String,
//     unique: true,
//     required: true,
//     sparse: true,
//   },
//   end_user_receiving_party_details: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   nameof_end_user: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   addressof_end_user:{
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   hs_code:{
//     type: String,
//     required : true,
//     sparse: true,
//   },

//   hs_code_description: {
//     type: String,
//     required: true,
//     sparse: true,
//   },
//   nature_of_biomaterial: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   nature_of_biomaterial_details: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   where_sample_collected:{
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   where_sample_collected_details:{
//     type: String,
//     required : true,
//     sparse: true,
//   },

//   samples_being_exported_yes_no: {
//     type: String,
//     required: true,
//     sparse: true,
//   },
//   samples_being_exported_details: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   qtyof_exported_number: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   volumnof_sample_details:{
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   qtyof_exported_volume:{
//     type: String,
//     required : true,
//     sparse: true,
//   },

//   repeat_samples_envisaged_yesno: {
//     type: String,
//     unique: true,
//     required: true,
//     sparse: true,
//   },
//   repeat_samples_envisaged_details: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   specify_purpose_end_use: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   specify_purpose_end_use_details:{
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   whether_samples_used_research_analysis_yesno:{
//     type: String,
//     required : true,
//     sparse: true,
//   },

//   whether_samples_used_research_analysis: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   whether_samples_used_research_analysis_details: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   upload_purposeof_planned_analysis:{
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   leftover_samples_store_yes_no:{
//     type: String,
//     required : true,
//     sparse: true,
//   },

//   leftover_samples_store_details: {
//     type: String,
//     required: true,
//     sparse: true,
//   },
//   purposeof_sample_storage: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   purposeof_sample_storage_details: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   duration_sample_storage:{
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   facilitywhere_samplestore:{
//     type: String,
//     required : true,
//     sparse: true,
//   },

//   national_security_angle_yes_no: {
//     type: String,
//     unique: true,
//     required: true,
//     sparse: true,
//   },
//   national_security_angle_details: {
//     type: String,
//     required : true,
//     sparse: true,
//   },

//   foreign_country_army_military_yes_no: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   foreign_country_army_military_details:{
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   biomaterial_organisms_approval_yesno:{
//     type: String,
//     required : true,
//     sparse: true,
//   },

//   upload_biomaterial_organisms_approval: {
//     type: String,
//     required: true,
//     sparse: true,
//   },
//   ibsc_rcgm_approval_applicable_yesno: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   upload_ibsc_rcgm_approval_applicable: {
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   upload_certified_copy_proforma:{
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   upload_declaration_letter:{
//     type: String,
//     required : true,
//     sparse: true,
//   },
//   archive_status: { 
//     type: String, 
//     enum: ['0', '1'], 
//     default: '1' 
//   },
//   status: { 
//     type: String, 
//     enum: ['0', '1'], 
//     default: '1' 
//   }
// }, 
// {
//   timestamps: true
// });

// module.exports = mongoose.model('Exporter_Noc_Application', ExporterNocApplicationSchema);

const mongoose = require('mongoose');

const ExporterNocApplicationSchema = new mongoose.Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User",required: true},
  iec_code: {type: String, required: true, sparse: true,},
  name_of_applicant: { type: String, required: true },
  denied_export_auth_last_3_years_yes_no: { type: String, required: true },
  upload_comp_institute_denied_export: { type: String, required: true },
  denied_export_authorization_details: { type: String, required: true },
  upload_comp_instof_sending: { type: String, required: true },
  nameof_recipient: { type: String, required: true },
  designationof_recipient: { type: String, required: true },
  company_instof_recipient: { type: String, required: true },
  upload_comp_instof_recipient: { type: String, required: true },
  end_user_receiving_party_yesno: { type: String, required: true },
  end_user_receiving_party_details: { type: String, required: true },
  nameof_end_user: { type: String, required: true },
  addressof_end_user: { type: String, required: true },
  hs_code: { type: String, required: true },
  hs_code_description: { type: String, required: true },
  nature_of_biomaterial: { type: String, required: true },
  nature_of_biomaterial_details: { type: String, required: true },
  where_sample_collected: { type: String, required: true },
  where_sample_collected_details: { type: String, required: true },
  samples_being_exported_yes_no: { type: String, required: true },
  samples_being_exported_details: { type: String, required: true },
  qtyof_exported_number: { type: String, required: true },
  volumnof_sample_details: { type: String, required: true },
  qtyof_exported_volume: { type: String, required: true },
  repeat_samples_envisaged_yesno: { type: String, required: true },
  repeat_samples_envisaged_details: { type: String, required: true },
  specify_purpose_end_use: { type: String, required: true },
  specify_purpose_end_use_details: { type: String, required: true },
  whether_samples_used_research_analysis_yesno: { type: String, required: true },
  whether_samples_used_research_analysis: { type: String, required: true },
  whether_samples_used_research_analysis_details: { type: String, required: true },
  upload_purposeof_planned_analysis: { type: String, required: true },
  leftover_samples_store_yes_no: { type: String, required: true },
  leftover_samples_store_details: { type: String, required: true },
  purposeof_sample_storage: { type: String, required: true },
  purposeof_sample_storage_details: { type: String, required: true },
  duration_sample_storage: { type: String, required: true },
  facilitywhere_samplestore: { type: String, required: true },
  national_security_angle_yes_no: { type: String, required: true },
  national_security_angle_details: { type: String, required: true },
  foreign_country_army_military_yes_no: { type: String, required: true },
  foreign_country_army_military_details: { type: String, required: true },
  biomaterial_organisms_approval_yesno: { type: String, required: true },
  upload_biomaterial_organisms_approval: { type: String, required: true },
  ibsc_rcgm_approval_applicable_yesno: { type: String, required: true },
  upload_ibsc_rcgm_approval_applicable: { type: String, required: true },
  upload_certified_copy_proforma: { type: String, required: true },
  upload_declaration_letter: { type: String, required: true },

  // Flags
  archive_status: { type: String, enum: ['0', '1'], default: '1' },
  status: { type: String, enum: ['0', '1'], default: '1' }

}, {
  timestamps: true
});

module.exports = mongoose.model('Exporter_Noc_Application', ExporterNocApplicationSchema);
