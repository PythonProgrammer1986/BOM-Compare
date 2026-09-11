import * as XLSX from 'xlsx';
import { TCBOMRow, M3BOMRow, IIMRow } from '../types';

export interface ColumnSpec {
  name: string;
  required: boolean;
  type: string;
  description: string;
  sample: string;
}

export const TC_COLUMNS: ColumnSpec[] = [
  { name: 'Lvl', required: true, type: 'Text / Number', description: 'BOM hierarchy level (1 for direct children of top assembly, 2+ for sub-assemblies)', sample: '1' },
  { name: 'Part/PA Id Indented', required: true, type: 'Text', description: 'Component or Physical Architecture ID', sample: 'ASY-CHASSIS-01' },
  { name: 'Parent Id', required: true, type: 'Text', description: 'Parent part identifier (use "Root" or top assembly ID for Level 1)', sample: 'Root' },
  { name: 'Qty', required: false, type: 'Number', description: 'Required quantity per parent assembly', sample: '1' },
  { name: 'UOM', required: false, type: 'Text', description: 'Unit of Measure (EA, PCE, M, KG, etc.)', sample: 'EA' },
  { name: 'Release Date', required: false, type: 'Date (YYYY-MM-DD)', description: 'Engineering release or revision date', sample: '2026-09-01' }
];

export const M3_COLUMNS: ColumnSpec[] = [
  { name: 'Rel Lvl', required: true, type: 'Text / Number', description: 'Relative BOM level in M3 ERP (1 for direct children)', sample: '1' },
  { name: 'Part no', required: true, type: 'Text', description: 'M3 component / child item number (matches Part/PA Id)', sample: 'ASY-CHASSIS-01' },
  { name: 'Prod struct', required: true, type: 'Text', description: 'M3 parent product structure item number', sample: 'TOP-MACHINE-00' },
  { name: 'Qty', required: false, type: 'Number', description: 'Planned component quantity per parent', sample: '1' },
  { name: 'UOM', required: false, type: 'Text', description: 'Unit of Measure (EA, PCE, M, etc.)', sample: 'EA' },
  { name: 'From Date', required: false, type: 'Date (YYYY-MM-DD)', description: 'M3 PDS001 validity effective date', sample: '2026-09-01' }
];

export const IIM_COLUMNS: ColumnSpec[] = [
  { name: 'Item number', required: true, type: 'Text', description: 'Unique part or assembly item number', sample: 'PHM-HARNESS-KIT' },
  { name: 'Planning Policy Name', required: true, type: 'Text', description: 'Item policy: "Phantom items", "Purchase", "Make", or "Manufactured"', sample: 'Phantom items' },
  { name: 'Status', required: false, type: 'Text / Number', description: 'ERP item status (e.g., 20=Preliminary, 50=Active, 90=Obsolete)', sample: '50' },
  { name: 'Item Description', required: false, type: 'Text', description: 'Human-readable part name or title', sample: 'Wiring Harness Phantom Kit' },
  { name: 'Change Date', required: false, type: 'Date (YYYY-MM-DD)', description: 'Item master policy modification date', sample: '2026-08-25' }
];

export const SAMPLE_TC_DATA: TCBOMRow[] = [
  { 'Lvl': '1', 'Part/PA Id Indented': 'ASY-CHASSIS-01', 'Parent Id': 'Root', 'Qty': '1', 'UOM': 'EA', 'Release Date': '2026-09-01' },
  { 'Lvl': '1', 'Part/PA Id Indented': 'PHM-HARNESS-KIT', 'Parent Id': 'Root', 'Qty': '1', 'UOM': 'EA', 'Release Date': '2026-09-01' },
  { 'Lvl': '2', 'Part/PA Id Indented': 'WIR-WIRE-RED', 'Parent Id': 'PHM-HARNESS-KIT', 'Qty': '4', 'UOM': 'M', 'Release Date': '2026-09-05' },
  { 'Lvl': '2', 'Part/PA Id Indented': 'CON-PLUG-12PIN', 'Parent Id': 'PHM-HARNESS-KIT', 'Qty': '2', 'UOM': 'EA', 'Release Date': '2026-09-05' },
  { 'Lvl': '1', 'Part/PA Id Indented': 'MTR-DRIVE-UNIT', 'Parent Id': 'Root', 'Qty': '2', 'UOM': 'EA', 'Release Date': '2026-09-10' },
  { 'Lvl': '1', 'Part/PA Id Indented': 'BRK-CALIPER-02', 'Parent Id': 'Root', 'Qty': '4', 'UOM': 'EA', 'Release Date': '2026-09-11' },
  { 'Lvl': '1', 'Part/PA Id Indented': 'SEN-TEMP-PROBE', 'Parent Id': 'Root', 'Qty': '1', 'UOM': 'EA', 'Release Date': '2026-09-11' }
];

