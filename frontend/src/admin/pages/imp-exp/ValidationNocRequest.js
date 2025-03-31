const ValidationNocRequest = (formData) =>{
    let errors = {};

    // Validate radio button selection
    if (!formData.denied_export_auth_last_3_years_yes_no) {
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
    
    if (!formData.hs_code.trim()) {
        errors.hs_code = "Please select any option";
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