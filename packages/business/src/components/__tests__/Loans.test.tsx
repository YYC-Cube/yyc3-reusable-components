import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loans } from './Loans';

describe('Loans', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Loans {...defaultProps} />);
    expect(screen.getByText('Loan Management')).toBeInTheDocument();
  });

  it('displays loan list', () => {
    render(<Loans {...defaultProps} />);
    expect(screen.getByText('LOAN-2025-001')).toBeInTheDocument();
    expect(screen.getByText('LOAN-2025-002')).toBeInTheDocument();
    expect(screen.getByText('LOAN-2024-015')).toBeInTheDocument();
  });

  it('displays borrowers', () => {
    render(<Loans {...defaultProps} />);
    expect(screen.getByText('Al-Rajhi Steel Industries')).toBeInTheDocument();
    expect(screen.getByText('SABIC Materials Group')).toBeInTheDocument();
    expect(screen.getByText('Dammam Metal Recycling')).toBeInTheDocument();
  });

  it('displays loan types', () => {
    render(<Loans {...defaultProps} />);
    expect(screen.getByText('Business Loan')).toBeInTheDocument();
    expect(screen.getByText('Equipment Finance')).toBeInTheDocument();
    expect(screen.getByText('Working Capital')).toBeInTheDocument();
  });

  it('displays principal amounts', () => {
    render(<Loans {...defaultProps} />);
    expect(screen.getByText('500,000')).toBeInTheDocument();
    expect(screen.getByText('850,000')).toBeInTheDocument();
  });

  it('displays outstanding amounts', () => {
    render(<Loans {...defaultProps} />);
    expect(screen.getByText('325,000')).toBeInTheDocument();
    expect(screen.getByText('680,000')).toBeInTheDocument();
  });

  it('displays interest rates', () => {
    render(<Loans {...defaultProps} />);
    expect(screen.getByText('5.5%')).toBeInTheDocument();
    expect(screen.getByText('4.8%')).toBeInTheDocument();
  });

  it('displays start dates', () => {
    render(<Loans {...defaultProps} />);
    expect(screen.getByText('2024-06-01')).toBeInTheDocument();
    expect(screen.getByText('2024-09-15')).toBeInTheDocument();
  });

  it('displays end dates', () => {
    render(<Loans {...defaultProps} />);
    expect(screen.getByText('2026-06-01')).toBeInTheDocument();
    expect(screen.getByText('2027-09-15')).toBeInTheDocument();
  });

  it('displays next payment dates', () => {
    render(<Loans {...defaultProps} />);
    expect(screen.getByText('2025-03-01')).toBeInTheDocument();
    expect(screen.getByText('2025-03-15')).toBeInTheDocument();
  });

  it('displays monthly payments', () => {
    render(<Loans {...defaultProps} />);
    expect(screen.getByText('22,500')).toBeInTheDocument();
    expect(screen.getByText('28,500')).toBeInTheDocument();
  });

  it('displays loan status', () => {
    render(<Loans {...defaultProps} />);
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Defaulted')).toBeInTheDocument();
  });

  it('displays completion percentage', () => {
    render(<Loans {...defaultProps} />);
    expect(screen.getByText('35%')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Loans {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search loans...');
    fireEvent.change(searchInput, { target: { value: 'LOAN-001' } });
    expect(searchInput).toHaveValue('LOAN-001');
  });

  it('has add loan button', () => {
    render(<Loans {...defaultProps} />);
    expect(screen.getByText('Add Loan')).toBeInTheDocument();
  });

  it('has export button', () => {
    render(<Loans {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Loans {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('贷款管理')).toBeInTheDocument();
    expect(screen.getByText('拉吉钢铁工业')).toBeInTheDocument();
    expect(screen.getByText('SABIC 材料集团')).toBeInTheDocument();
  });

  it('displays loan statistics', () => {
    render(<Loans {...defaultProps} />);
    expect(screen.getByText('Total Loans')).toBeInTheDocument();
    expect(screen.getByText('Total Outstanding')).toBeInTheDocument();
  });

  it('has filter button', () => {
    render(<Loans {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('displays status icons', () => {
    render(<Loans {...defaultProps} />);
    const statusIcons = screen.getAllByRole('img');
    expect(statusIcons.length).toBeGreaterThan(0);
  });
});
