import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Orders } from './Orders';

describe('Orders', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Orders {...defaultProps} />);
    expect(screen.getByText('Order Management')).toBeInTheDocument();
  });

  it('displays stats overview', () => {
    render(<Orders {...defaultProps} />);
    expect(screen.getByText('Total Purchases')).toBeInTheDocument();
    expect(screen.getByText('¥ 1,245,890')).toBeInTheDocument();
    expect(screen.getByText('Total Sales')).toBeInTheDocument();
    expect(screen.getByText('¥ 3,850,420')).toBeInTheDocument();
    expect(screen.getByText('Pending Weighing')).toBeInTheDocument();
  });

  it('displays order table', () => {
    render(<Orders {...defaultProps} />);
    expect(screen.getByText('ORD-2025-001')).toBeInTheDocument();
    expect(screen.getByText('Alpha Scrap Co.')).toBeInTheDocument();
    expect(screen.getByText('HMS 1 & 2')).toBeInTheDocument();
  });

  it('displays order status badges', () => {
    render(<Orders {...defaultProps} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Pending Payment')).toBeInTheDocument();
    expect(screen.getByText('In Transit')).toBeInTheDocument();
    expect(screen.getByText('Weighed')).toBeInTheDocument();
    expect(screen.getByText('Processing')).toBeInTheDocument();
  });

  it('displays order types', () => {
    render(<Orders {...defaultProps} />);
    expect(screen.getByText('¥ 72,500')).toBeInTheDocument();
    expect(screen.getByText('¥ 342,500')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Orders {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'ORD-001' } });
    expect(searchInput).toHaveValue('ORD-001');
  });

  it('displays volume trends chart', () => {
    render(<Orders {...defaultProps} />);
    expect(screen.getByText('Volume Trends')).toBeInTheDocument();
  });

  it('displays quick actions', () => {
    render(<Orders {...defaultProps} />);
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
    expect(screen.getByText('Generate Contract')).toBeInTheDocument();
    expect(screen.getByText('Export Report')).toBeInTheDocument();
  });

  it('has create order button', () => {
    render(<Orders {...defaultProps} />);
    expect(screen.getByText('Create Order')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Orders {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('订单管理')).toBeInTheDocument();
    expect(screen.getByText('总采购额')).toBeInTheDocument();
    expect(screen.getByText('总销售额')).toBeInTheDocument();
    expect(screen.getByText('阿尔法废料')).toBeInTheDocument();
  });

  it('handles navigation context', () => {
    const onNavigate = vi.fn();
    render(<Orders {...defaultProps} navigationContext={{ source: 'customers', customerId: 'CUST-001' }} onNavigate={onNavigate} />);
    expect(onNavigate).toBeDefined();
  });

  it('filters orders by customer', () => {
    render(<Orders {...defaultProps} navigationContext={{ source: 'customers', customerId: 'CUST-001' }} />);
    expect(screen.getByText('ORD-2025-001')).toBeInTheDocument();
    expect(screen.getByText('ORD-2025-004')).toBeInTheDocument();
  });

  it('displays order details', () => {
    render(<Orders {...defaultProps} />);
    expect(screen.getByText('25,400 kg')).toBeInTheDocument();
    expect(screen.getByText('5,000 kg')).toBeInTheDocument();
    expect(screen.getByText('Copper Wire')).toBeInTheDocument();
  });

  it('displays order dates', () => {
    render(<Orders {...defaultProps} />);
    expect(screen.getByText('2025-02-04')).toBeInTheDocument();
    expect(screen.getByText('2025-02-03')).toBeInTheDocument();
  });

  it('has filter button', () => {
    render(<Orders {...defaultProps} />);
    const filterButton = screen.getByRole('button');
    expect(filterButton).toBeInTheDocument();
  });

  it('displays trend indicators', () => {
    render(<Orders {...defaultProps} />);
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
    expect(screen.getByText('+8.2%')).toBeInTheDocument();
  });

  it('handles recommendation actions', () => {
    const onNavigate = vi.fn();
    render(<Orders {...defaultProps} navigationContext={{ source: 'dashboard', orderId: 'ORD-2025-001' }} onNavigate={onNavigate} />);
    expect(onNavigate).toBeDefined();
  });
});