export const SAMPLE_M3_DATA: M3BOMRow[] = [
  { 'Rel Lvl': '1', 'Part no': 'ASY-CHASSIS-01', 'Prod struct': 'TOP-MACHINE-00', 'Qty': '1', 'UOM': 'EA', 'From Date': '2026-09-01' },
  { 'Rel Lvl': '1', 'Part no': 'PHM-HARNESS-KIT', 'Prod struct': 'TOP-MACHINE-00', 'Qty': '1', 'UOM': 'EA', 'From Date': '2026-09-01' },
  { 'Rel Lvl': '2', 'Part no': 'WIR-WIRE-RED', 'Prod struct': 'PHM-HARNESS-KIT', 'Qty': '4', 'UOM': 'M', 'From Date': '2026-09-05' },
  { 'Rel Lvl': '2', 'Part no': 'CON-PLUG-12PIN', 'Prod struct': 'PHM-HARNESS-KIT', 'Qty': '2', 'UOM': 'EA', 'From Date': '2026-09-05' },
  { 'Rel Lvl': '1', 'Part no': 'MTR-DRIVE-UNIT', 'Prod struct': 'TOP-MACHINE-00', 'Qty': '1', 'UOM': 'EA', 'From Date': '2026-09-10' },
  { 'Rel Lvl': '1', 'Part no': 'SEN-TEMP-PROBE', 'Prod struct': 'TOP-MACHINE-00', 'Qty': '1', 'UOM': 'EA', 'From Date': '2026-09-11' }
];

export const SAMPLE_IIM_DATA: IIMRow[] = [
  { 'Item number': 'TOP-MACHINE-00', 'Planning Policy Name': 'Manufactured', 'Status': '50', 'Item Description': 'Main Industrial Machine Top Level', 'Change Date': '2026-08-15' },
  { 'Item number': 'ASY-CHASSIS-01', 'Planning Policy Name': 'Make', 'Status': '50', 'Item Description': 'Base Steel Chassis Frame', 'Change Date': '2026-08-20' },
  { 'Item number': 'PHM-HARNESS-KIT', 'Planning Policy Name': 'Phantom items', 'Status': '50', 'Item Description': 'Wiring Harness Phantom Kit', 'Change Date': '2026-08-25' },
  { 'Item number': 'WIR-WIRE-RED', 'Planning Policy Name': 'Purchase', 'Status': '50', 'Item Description': '18 AWG Insulated Copper Wire', 'Change Date': '2026-08-25' },
  { 'Item number': 'CON-PLUG-12PIN', 'Planning Policy Name': 'Purchase', 'Status': '50', 'Item Description': '12-Pin Deutsch Plug Connector', 'Change Date': '2026-08-25' },
  { 'Item number': 'MTR-DRIVE-UNIT', 'Planning Policy Name': 'Purchase', 'Status': '50', 'Item Description': '48V Industrial Drive Motor', 'Change Date': '2026-09-01' },
  { 'Item number': 'BRK-CALIPER-02', 'Planning Policy Name': 'Purchase', 'Status': '50', 'Item Description': 'Hydraulic Brake Caliper Assembly', 'Change Date': '2026-09-02' },
  { 'Item number': 'SEN-TEMP-PROBE', 'Planning Policy Name': 'Purchase', 'Status': '50', 'Item Description': 'Digital Thermal Temperature Probe', 'Change Date': '2026-09-02' }
];

/**
 * Downloads a single sheet Excel file
 */
export const downloadSingleTemplate = (filename: string, sheetName: string, data: any[]) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename);
};

/**
 * Downloads Teamcenter BOM sample template
 */
export const downloadTCTemplate = () => {
  downloadSingleTemplate('Teamcenter_BOM_Template.xlsx', 'TC_BOM', SAMPLE_TC_DATA);
};

/**
 * Downloads M3 ERP Structure sample template
 */
export const downloadM3Template = () => {
  downloadSingleTemplate('M3_ERP_Structure_Template.xlsx', 'M3_Structure', SAMPLE_M3_DATA);
};

/**
 * Downloads IIM Item Master sample template
 */
export const downloadIIMTemplate = () => {
  downloadSingleTemplate('IIM_Item_Master_Template.xlsx', 'IIM_Master', SAMPLE_IIM_DATA);
};

/**
 * Downloads a combined workbook containing all three templates in separate sheets
 */
export const downloadAllTemplatesWorkbook = () => {
  const wb = XLSX.utils.book_new();
  
  const wsTC = XLSX.utils.json_to_sheet(SAMPLE_TC_DATA);
  XLSX.utils.book_append_sheet(wb, wsTC, 'Teamcenter_BOM');

  const wsM3 = XLSX.utils.json_to_sheet(SAMPLE_M3_DATA);
  XLSX.utils.book_append_sheet(wb, wsM3, 'M3_Structure');

  const wsIIM = XLSX.utils.json_to_sheet(SAMPLE_IIM_DATA);
  XLSX.utils.book_append_sheet(wb, wsIIM, 'IIM_Master');

  XLSX.writeFile(wb, 'BOM_Validation_All_Templates.xlsx');
};
