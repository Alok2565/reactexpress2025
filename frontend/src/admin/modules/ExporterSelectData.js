export function HsCodeOptionsDescription() {
    return {
        HsCodeOptions: [
            { value: "30021020", label: "30021020 - Antisera and other blood fractions and immunological products" },
            { value: "30021091", label: "30021091 - Antisera and other blood fractions and immunological products" },
            { value: "30021210", label: "30021210 - For diphtheria" },
            { value: "30021220", label: "30021220 - For tetanus" },
            { value: "30021230", label: "30021230 - For rabies" },
            { value: "30021240", label: "30021240 - For snake venom" },
            { value: "30021290", label: "30021290 - Others" },
            { value: "30029010", label: "30029010 - Human Blood" }
        ],

        HsCodeDescrip: [
            { value: "30021020", description: "Antisera and other blood fractions and immunological products" },
            { value: "30021091", description: "Antisera and other blood fractions and immunological products" },
            { value: "30021210", description: "For diphtheria" },
            { value: "30021220", description: "For tetanus" },
            { value: "30021230", description: "For rabies" },
            { value: "30021240", description: "For snake venom" },
            { value: "30021290", description: "Others" },
            { value: "30029010", description: "Human Blood" }
        ]
    };
}

export function natureOfBiomaterialOptions() {
    return {
        nature_of_biomaterialoptions: [
            { value: "Whole blood", label: "Whole blood" },
            { value: "Buffy coat", label: "Buffy coat" },
            { value: "Serum", label: "Serum" },
            { value: "Plasma", label: "Plasma" },
            { value: "Urine", label: "Urine" },
            { value: "Nucleic acid(Extracted DNA)", label: "Nucleic acid(Extracted DNA)" },
            { value: "Nucleic acid(Extracted RNA)", label: "Nucleic acid(Extracted RNA)" },
            { value: "Any Tissue/Cells", label: "Any Tissue/Cells" },
            { value: "Other body fluids", label: "Other body fluids" },
            { value: "Others", label: "Others" },

        ]
    };
}

export function whereSampleCollectedOption() {
    return {
        where_sample_collectedOption: [
            { value: "Inpatient hospital facility", label: "Inpatient hospital facility" },
            { value: "Outpatient hospital facility", label: "Outpatient hospital facility" },
            { value: "Clinical/ Diagnostic laboratory", label: "Clinical/ Diagnostic laboratory" },
            { value: "Research laboratory", label: "Research laboratory" },
            { value: "Others", label: "Others" },

        ]
    }
}

export function selectSpecifyPurposeOption() {
    return {
        SpecifyPurposeOption: [
            { value: "Calibration/ Quality assurance", label: "Calibration/ Quality assurance" },
            { value: "Clinical Diagnostics/ Testing", label: "Clinical Diagnostics/ Testing" },
            { value: "Others", label: "Others" },

        ]
    };
}

export function funcwhetherSamplesUsedResearchOption() {
    return {
        whetherSamplesUsedResearchOption: [
            { value: "Genomic studies/Gene Variant/SNP analysis", label: "Genomic studies/Gene Variant/SNP analysis" },
            { value: "Transcriptomics Studies", label: "Transcriptomics Studies" },
            { value: "Proteomic Studies", label: "Proteomic Studies" },
            { value: "Metabolomic Studies", label: "Metabolomic Studies" },
            { value: "Others", label: "Others" },

        ]
    };
}

export function funcPurposeofSamplesOption() {
    return {
        PurposeofSamplesOption: [
            { value: "Retesting purposes", label: "Retesting purposes" },
            { value: "Further Analysis", label: "Further Analysis" },

        ]
    };
}
export function quantityofSampleExportedOptions() {
    return {
        quantityofSampleExported: [
            { value: "ML", label: "ML" },
            { value: "L", label: "L" },
            { value: "μL", label: "μL" },

        ]
    };
}