import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Approvals } from './Approvals';

describe('Approvals', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Approvals {...defaultProps} />);
    expect(screen.getByText('Approval Management')).toBeInTheDocument();
  });

  it('displays approval requests', () => {
    render(<Approvals {...defaultProps} />);
    expect(screen.getByText('REQ-2025-089')).toBeInTheDocument();
    expect(screen.getByText('REQ-2025-090')).toBeInTheDocument();
    expect(screen.getByText('REQ-2025-088')).toBeInTheDocument();
  });

  it('displays request titles', () => {
    render(<Approvals {...defaultProps} />);
    expect(screen.getByText('Purchase Order - Scrap Metal Baling Machine')).toBeInTheDocument();
    expect(screen.getByText('Annual Leave Request - 15 Days')).toBeInTheDocument();
    expect(screen.getByText('Travel Expense Reimbursement')).toBeInTheDocument();
  });

  it('displays requesters', () => {
    render(<Approvals {...defaultProps} />);
    expect(screen.getByText('Zhang Wei')).toBeInTheDocument();
    expect(screen.getByText('Li Qiang')).toBeInTheDocument();
    expect(screen.getByText('Wang Lei')).toBeInTheDocument();
  });

  it('displays departments', () => {
    render(<Approvals {...defaultProps} />);
    expect(screen.getByText('Operations')).toBeInTheDocument();
    expect(screen.getByText('Logistics')).toBeInTheDocument();
    expect(screen.getByText('Sales')).toBeInTheDocument();
  });

  it('displays amounts', () => {
    render(<Approvals {...defaultProps} />);
    expect(screen.getByText('¥ 450,000')).toBeInTheDocument();
    expect(screen.getByText('¥ 3,250')).toBeInTheDocument();
  });

  it('displays request dates', () => {
    render(<Approvals {...defaultProps} />);
    expect(screen.getByText('2025-02-04')).toBeInTheDocument();
    expect(screen.getByText('2025-02-02')).toBeInTheDocument();
  });

  it('displays request status', () => {
    render(<Approvals {...defaultProps} />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();
    expect(screen.getByText('Rejected')).toBeInTheDocument();
  });

  it('displays priority levels', () => {
    render(<Approvals {...defaultProps} />);
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Normal')).toBeInTheDocument();
  });

  it('displays approval steps', () => {
    render(<Approvals {...defaultProps} />);
    expect(screen.getByText('Dept. Manager')).toBeInTheDocument();
    expect(screen.getByText('Finance')).toBeInTheDocument();
    expect(screen.getByText('GM')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Approvals {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search approvals...');
    fireEvent.change(searchInput, { target: { value: 'Purchase' } });
    expect(searchInput).toHaveValue('Purchase');
  });

  it('has approve button', () => {
    render(<Approvals {...defaultProps} />);
    expect(screen.getByText('Approve')).toBeInTheDocument();
  });

  it('has reject button', () => {
    render(<Approvals {...defaultProps} />);
    expect(screen.getByText('Reject')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Approvals {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('审批管理')).toBeInTheDocument();
    expect(screen.getByText('采购申请 - 废金属打包机')).toBeInTheDocument();
    expect(screen.getByText('年假申请 - 15天')).toBeInTheDocument();
  });

  it('displays status icons', () => {
    render(<Approvals {...defaultProps} />);
    const statusIcons = screen.getAllByRole('img');
    expect(statusIcons.length).toBeGreaterThan(0);
  });

  it('has filter button', () => {
    render(<Approvals {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('displays request types', () => {
    render(<Approvals {...defaultProps} />);
    expect(screen.getByText('purchase')).toBeInTheDocument();
    expect(screen.getByText('leave')).toBeInTheDocument();
    expect(screen.getByText('expense')).toBeInTheDocument();
  });
});
