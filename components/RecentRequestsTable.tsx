import React, { useState } from 'react';
import { Request } from '../types';

interface RecentRequestsTableProps {
  requests: Request[];
}

const ITEMS_PER_PAGE = 5;

const RecentRequestsTable: React.FC<RecentRequestsTableProps> = ({ requests }) => {
  const [specialtyFilter, setSpecialtyFilter] = useState('Filter by Specialty');
  const [statusFilter, setStatusFilter] = useState('Filter by Status');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Logic
  const filteredRequests = requests.filter(req => {
    const matchesSpecialty = specialtyFilter === 'Filter by Specialty' || req.specialty === specialtyFilter;
    const matchesStatus = statusFilter === 'Filter by Status' || req.status === statusFilter;
    return matchesSpecialty && matchesStatus;
  });

  const uniqueSpecialties = Array.from(new Set(requests.map(r => r.specialty)));

  // Pagination Logic
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRows = filteredRequests.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [specialtyFilter, statusFilter]);

  const StatusBadge = ({ status }: { status: 'Approved' | 'Pending' }) => (
    <span 
      className={`inline-flex items-center justify-center rounded-full h-7 px-3 text-xs font-medium ${
        status === 'Approved' 
          ? 'bg-status-approved-bg text-status-approved-text' 
          : 'bg-status-pending-bg text-status-pending-text'
      }`}
    >
      {status}
    </span>
  );

  const ActionButton = () => (
    <button className="text-text-light hover:text-text-dark hover:bg-neutral-medium-gray/50 rounded-full p-2 transition-colors flex items-center justify-center">
      <span className="material-symbols-outlined text-xl">more_vert</span>
    </button>
  );

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <h3 className="text-xl font-semibold text-text-dark">Recent Medical Requests</h3>
        <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-2">
          <select 
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="rounded-lg border-neutral-medium-gray text-text-dark text-sm bg-card-bg px-4 py-2 outline-none focus:ring-1 focus:ring-primary cursor-pointer w-full sm:w-auto"
          >
            <option>Filter by Specialty</option>
            {uniqueSpecialties.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border-neutral-medium-gray text-text-dark text-sm bg-card-bg px-4 py-2 outline-none focus:ring-1 focus:ring-primary cursor-pointer w-full sm:w-auto"
          >
            <option>Filter by Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
          </select>
        </div>
      </div>
      
      <div className="rounded-xl border border-neutral-medium-gray bg-card-bg overflow-hidden shadow-sm">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-neutral-light-gray border-b border-neutral-medium-gray">
                <th className="px-6 py-4 text-left text-text-dark text-sm font-semibold leading-normal">Employee Name</th>
                <th className="px-6 py-4 text-left text-text-dark text-sm font-semibold leading-normal">Specialty</th>
                <th className="px-6 py-4 text-left text-text-dark text-sm font-semibold leading-normal">Date</th>
                <th className="px-6 py-4 text-left text-text-dark text-sm font-semibold leading-normal">Status</th>
                <th className="px-6 py-4 text-right text-text-dark text-sm font-semibold leading-normal w-16"></th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((req) => (
                <tr 
                  key={req.id} 
                  className="border-b last:border-b-0 border-neutral-medium-gray hover:bg-neutral-light-gray transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-text-dark text-sm font-normal leading-normal">{req.employeeName}</td>
                  <td className="px-6 py-4 text-text-light text-sm font-normal leading-normal">{req.specialty}</td>
                  <td className="px-6 py-4 text-text-light text-sm font-normal leading-normal">{req.date}</td>
                  <td className="px-6 py-4 text-sm font-normal leading-normal">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ActionButton />
                  </td>
                </tr>
              ))}
              {currentRows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-text-light text-sm">
                    No requests found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List View */}
        <div className="md:hidden">
          {currentRows.map((req) => (
            <div key={req.id} className="p-4 border-b border-neutral-medium-gray last:border-b-0 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-text-dark font-bold text-base leading-tight">{req.employeeName}</h4>
                  <p className="text-text-light text-xs mt-1">{req.date}</p>
                </div>
                <div className="-mr-2 -mt-2">
                  <ActionButton />
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <div className="flex flex-col">
                  <span className="text-xs text-text-light uppercase tracking-wide font-semibold">Specialty</span>
                  <span className="text-sm text-text-dark font-medium">{req.specialty}</span>
                </div>
                <StatusBadge status={req.status} />
              </div>
            </div>
          ))}
          {currentRows.length === 0 && (
            <div className="p-8 text-center text-text-light text-sm">
              No requests found matching your filters.
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {filteredRequests.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-neutral-medium-gray gap-4 bg-neutral-light-gray/30">
            <p className="text-sm text-text-light">
              Showing <span className="font-medium">{Math.min(startIndex + 1, filteredRequests.length)}</span> to <span className="font-medium">{Math.min(endIndex, filteredRequests.length)}</span> of <span className="font-medium">{filteredRequests.length}</span> results
            </p>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 py-1 rounded-lg border border-neutral-medium-gray bg-white text-text-dark text-sm font-medium hover:bg-neutral-light-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-text-dark hover:bg-neutral-medium-gray/30'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 py-1 rounded-lg border border-neutral-medium-gray bg-white text-text-dark text-sm font-medium hover:bg-neutral-light-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentRequestsTable;