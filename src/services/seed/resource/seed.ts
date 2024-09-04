import { LabToolsType } from 'src/commons/@types/lab-tools';
export class Seed {
    public static labsData(): Array<string> {
        return [
            'Lab Data Science',
            'Lab Multimedia',
            'Lab Komputasi Dasar',
            'Lab Mikrokontroler',
            'Lab Fisika',
            'Lab Kimia',
            'Lab Biologi',
            'Lab Jaringan Komputer',
        ];
    }

    public static studyProgramsData(): Array<string> {
        return [
            'S1 Biologi',
            'S1 Farmasi',
            'S1 Fisika',
            'S1 Kimia',
            'S1 Matematika',
            'S1 Ilmu Lingkungan',
            'S1 Informatika',
            'S1 Statistika',
        ];
    }

    public static labToolsData(): Array<LabToolsType> {
        return [
            { name: 'Multimeter', lab_name: 'Lab Fisika' },
            { name: 'Oscilloscope', lab_name: 'Lab Biologi' },
            { name: 'Function Generator', lab_name: 'Lab Data Science' },
            { name: 'Digital Multimeter', lab_name: 'Lab Fisika' },
            { name: 'Soldering Iron', lab_name: 'Lab Fisika' },
            { name: 'Power Supply', lab_name: 'Lab Fisika' },
            { name: 'Signal Generator', lab_name: 'Lab Fisika' },
            { name: 'Logic Analyzer', lab_name: 'Lab Fisika' },
            { name: 'Spectrometer', lab_name: 'Lab Fisika' },
            { name: 'Microscope', lab_name: 'Lab Kimia' },
            { name: 'Centrifuge', lab_name: 'Lab Data Science' },
            { name: 'Incubator', lab_name: 'Lab Biologi' },
            { name: 'PCR Machine', lab_name: 'Lab Biologi' },
            { name: 'Gel Electrophoresis', lab_name: 'Lab Biologi' },
            { name: 'Spectrophotometer', lab_name: 'Lab Fisika' },
            { name: 'Thermocycler', lab_name: 'Lab Data Science' },
            { name: 'Microplate Reader', lab_name: 'Lab Kimia' },
            { name: 'Microarray Scanner', lab_name: 'Lab Kimia' },
            { name: 'Flow Cytometer', lab_name: 'Lab Fisika' },
            { name: 'Mass Spectrometer', lab_name: 'Lab Fisika' },
            { name: 'NMR Spectrometer', lab_name: 'Lab Fisika' },
            { name: 'Chromatography', lab_name: 'Lab Fisika' },
            { name: 'Electrophoresis', lab_name: 'Lab Fisika' },
            { name: 'Microscopy', lab_name: 'Lab Biologi' },
            { name: 'Spectroscopy', lab_name: 'Lab Biologi' },
            { name: 'Titration', lab_name: 'Lab Biologi' },
            { name: 'Pipette', lab_name: 'Lab Kimia' },
            { name: 'Pipette', lab_name: 'Lab Biologi' },
            { name: 'Bunsen Burner', lab_name: 'Lab Kimia' },
            { name: 'Bunsen Burner', lab_name: 'Lab Biologi' },
            { name: 'Bunsen Burner', lab_name: 'Lab Fisika' },
        ];
    }
}
