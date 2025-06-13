import { useState, useEffect } from "react";
import axios from 'axios';

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

export function useNatureOfBiomaterialOptions() {
    const [nature_of_biomaterialoptions, setNature_of_biomaterialoptions] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/natutalof_biomaterials")
            .then((res) => {
                console.log("API response:", res.data);

                const filtered = res.data
                    .filter((item) => Number(item.status) === 1)
                    .map((item) => ({
                        id: item._id || item.id,
                        value: item.name || item.value,
                        label: item.name || item.value,
                    }))
                    .sort((a, b) => a.id.localeCompare(b.id));

                setNature_of_biomaterialoptions(filtered);
            })
            .catch((err) => {
                console.error("Failed to fetch biomaterial options", err);
            });
    }, []);

    return { nature_of_biomaterialoptions };
}

// export function useWhereSampleCollectedOption() {
//     return {
//         whereSampleCollectedOption: [
//             { value: "Inpatient hospital facility", label: "Inpatient hospital facility" },
//             { value: "Outpatient hospital facility", label: "Outpatient hospital facility" },
//             { value: "Clinical/ Diagnostic laboratory", label: "Clinical/ Diagnostic laboratory" },
//             { value: "Research laboratory", label: "Research laboratory" },
//             { value: "Others", label: "Others" },

//         ]
//     }
// }

export function useWhereSampleCollectedOption() {
    const [whereSampleCollectedOption, setWhereSampleCollected] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/samples_collected")
            .then((res) => {
                console.log("API response:", res.data);

                const filtered = res.data
                    .filter((item) => Number(item.status) === 1)
                    .map((item) => ({
                        id: item._id || item.id,
                        value: item.name || item.value,
                        label: item.name || item.value,
                    }))
                    .sort((a, b) => a.id.localeCompare(b.id));

                setWhereSampleCollected(filtered);
            })
            .catch((err) => {
                console.error("Failed to fetch where sample collected options", err);
            });
    }, []);

    return { whereSampleCollectedOption };
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
// export function quantityofSampleExportedOptions() {
//     return {
//         quantityofSampleExported: [
//             { value: "ML", label: "ML" },
//             { value: "L", label: "L" },
//             { value: "μL", label: "μL" },

//         ]
//     };

// }
export function useQuantityOfSampleExportedOptions() {
    const [quantityofSampleExported, setQuantityOfSampleExported] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/quantityof_samples")
            .then((res) => {
                console.log("API response:", res.data);

                const filtered = res.data
                    .filter((item) => Number(item.status) === 1)
                    .map((item) => ({
                        id: item._id || item.id,
                        value: item.name || item.value,
                        label: item.name || item.value,
                    }))
                    .sort((a, b) => a.id.localeCompare(b.id));

                setQuantityOfSampleExported(filtered);
            })
            .catch((err) => {
                console.error("Failed to fetch quantity of sample exported options", err);
            });
    }, []);

    return { quantityofSampleExported };
}
