import React from 'react'
import { Tools } from '@/utils';

interface ITable {
    tableHeaders: {
        label: string;
        key: string
    }[];
    tableData: any[];
    onView?: (data: any) => void;
    onEdit?: (data: any) => void;
    onDelete?: (data: any) => void;
    showActions?: boolean;
}

const colors = [
    {
        status: 'unassigned',
        text: '#1e293b',
        background: '#f1f5f9'
    },
    {
        status: 'in-progress',
        text: '#b45309',
        background: '#fef3c7'
    },
    {
        status: 'resolved',
        text: '#15803d',
        background: '#dcfce7'
    },
    {
        status: 'closed',
        text: '#b91c1c',
        background: '#fee2e2'
    }
]

const Table = ({ 
    tableHeaders, 
    tableData, 
    showActions = true 
}: ITable) => {
    return (
        <div>
            <table className="w-full border text-center">
                <thead>
                    <tr className="border border-zinc-300">
                        {tableHeaders.map(header => (
                            <th 
                                key={header.key}
                                className="sticky top-0 font-semibold text-xs py-4 bg-[#f8fafc] text-[#64748b]">
                                {header.label}
                            </th>
                        ))}
                        {showActions && (
                            <th className="sticky top-0 font-semibold text-xs py-4 bg-[#f8fafc] text-[#64748b]">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((data: any, i: number) => {
                        return (
                            <tr 
                                key={`row-${i}`}
                                className="border-b border-zinc-300 text-sm text-gray-900"
                            >
                                {tableHeaders.map(header => (
                                    <td 
                                        key={`${i}-${header.key}`}
                                        className={'py-5'}
                                    >
                                        <div 
                                            className='w-max mx-auto py-1.5 px-3 rounded-full'
                                            style={{ 
                                                backgroundColor: colors.find(color => color.status === data[header.key])?.background,
                                                color: colors.find(color => color.status === data[header.key])?.text
                                            }}>
                                            {data[header.key] || 'N/A'}
                                        </div>
                                    </td>
                                ))}
                                
                                    <td className="max-w-[200px] py-5">
                                        <div className="flex items-center justify-center gap-2">
                                            
                                                <button
                                                    // onClick={() => onView(data)}
                                                    className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                                                >
                                                    View
                                                </button>
                                        </div>
                                    </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table