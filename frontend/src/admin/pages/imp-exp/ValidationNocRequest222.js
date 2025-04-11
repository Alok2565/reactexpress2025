const ValidationNocRequest = (formData) => {
    let errors = {};

    if (!formData.denied_export_auth_last_3_years_yes_no) {
        errors.denied_export_auth_last_3_years_yes_no = "Please select an option";
    }

    if (
        formData.denied_export_auth_last_3_years_yes_no === "Yes" &&
        (!formData.upload_comp_institute_denied_export?.trim())
    ) {
        errors.upload_comp_institute_denied_export = "Please upload relevant document";
    }

    if (
        formData.denied_export_auth_last_3_years_yes_no === "Yes" &&
        (!formData.denied_export_auth_details?.trim())
    ) {
        errors.denied_export_auth_details = "Please provide the details";
    }
    if (!formData.upload_sending_bg_company_add.trim()) {
        errors.upload_sending_bg_company_add = "Please upload relevant document";
    }
    if (!formData.nameof_recipient.trim()) {
        errors.nameof_recipient = "Please fill the required field";
    }
    if (!formData.designationof_recipient.trim()) {
        errors.designationof_recipient = "Please fill the required field";
    }
    if (!formData.company_addressof_recipient.trim()) {
        errors.company_addressof_recipient = "Please fill the required field";
    }
    if (!formData.uploadbg_company_addressof_recipient.trim()) {
        errors.uploadbg_company_addressof_recipient = "Please upload relevant document";
    }
    if (!formData.end_user_receiving_party_yesno.trim()) {
        errors.end_user_receiving_party_yesno = "Please select any option";
    }
    if (!formData.end_user_receiving_party_description.trim()) {
        errors.end_user_receiving_party_description = "Please Provide the details";
    }
    if (!formData.hs_code?.trim()) {
        errors.hs_code = "Please select any option";
    }
    if (!formData.hs_code_description?.trim()) {
        errors.hs_code_description = "Please provide the details";
    }
    if (!formData.nature_of_biomaterial?.trim()) {
        errors.nature_of_biomaterial = "Please select any option";
    }
    if (!formData.nature_of_biomaterial_details?.trim()) {
        errors.nature_of_biomaterial_details = "Please provide the details";
    }

    if (!formData.icertify?.trim()) {
        errors.certifythat = "Verify the Check is required";
    }

    return errors;
};

export default ValidationNocRequest;
