import React from 'react'
import { Tools } from '@/utils';
import { IHandlers } from '@/interfaces';

interface ITable {
    tableHeaders: {
        label: string;
        key: string
    }[];
    tableData: any[];
    handlers?: Pick<IHandlers, "handleRowSelection">
    showActions?: boolean;
}

const { getStatusColor } = Tools
const Table = ({ 
    tableHeaders, 
    tableData,
    handlers, 
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
                                                backgroundColor: getStatusColor(data[header.key])?.bgColor,
                                                color: getStatusColor(data[header.key])?.textColor
                                            }}>
                                            {data[header.key] || 'N/A'}
                                        </div>
                                    </td>
                                ))}
                                
                                    <td className="max-w-[200px] py-5">
                                        <div className="flex items-center justify-center gap-2">
                                            
                                                <button
                                                    onClick={() => handlers?.handleRowSelection(data.id)}
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