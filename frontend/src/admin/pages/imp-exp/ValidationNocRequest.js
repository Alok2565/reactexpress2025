const ValidationNocRequest = (formData) =>{
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
    if(!formData.upload_comp_instof_sending.trim()){
        errors.upload_comp_instof_sending = "Please upload relevant document";
    }
    if(!formData.nameof_recipient.trim()){
        errors.nameof_recipient = "Please fill the required field";
    }
    if(!formData.designationof_recipient.trim()){
        errors.designationof_recipient = "Please fill the required field";
    }
    if(!formData.company_instof_recipient.trim()){
        errors.company_instof_recipient = "Please fill the required field";
    }
    if(!formData.upload_comp_instof_recipient.trim()){
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
    if(!formData.where_sample_collected.trim()){
        errors.where_sample_collected = "Please select any option";
    }
    if (formData.where_sample_collected === "Others" &&
        (!formData.where_sample_collected_desc || !formData.where_sample_collected_desc.trim())
    ) {
        errors.where_sample_collected_desc = "Please provide the details";
    }
    
    if(!formData.hs_code_description.trim()){
        errors.hs_code_description = "Please provide the details";
    }
    if(!formData.nature_of_biomaterial.trim()){
        errors.nature_of_biomaterial = "Please select any option";
    }
    if(!formData.nature_of_biomaterial_details.trim()){
        errors.nature_of_biomaterial_details = "Please provide the details";
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