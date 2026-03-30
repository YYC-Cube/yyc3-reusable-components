import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VAT } from './VAT';

describe('VAT', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<VAT {...defaultProps} />);
    expect(screen.getByText('VAT Management')).toBeInTheDocument();
  });

  it('displays VAT returns list', () => {
    render(<VAT {...defaultProps} />);
    expect(screen.getByText('VAT-2025-01')).toBeInTheDocument();
    expect(screen.getByText('VAT-2024-12')).toBeInTheDocument();
    expect(screen.getByText('VAT-2024-11')).toBeInTheDocument();
  });

  it('displays periods', () => {
    render(<VAT {...defaultProps} />);
    expect(screen.getByText('January 2025')).toBeInTheDocument();
    expect(screen.getByText('December 2024')).toBeInTheDocument();
    expect(screen.getByText('November 2024')).toBeInTheDocument();
  });

  it('displays sales VAT', () => {
    render(<VAT {...defaultProps} />);
    expect(screen.getByText('¥ 145,890')).toBeInTheDocument();
    expect(screen.getByText('¥ 234,567')).toBeInTheDocument();
    expect(screen.getByText('¥ 198,765')).toBeInTheDocument();
  });

  it('displays purchase VAT', () => {
    render(<VAT {...defaultProps} />);
    expect(screen.getByText('¥ 89,450')).toBeInTheDocument();
    expect(screen.getByText('¥ 145,678')).toBeInTheDocument();
    expect(screen.getByText('¥ 123,456')).toBeInTheDocument();
  });

  it('displays net VAT', () => {
    render(<VAT {...defaultProps} />);
    expect(screen.getByText('¥ 56,440')).toBeInTheDocument();
    expect(screen.getByText('¥ 88,889')).toBeInTheDocument();
    expect(screen.getByText('¥ 75,309')).toBeInTheDocument();
  });

  it('displays due dates', () => {
    render(<VAT {...defaultProps} />);
    expect(screen.getByText('2025-02-28')).toBeInTheDocument();
    expect(screen.getByText('2025-01-31')).toBeInTheDocument();
    expect(screen.getByText('2024-12-31')).toBeInTheDocument();
  });

  it('displays submitted dates', () => {
    render(<VAT {...defaultProps} />);
    expect(screen.getByText('2025-01-25')).toBeInTheDocument();
    expect(screen.getByText('2024-12-28')).toBeInTheDocument();
  });

  it('displays VAT status', () => {
    render(<VAT {...defaultProps} />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Submitted')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<VAT {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search VAT returns...');
    fireEvent.change(searchInput, { target: { value: 'VAT-2025' } });
    expect(searchInput).toHaveValue('VAT-2025');
  });

  it('has submit button', () => {
    render(<VAT {...defaultProps} />);
    expect(screen.getByText('Submit Return')).toBeInTheDocument();
  });

  it('has export button', () => {
    render(<VAT {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<VAT {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('增值税管理')).toBeInTheDocument();
    expect(screen.getByText('2025年1月')).toBeInTheDocument();
    expect(screen.getByText('2024年12月')).toBeInTheDocument();
  });

  it('displays VAT statistics', () => {
    render(<VAT {...defaultProps} />);
    expect(screen.getByText('Total VAT Collected')).toBeInTheDocument();
    expect(screen.getByText('Total VAT Paid')).toBeInTheDocument();
  });

  it('has filter button', () => {
    render(<VAT {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('displays status icons', () => {
    render(<VAT {...defaultProps} />);
    const statusIcons = screen.getAllByRole('img');
    expect(statusIcons.length).toBeGreaterThan(0);
  });

  it('displays compliance indicators', () => {
    render(<VAT {...defaultProps} />);
    expect(screen.getByText('Compliance Status')).toBeInTheDocument();
  });
});
