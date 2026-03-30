import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Reports } from './Reports';

describe('Reports', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Reports {...defaultProps} />);
    expect(screen.getByText('Reports & Analytics')).toBeInTheDocument();
  });

  it('displays report categories', () => {
    render(<Reports {...defaultProps} />);
    expect(screen.getByText('Financial Reports')).toBeInTheDocument();
    expect(screen.getByText('Sales Reports')).toBeInTheDocument();
    expect(screen.getByText('Inventory Reports')).toBeInTheDocument();
    expect(screen.getByText('Customer Reports')).toBeInTheDocument();
    expect(screen.getByText('Supplier Reports')).toBeInTheDocument();
    expect(screen.getByText('ZATCA Compliance')).toBeInTheDocument();
  });

  it('displays financial reports', () => {
    render(<Reports {...defaultProps} />);
    expect(screen.getByText('Profit & Loss Statement')).toBeInTheDocument();
    expect(screen.getByText('Balance Sheet')).toBeInTheDocument();
    expect(screen.getByText('Cash Flow Statement')).toBeInTheDocument();
    expect(screen.getByText('Financial Ratios')).toBeInTheDocument();
  });

  it('displays sales reports', () => {
    render(<Reports {...defaultProps} />);
    expect(screen.getByText('Sales by Customer')).toBeInTheDocument();
    expect(screen.getByText('Sales by Product')).toBeInTheDocument();
    expect(screen.getByText('Monthly Sales Trends')).toBeInTheDocument();
    expect(screen.getByText('Sales Forecast')).toBeInTheDocument();
  });

  it('displays inventory reports', () => {
    render(<Reports {...defaultProps} />);
    expect(screen.getByText('Stock Levels')).toBeInTheDocument();
    expect(screen.getByText('Inventory Turnover')).toBeInTheDocument();
    expect(screen.getByText('Material Valuation')).toBeInTheDocument();
    expect(screen.getByText('Low Stock Alert')).toBeInTheDocument();
  });

  it('displays customer reports', () => {
    render(<Reports {...defaultProps} />);
    expect(screen.getByText('Customer Analysis')).toBeInTheDocument();
    expect(screen.getByText('Top Customers')).toBeInTheDocument();
    expect(screen.getByText('Customer Retention')).toBeInTheDocument();
    expect(screen.getByText('Payment History')).toBeInTheDocument();
  });

  it('displays supplier reports', () => {
    render(<Reports {...defaultProps} />);
    expect(screen.getByText('Supplier Performance')).toBeInTheDocument();
    expect(screen.getByText('Purchase Analysis')).toBeInTheDocument();
    expect(screen.getByText('Supplier Compliance')).toBeInTheDocument();
    expect(screen.getByText('Cost Comparison')).toBeInTheDocument();
  });

  it('displays ZATCA compliance reports', () => {
    render(<Reports {...defaultProps} />);
    expect(screen.getByText('VAT Returns')).toBeInTheDocument();
    expect(screen.getByText('E-Invoice Summary')).toBeInTheDocument();
    expect(screen.getByText('Tax Compliance')).toBeInTheDocument();
    expect(screen.getByText('Audit Trail')).toBeInTheDocument();
  });

  it('displays report counts', () => {
    render(<Reports {...defaultProps} />);
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Reports {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search reports...');
    fireEvent.change(searchInput, { target: { value: 'Profit' } });
    expect(searchInput).toHaveValue('Profit');
  });

  it('handles date range selection', () => {
    render(<Reports {...defaultProps} />);
    const dateRangeSelect = screen.getByText('This Month');
    expect(dateRangeSelect).toBeInTheDocument();
  });

  it('has export button', () => {
    render(<Reports {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Reports {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('报表与分析')).toBeInTheDocument();
    expect(screen.getByText('财务报表')).toBeInTheDocument();
    expect(screen.getByText('销售报表')).toBeInTheDocument();
    expect(screen.getByText('库存报表')).toBeInTheDocument();
  });

  it('displays category icons', () => {
    render(<Reports {...defaultProps} />);
    const icons = screen.getAllByRole('img');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('displays report counts for each category', () => {
    render(<Reports {...defaultProps} />);
    const counts = screen.getAllByText(/\d+/);
    expect(counts.length).toBeGreaterThan(0);
  });

  it('has filter button', () => {
    render(<Reports {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('displays report category descriptions', () => {
    render(<Reports {...defaultProps} />);
    expect(screen.getByText(/reports/)).toBeInTheDocument();
  });
});
