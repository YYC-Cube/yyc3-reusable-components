import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Payments } from './Payments';

describe('Payments', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Payments {...defaultProps} />);
    expect(screen.getByText('Payment Management')).toBeInTheDocument();
  });

  it('displays payment list', () => {
    render(<Payments {...defaultProps} />);
    expect(screen.getByText('PAY-2025-001')).toBeInTheDocument();
    expect(screen.getByText('PAY-2025-002')).toBeInTheDocument();
    expect(screen.getByText('PAY-2025-003')).toBeInTheDocument();
  });

  it('displays payment types', () => {
    render(<Payments {...defaultProps} />);
    expect(screen.getByText('Received')).toBeInTheDocument();
    expect(screen.getByText('Sent')).toBeInTheDocument();
  });

  it('displays customers', () => {
    render(<Payments {...defaultProps} />);
    expect(screen.getByText('Al-Rajhi Steel')).toBeInTheDocument();
    expect(screen.getByText('SABIC Materials')).toBeInTheDocument();
  });

  it('displays suppliers', () => {
    render(<Payments {...defaultProps} />);
    expect(screen.getByText('Gulf Metal Suppliers')).toBeInTheDocument();
    expect(screen.getByText('Arabian Scrap Traders')).toBeInTheDocument();
  });

  it('displays payment amounts', () => {
    render(<Payments {...defaultProps} />);
    expect(screen.getByText('145,890')).toBeInTheDocument();
    expect(screen.getByText('89,450')).toBeInTheDocument();
    expect(screen.getByText('234,567')).toBeInTheDocument();
  });

  it('displays payment dates', () => {
    render(<Payments {...defaultProps} />);
    expect(screen.getByText('2025-02-03')).toBeInTheDocument();
    expect(screen.getByText('2025-02-02')).toBeInTheDocument();
  });

  it('displays payment methods', () => {
    render(<Payments {...defaultProps} />);
    expect(screen.getByText('Bank Transfer')).toBeInTheDocument();
    expect(screen.getByText('Wire Transfer')).toBeInTheDocument();
  });

  it('displays payment status', () => {
    render(<Payments {...defaultProps} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });

  it('displays reference numbers', () => {
    render(<Payments {...defaultProps} />);
    expect(screen.getByText('INV-2025-145')).toBeInTheDocument();
    expect(screen.getByText('PO-2025-089')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Payments {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search payments...');
    fireEvent.change(searchInput, { target: { value: 'PAY-001' } });
    expect(searchInput).toHaveValue('PAY-001');
  });

  it('has create payment button', () => {
    render(<Payments {...defaultProps} />);
    expect(screen.getByText('Create Payment')).toBeInTheDocument();
  });

  it('has export button', () => {
    render(<Payments {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Payments {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('支付管理')).toBeInTheDocument();
    expect(screen.getByText('拉吉钢铁')).toBeInTheDocument();
    expect(screen.getByText('SABIC 材料')).toBeInTheDocument();
  });

  it('displays payment statistics', () => {
    render(<Payments {...defaultProps} />);
    expect(screen.getByText('Total Received')).toBeInTheDocument();
    expect(screen.getByText('Total Sent')).toBeInTheDocument();
  });

  it('has filter button', () => {
    render(<Payments {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('displays status icons', () => {
    render(<Payments {...defaultProps} />);
    const statusIcons = screen.getAllByRole('img');
    expect(statusIcons.length).toBeGreaterThan(0);
  });

  it('displays trend indicators', () => {
    render(<Payments {...defaultProps} />);
    const trendIndicators = screen.getAllByText('+');
    expect(trendIndicators.length).toBeGreaterThan(0);
  });
});
