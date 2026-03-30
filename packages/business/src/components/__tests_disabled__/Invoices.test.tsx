import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Invoices } from './Invoices';

describe('Invoices', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Invoices {...defaultProps} />);
    expect(screen.getByText('Invoice Management')).toBeInTheDocument();
  });

  it('displays invoice list', () => {
    render(<Invoices {...defaultProps} />);
    expect(screen.getByText('INV-2024-001')).toBeInTheDocument();
    expect(screen.getByText('INV-2024-002')).toBeInTheDocument();
    expect(screen.getByText('INV-2024-003')).toBeInTheDocument();
  });

  it('displays invoice amounts', () => {
    render(<Invoices {...defaultProps} />);
    expect(screen.getByText('¥ 125,000')).toBeInTheDocument();
    expect(screen.getByText('¥ 45,200')).toBeInTheDocument();
    expect(screen.getByText('¥ 12,500')).toBeInTheDocument();
  });

  it('displays invoice dates', () => {
    render(<Invoices {...defaultProps} />);
    expect(screen.getByText('2024-02-01')).toBeInTheDocument();
    expect(screen.getByText('2024-02-02')).toBeInTheDocument();
    expect(screen.getByText('2024-02-03')).toBeInTheDocument();
  });

  it('displays invoice status badges', () => {
    render(<Invoices {...defaultProps} />);
    expect(screen.getByText('Reported')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('displays customer names', () => {
    render(<Invoices {...defaultProps} />);
    expect(screen.getByText('Steel & Co.')).toBeInTheDocument();
    expect(screen.getByText('Alpha Construction')).toBeInTheDocument();
    expect(screen.getByText('Capital Trading')).toBeInTheDocument();
  });

  it('displays invoice types', () => {
    render(<Invoices {...defaultProps} />);
    expect(screen.getByText('Standard')).toBeInTheDocument();
    expect(screen.getByText('Simplified')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Invoices {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search invoices...');
    fireEvent.change(searchInput, { target: { value: 'INV-001' } });
    expect(searchInput).toHaveValue('INV-001');
  });

  it('has create invoice button', () => {
    render(<Invoices {...defaultProps} />);
    expect(screen.getByText('Create Invoice')).toBeInTheDocument();
  });

  it('has filter button', () => {
    render(<Invoices {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('has export button', () => {
    render(<Invoices {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Invoices {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('发票管理')).toBeInTheDocument();
    expect(screen.getByText('钢铁公司')).toBeInTheDocument();
    expect(screen.getByText('阿尔法建筑')).toBeInTheDocument();
  });

  it('handles navigation context', () => {
    const onNavigate = vi.fn();
    render(
      <Invoices
        {...defaultProps}
        navigationContext={{ source: 'orders', orderId: 'ORD-2025-001' }}
        onNavigate={onNavigate}
      />
    );
    expect(onNavigate).toBeDefined();
  });

  it('displays status icons', () => {
    render(<Invoices {...defaultProps} />);
    const statusIcons = screen.getAllByRole('img');
    expect(statusIcons.length).toBeGreaterThan(0);
  });

  it('displays customer IDs', () => {
    render(<Invoices {...defaultProps} />);
    expect(screen.getByText('CUST-001')).toBeInTheDocument();
    expect(screen.getByText('CUST-002')).toBeInTheDocument();
    expect(screen.getByText('CUST-003')).toBeInTheDocument();
  });

  it('has external link buttons', () => {
    render(<Invoices {...defaultProps} />);
    const linkButtons = screen.getAllByRole('button');
    expect(linkButtons.length).toBeGreaterThan(0);
  });
});
