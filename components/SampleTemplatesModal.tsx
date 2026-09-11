import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Database, 
  Activity, 
  Settings2, 
  Sparkles, 
  Check, 
  FileSpreadsheet,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { 
  TC_COLUMNS, 
  M3_COLUMNS, 
  IIM_COLUMNS, 
  SAMPLE_TC_DATA, 
  SAMPLE_M3_DATA, 
  SAMPLE_IIM_DATA,
  downloadTCTemplate,
  downloadM3Template,
  downloadIIMTemplate,
  downloadAllTemplatesWorkbook
} from '../services/sampleTemplates';

interface SampleTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadDemoData: () => void;
}

export const SampleTemplatesModal: React.FC<SampleTemplatesModalProps> = ({
  isOpen,
  onClose,
  onLoadDemoData
}) => {
  const [activeTab, setActiveTab] = useState<'TC' | 'M3' | 'IIM' | 'ALL'>('TC');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyColumns = (columns: { name: string }[], label: string) => {
    const text = columns.map(c => c.name).join('\t');
    navigator.clipboard.writeText(text);
    setCopiedNotification(label);
    setTimeout(() => setCopiedNotification(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between bg-slate-50/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                <FileSpreadsheet size={20} />
              </span>
              <h2 className="text-xl font-bold text-slate-900">Excel Templates & Formats</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                Ready to Download (.xlsx)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Download pre-configured Excel workbooks with the exact column headers and realistic sample data for validation.
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/60 transition-colors"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Action Highlights Banner */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
            <Info size={16} className="text-blue-600 shrink-0" />
            <span>Need to test right now? Load sample data directly into the auditor with one click.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onLoadDemoData();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <Sparkles size={14} />
              Load Demo Data Now
            </button>
            <button
              onClick={downloadAllTemplatesWorkbook}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <Download size={14} />
              Download All (Combined .xlsx)
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-4 border-b border-slate-200 bg-white flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('TC')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'TC'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Database size={16} className="text-blue-500" />
            1. Teamcenter (TC) BOM
          </button>
          <button
            onClick={() => setActiveTab('M3')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'M3'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Activity size={16} className="text-indigo-500" />
            2. M3 ERP Structure
          </button>
          <button
            onClick={() => setActiveTab('IIM')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'IIM'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Settings2 size={16} className="text-emerald-500" />
            3. IIM Item Master
          </button>
          <button
            onClick={() => setActiveTab('ALL')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'ALL'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers size={16} />
            Combined Package Overview
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {activeTab === 'TC' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-blue-50/70 p-4 rounded-2xl border border-blue-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Teamcenter BOM Export File</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Sheet 1 export from Teamcenter containing the multi-level engineering bill of materials.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyColumns(TC_COLUMNS, 'TC')}
                    className="px-3 py-2 bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold transition-all"
                  >
                    {copiedNotification === 'TC' ? 'Copied Headers!' : 'Copy Headers'}
                  </button>
                  <button
                    onClick={downloadTCTemplate}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
                  >
                    <Download size={15} />
                    Download Teamcenter Template (.xlsx)
                  </button>
                </div>
              </div>

              {/* Column specifications */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Column Headers Specification</h4>
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4 font-bold">Column Header (Exact)</th>
                        <th className="py-3 px-3 font-bold">Requirement</th>
                        <th className="py-3 px-3 font-bold">Format Type</th>
                        <th className="py-3 px-4 font-bold">Description</th>
                        <th className="py-3 px-4 font-bold">Example Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-normal">
                      {TC_COLUMNS.map((col) => (
                        <tr key={col.name} className="hover:bg-slate-50/80">
                          <td className="py-2.5 px-4 font-mono font-bold text-slate-900 bg-slate-50/50">{col.name}</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              col.required ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {col.required ? 'Required' : 'Optional'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">{col.type}</td>
                          <td className="py-2.5 px-4 text-slate-600">{col.description}</td>
                          <td className="py-2.5 px-4 font-mono text-slate-800 font-medium">{col.sample}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sample Data Table Preview */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pre-loaded Sample Data in Template</h4>
                  <span className="text-xs text-slate-400 font-medium">{SAMPLE_TC_DATA.length} sample rows included</span>
                </div>
                <div className="border border-slate-200 rounded-2xl overflow-x-auto shadow-sm max-h-56 custom-scrollbar">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 sticky top-0">
                      <tr>
                        <th className="py-2.5 px-3 font-semibold">Lvl</th>
                        <th className="py-2.5 px-3 font-semibold">Part/PA Id Indented</th>
                        <th className="py-2.5 px-3 font-semibold">Parent Id</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Qty</th>
                        <th className="py-2.5 px-3 font-semibold">UOM</th>
                        <th className="py-2.5 px-3 font-semibold">Release Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {SAMPLE_TC_DATA.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-bold text-blue-600">{row.Lvl}</td>
                          <td className="py-2 px-3 font-semibold text-slate-900">{row['Part/PA Id Indented']}</td>
                          <td className="py-2 px-3 text-slate-500">{row['Parent Id']}</td>
                          <td className="py-2 px-3 text-right text-slate-800">{row.Qty}</td>
                          <td className="py-2 px-3 text-slate-600">{row.UOM}</td>
                          <td className="py-2 px-3 text-slate-500">{row['Release Date']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'M3' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">M3 ERP Product Structure File</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Export from Infor M3 transaction PDS001 (Product Structure) with component relationships.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyColumns(M3_COLUMNS, 'M3')}
                    className="px-3 py-2 bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold transition-all"
                  >
                    {copiedNotification === 'M3' ? 'Copied Headers!' : 'Copy Headers'}
                  </button>
                  <button
                    onClick={downloadM3Template}
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
                  >
                    <Download size={15} />
                    Download M3 Template (.xlsx)
                  </button>
                </div>
              </div>

              {/* Column specifications */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Column Headers Specification</h4>
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4 font-bold">Column Header (Exact)</th>
                        <th className="py-3 px-3 font-bold">Requirement</th>
                        <th className="py-3 px-3 font-bold">Format Type</th>
                        <th className="py-3 px-4 font-bold">Description</th>
                        <th className="py-3 px-4 font-bold">Example Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-normal">
                      {M3_COLUMNS.map((col) => (
                        <tr key={col.name} className="hover:bg-slate-50/80">
                          <td className="py-2.5 px-4 font-mono font-bold text-slate-900 bg-slate-50/50">{col.name}</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              col.required ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {col.required ? 'Required' : 'Optional'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">{col.type}</td>
                          <td className="py-2.5 px-4 text-slate-600">{col.description}</td>
                          <td className="py-2.5 px-4 font-mono text-slate-800 font-medium">{col.sample}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sample Data Table Preview */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pre-loaded Sample Data in Template</h4>
                  <span className="text-xs text-slate-400 font-medium">{SAMPLE_M3_DATA.length} sample rows included</span>
                </div>
                <div className="border border-slate-200 rounded-2xl overflow-x-auto shadow-sm max-h-56 custom-scrollbar">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 sticky top-0">
                      <tr>
                        <th className="py-2.5 px-3 font-semibold">Rel Lvl</th>
                        <th className="py-2.5 px-3 font-semibold">Part no</th>
                        <th className="py-2.5 px-3 font-semibold">Prod struct</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Qty</th>
                        <th className="py-2.5 px-3 font-semibold">UOM</th>
                        <th className="py-2.5 px-3 font-semibold">From Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {SAMPLE_M3_DATA.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-bold text-indigo-600">{row['Rel Lvl']}</td>
                          <td className="py-2 px-3 font-semibold text-slate-900">{row['Part no']}</td>
                          <td className="py-2 px-3 text-slate-500">{row['Prod struct']}</td>
                          <td className="py-2 px-3 text-right text-slate-800">{row.Qty}</td>
                          <td className="py-2 px-3 text-slate-600">{row.UOM}</td>
                          <td className="py-2 px-3 text-slate-500">{row['From Date']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'IIM' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">IIM Item Master File</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Export from Infor M3 MMS001 (Item Master) defining planning policy types and explosion rules.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyColumns(IIM_COLUMNS, 'IIM')}
                    className="px-3 py-2 bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold transition-all"
                  >
                    {copiedNotification === 'IIM' ? 'Copied Headers!' : 'Copy Headers'}
                  </button>
                  <button
                    onClick={downloadIIMTemplate}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
                  >
                    <Download size={15} />
                    Download IIM Template (.xlsx)
                  </button>
                </div>
              </div>

              {/* Column specifications */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Column Headers Specification</h4>
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4 font-bold">Column Header (Exact)</th>
                        <th className="py-3 px-3 font-bold">Requirement</th>
                        <th className="py-3 px-3 font-bold">Format Type</th>
                        <th className="py-3 px-4 font-bold">Description</th>
                        <th className="py-3 px-4 font-bold">Example Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-normal">
                      {IIM_COLUMNS.map((col) => (
                        <tr key={col.name} className="hover:bg-slate-50/80">
                          <td className="py-2.5 px-4 font-mono font-bold text-slate-900 bg-slate-50/50">{col.name}</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              col.required ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {col.required ? 'Required' : 'Optional'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">{col.type}</td>
                          <td className="py-2.5 px-4 text-slate-600">{col.description}</td>
                          <td className="py-2.5 px-4 font-mono text-slate-800 font-medium">{col.sample}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sample Data Table Preview */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pre-loaded Sample Data in Template</h4>
                  <span className="text-xs text-slate-400 font-medium">{SAMPLE_IIM_DATA.length} sample rows included</span>
                </div>
                <div className="border border-slate-200 rounded-2xl overflow-x-auto shadow-sm max-h-56 custom-scrollbar">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 sticky top-0">
                      <tr>
                        <th className="py-2.5 px-3 font-semibold">Item number</th>
                        <th className="py-2.5 px-3 font-semibold">Planning Policy Name</th>
                        <th className="py-2.5 px-3 font-semibold text-center">Status</th>
                        <th className="py-2.5 px-3 font-semibold">Item Description</th>
                        <th className="py-2.5 px-3 font-semibold">Change Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {SAMPLE_IIM_DATA.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-bold text-slate-900">{row['Item number']}</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              row['Planning Policy Name'] === 'Phantom items'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {row['Planning Policy Name']}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-center text-slate-600">{row.Status}</td>
                          <td className="py-2 px-3 font-sans text-slate-700">{row['Item Description']}</td>
                          <td className="py-2 px-3 text-slate-500">{row['Change Date']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ALL' && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Layers className="text-blue-400" />
                    <h3 className="text-lg font-bold">Combined All-in-One Workbook</h3>
                  </div>
                  <p className="text-xs text-slate-300">
                    A single Excel file (<code className="text-blue-300">BOM_Validation_All_Templates.xlsx</code>) containing 3 distinct worksheets:
                    <span className="font-semibold text-white"> Teamcenter_BOM</span>, 
                    <span className="font-semibold text-white"> M3_Structure</span>, and 
                    <span className="font-semibold text-white"> IIM_Master</span>.
                  </p>
                </div>
                <button
                  onClick={downloadAllTemplatesWorkbook}
                  className="px-5 py-3 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs rounded-xl shadow transition-all active:scale-95 flex items-center gap-2 shrink-0 justify-center"
                >
                  <Download size={16} /> Download Combined Workbook
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Database size={16} className="text-blue-500" /> TC BOM
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">Sheet 1</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Expected columns: <code className="font-bold">Lvl</code>, <code className="font-bold">Part/PA Id Indented</code>, <code className="font-bold">Parent Id</code>, Qty, UOM, Release Date.
                  </p>
                  <button
                    onClick={downloadTCTemplate}
                    className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <Download size={13} /> Teamcenter (.xlsx)
                  </button>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Activity size={16} className="text-indigo-500" /> M3 ERP
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">Sheet 2</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Expected columns: <code className="font-bold">Rel Lvl</code>, <code className="font-bold">Part no</code>, <code className="font-bold">Prod struct</code>, Qty, UOM, From Date.
                  </p>
                  <button
                    onClick={downloadM3Template}
                    className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <Download size={13} /> M3 Structure (.xlsx)
                  </button>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Settings2 size={16} className="text-emerald-500" /> IIM Master
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">Sheet 3</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Expected columns: <code className="font-bold">Item number</code>, <code className="font-bold">Planning Policy Name</code>, Status, Item Description, Change Date.
                  </p>
                  <button
                    onClick={downloadIIMTemplate}
                    className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <Download size={13} /> IIM Master (.xlsx)
                  </button>
                </div>
              </div>

              <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <Info size={15} /> Upload Tip:
                </div>
                <p>
                  When uploading individual files in the main auditor screen, upload the respective individual workbook (<code className="font-mono">Teamcenter_BOM_Template.xlsx</code>, etc.) or ensure the first sheet in your file has the correct table headers.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onLoadDemoData();
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <Sparkles size={14} />
              Load Demo Data Directly into Auditor
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
