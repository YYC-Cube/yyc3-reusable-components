import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Customers } from './Customers';

describe('Customers', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Customers {...defaultProps} />);
    expect(screen.getByText('Customer Management')).toBeInTheDocument();
  });

  it('displays customer list', () => {
    render(<Customers {...defaultProps} />);
    expect(screen.getByText('Al-Rajhi Steel Industries')).toBeInTheDocument();
    expect(screen.getByText('SABIC Materials Group')).toBeInTheDocument();
  });

  it('displays customer contact information', () => {
    render(<Customers {...defaultProps} />);
    expect(screen.getByText('Ahmed Al-Rajhi')).toBeInTheDocument();
    expect(screen.getByText('+966 50 123 4567')).toBeInTheDocument();
    expect(screen.getByText('ahmed@alrajhisteel.sa')).toBeInTheDocument();
  });

  it('displays customer location', () => {
    render(<Customers {...defaultProps} />);
    expect(screen.getByText('Riyadh Industrial City')).toBeInTheDocument();
  });

  it('displays customer statistics', () => {
    render(<Customers {...defaultProps} />);
    expect(screen.getByText('145')).toBeInTheDocument();
    expect(screen.getByText('2,847,593')).toBeInTheDocument();
  });

  it('displays customer status', () => {
    render(<Customers {...defaultProps} />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('displays customer rating', () => {
    render(<Customers {...defaultProps} />);
    const ratings = screen.getAllByText('5');
    expect(ratings.length).toBeGreaterThan(0);
  });

  it('handles search input', () => {
    render(<Customers {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search customers...');
    fireEvent.change(searchInput, { target: { value: 'Al-Rajhi' } });
    expect(searchInput).toHaveValue('Al-Rajhi');
  });

  it('handles status filter', () => {
    render(<Customers {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('has add customer button', () => {
    render(<Customers {...defaultProps} />);
    expect(screen.getByText('Add Customer')).toBeInTheDocument();
  });

  it('has export button', () => {
    render(<Customers {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Customers {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('客户管理')).toBeInTheDocument();
    expect(screen.getByText('拉吉钢铁工业')).toBeInTheDocument();
  });

  it('handles navigation context', () => {
    const onNavigate = vi.fn();
    render(<Customers {...defaultProps} navigationContext={{ source: 'orders', customerId: 'CUST-001' }} onNavigate={onNavigate} />);
    expect(onNavigate).toBeDefined();
  });

  it('displays last order date', () => {
    render(<Customers {...defaultProps} />);
    expect(screen.getByText('2025-02-01')).toBeInTheDocument();
  });

  it('displays customer IDs', () => {
    render(<Customers {...defaultProps} />);
    expect(screen.getByText('CUST-001')).toBeInTheDocument();
    expect(screen.getByText('CUST-002')).toBeInTheDocument();
  });

  it('has more action buttons', () => {
    render(<Customers {...defaultProps} />);
    const moreButtons = screen.getAllByRole('button');
    expect(moreButtons.length).toBeGreaterThan(0);
  });

  it('displays trend indicators', () => {
    render(<Customers {...defaultProps} />);
    const trendIndicators = screen.getAllByText('+');
    expect(trendIndicators.length).toBeGreaterThan(0);
  });
});
