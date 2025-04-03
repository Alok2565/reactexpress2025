const ValidationNocRequest = (formData) => {
    let errors = {};

    // Validate radio button selection
    if (!formData.denied_export_auth_last_3_years_yes_no || !formData.denied_export_auth_last_3_years_yes_no) {
        errors.denied_export_auth_last_3_years_yes_no = "Please select an option";
    }

    // Validate file upload only if "Yes" is selected
    if (
        formData.denied_export_auth_last_3_years_yes_no === "Yes" &&
        (!formData.upload_comp_institute_denied_export || !formData.upload_comp_institute_denied_export.trim())
    ) {
        errors.upload_comp_institute_denied_export = "Please upload relevant document";
    }

    // Validate details field only if "Yes" is selected
    if (
        formData.denied_export_auth_last_3_years_yes_no === "Yes" &&
        (!formData.denied_export_auth_details || !formData.denied_export_auth_details.trim())
    ) {
        errors.denied_export_auth_details = "Please provide the details";
    }
    if (!formData.upload_comp_instof_sending.trim()) {
        errors.upload_comp_instof_sending = "Please upload relevant document";
    }
    if (!formData.nameof_recipient.trim()) {
        errors.nameof_recipient = "Please fill the required field";
    }
    if (!formData.designationof_recipient.trim()) {
        errors.designationof_recipient = "Please fill the required field";
    }
    if (!formData.company_instof_recipient.trim()) {
        errors.company_instof_recipient = "Please fill the required field";
    }
    if (!formData.upload_comp_instof_recipient.trim()) {
        errors.upload_comp_instof_recipient = "Please upload relevant document";
    }

    if (!formData.end_user_receiving_party_yesno || !formData.end_user_receiving_party_yesno.trim()) {
        errors.end_user_receiving_party_yesno = "Please select an option";
    }
    if (
        formData.end_user_receiving_party_yesno === "Yes" &&
        (!formData.end_user_receiving_party_desc || !formData.end_user_receiving_party_desc.trim())
    ) {
        errors.end_user_receiving_party_desc = "Please provide the details";
    }
    if (
        formData.end_user_receiving_party_yesno === "Yes" &&
        (!formData.nameof_end_user || !formData.nameof_end_user.trim())
    ) {
        errors.nameof_end_user = "Please fill the required field";
    }
    if (formData.end_user_receiving_party_yesno === "Yes" &&
        (!formData.addressof_end_user || !formData.addressof_end_user.trim())
    ) {
        errors.addressof_end_user = "Please fill the required field";
    }

    if (!formData.hs_code.trim()) {
        errors.hs_code = "Please select any option";
    }
    if (!formData.where_sample_collected.trim()) {
        errors.where_sample_collected = "Please select any option";
    }
    if (formData.where_sample_collected === "Others" &&
        (!formData.where_sample_collected_desc || !formData.where_sample_collected_desc.trim())
    ) {
        errors.where_sample_collected_desc = "Please provide the details";
    }

    if (!formData.hs_code_description.trim()) {
        errors.hs_code_description = "Please provide the details";
    }
    if (!formData.nature_of_biomaterial.trim()) {
        errors.nature_of_biomaterial = "Please select any option";
    }
    if (!formData.nature_of_biomaterial_details.trim()) {
        errors.nature_of_biomaterial_details = "Please provide the details";
    }
    if (!formData.samples_being_exported_yes_no || !formData.samples_being_exported_yes_no.trim()) {
        errors.samples_being_exported_yes_no = "Please select an option";
    }

    if (formData.samples_being_exported_yes_no === "Yes" &&
        (!formData.samples_being_exported_desc || !formData.samples_being_exported_desc.trim())
    ) {
        errors.samples_being_exported_desc = "Please provide the details";
    }

    if (!formData.qtyof_exported_number || !formData.qtyof_exported_number.trim()) {
        errors.qtyof_exported_number = "Please fill the required field";
    }
    if (!formData.volumnof_sample_desc || !formData.volumnof_sample_desc.trim()) {
        errors.volumnof_sample_desc = "Please fill the required field";
    }
    if (!formData.qtyof_exported_volume || !formData.qtyof_exported_volume.trim()) {
        errors.qtyof_exported_volume = "Please select an option";
    }

    if (!formData.repeat_samples_envisaged_yesno || !formData.repeat_samples_envisaged_yesno) {
        errors.repeat_samples_envisaged_yesno = "Please select an option";
    }

    if (formData.repeat_samples_envisaged_yesno === "Yes" &&
        (!formData.repeat_samples_envisaged_desc || !formData.repeat_samples_envisaged_desc.trim())
    ) {
        errors.repeat_samples_envisaged_desc = "Please provide the details";
    }

    if (!formData.specify_purpose_end_use || !formData.specify_purpose_end_use.trim()) {
        errors.specify_purpose_end_use = "Please select an option";
    }

    if (formData.specify_purpose_end_use === "Others" &&
        (!formData.specify_purpose_end_use_desc || !formData.specify_purpose_end_use_desc.trim())
    ) {
        errors.specify_purpose_end_use_desc = "Please provide the details";
    }


    if (!formData.whether_samples_used_research_analysis_yesno || !formData.whether_samples_used_research_analysis_yesno.trim()) {
        errors.whether_samples_used_research_analysis_yesno = "Please select an option";
    }


    if (formData.whether_samples_used_research_analysis_yesno === "Yes" &&
        (!formData.whether_samples_used_research_analysis || !formData.whether_samples_used_research_analysis.trim())
    ) {
        errors.whether_samples_used_research_analysis = "Please select an option";
    }

    if (formData.whether_samples_used_research_analysis === "Others" &&
        (!formData.whether_samples_used_research_analysis_desc || !formData.whether_samples_used_research_analysis_desc.trim())
    ) {
        errors.whether_samples_used_research_analysis_desc = "Please provide details";
    }
    if (!formData.upload_purposeof_planned_analysis.trim()) {
        errors.upload_purposeof_planned_analysis = "Please upload relevant document";
    }

    if (!formData.leftover_samples_store_yes_no || !formData.leftover_samples_store_yes_no.trim()) {
        errors.leftover_samples_store_yes_no = "Please select an option";
    }

    if (formData.leftover_samples_store_yes_no === "Yes" &&
        (!formData.leftover_samples_store_desc || !formData.leftover_samples_store_desc.trim())
    ) {
        errors.leftover_samples_store_desc = "Please provide details";
    }
    if (!formData.purposeof_sample_store || !formData.purposeof_sample_store.trim()) {
        errors.purposeof_sample_store = "Please select an option";
    }

    if (formData.purposeof_sample_store === "Further Analysis" &&
        (!formData.purposeof_sample_store_desc || !formData.purposeof_sample_store_desc.trim())
    ) {
        errors.purposeof_sample_store_desc = "Please provide details";
    }
    if (!formData.duration_sample_store || !formData.duration_sample_store.trim()) {
        errors.duration_sample_store = "Please fill the required field";
    }
    if (!formData.facilitywhere_samplestore || !formData.facilitywhere_samplestore.trim()) {
        errors.facilitywhere_samplestore = "Please fill the required field";
    }

    if (!formData.national_security_angle_yes_no || !formData.national_security_angle_yes_no.trim()) {
        errors.national_security_angle_yes_no = "Please provide details";
    }
    if (formData.national_security_angle_yes_no === "Yes" &&
        (!formData.national_security_angle_desc || !formData.national_security_angle_desc.trim())
    ) {
        errors.national_security_angle_desc = "Please provide details";
    }

    if (!formData.foreign_country_army_military_yes_no || !formData.foreign_country_army_military_yes_no.trim()) {
        errors.foreign_country_army_military_yes_no = "Please select an option";
    }
    if (formData.foreign_country_army_military_yes_no === "Yes" &&
        (!formData.foreign_country_army_military_desc || !formData.foreign_country_army_military_desc.trim())
    ) {
        errors.foreign_country_army_military_desc = "Please provide details";
    }

    if (!formData.biomaterial_approval_yesno || !formData.biomaterial_approval_yesno.trim()) {
        errors.biomaterial_approval_yesno = "Please select an option";
    }

    if (formData.biomaterial_approval_yesno === "Yes" &&
        (!formData.upload_biomaterial_organisms_approval || !formData.upload_biomaterial_organisms_approval.trim())
    ) {
        errors.upload_biomaterial_organisms_approval = "Please upload relevant document";
    }

    if (!formData.ibsc_rcgm_approval_applicable_yesno || !formData.ibsc_rcgm_approval_applicable_yesno.trim()) {
        errors.ibsc_rcgm_approval_applicable_yesno = "Please select an option";
    }

    if (formData.ibsc_rcgm_approval_applicable_yesno === "Yes" &&
        (!formData.ibsc_rcgm_approval_applicable_desc || !formData.ibsc_rcgm_approval_applicable_desc.trim())
    ) {
        errors.ibsc_rcgm_approval_applicable_desc = "Please upload relevant document";
    }






    // if (!formData.password.trim()) {
    //     errors.password = "Password is required";
    // } else if (formData.password.length < 6) {
    //     errors.password = "Password must be at least 6 characters";
    // }

    if (!formData.icertify?.trim()) {
        errors.certifythat = "Verify the Check is required";
    }

    return errors;
}
export default ValidationNocRequest;