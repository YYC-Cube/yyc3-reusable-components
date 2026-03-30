import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Accounting } from './Accounting';

describe('Accounting', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Accounting {...defaultProps} />);
    expect(screen.getByText('Accounting Management')).toBeInTheDocument();
  });

  it('displays account categories', () => {
    render(<Accounting {...defaultProps} />);
    expect(screen.getByText('Assets')).toBeInTheDocument();
    expect(screen.getByText('Liabilities')).toBeInTheDocument();
    expect(screen.getByText('Equity')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Expenses')).toBeInTheDocument();
  });

  it('displays asset accounts', () => {
    render(<Accounting {...defaultProps} />);
    expect(screen.getByText('Cash & Bank')).toBeInTheDocument();
    expect(screen.getByText('Accounts Receivable')).toBeInTheDocument();
    expect(screen.getByText('Inventory')).toBeInTheDocument();
    expect(screen.getByText('Fixed Assets')).toBeInTheDocument();
  });

  it('displays liability accounts', () => {
    render(<Accounting {...defaultProps} />);
    expect(screen.getByText('Accounts Payable')).toBeInTheDocument();
    expect(screen.getByText('Loans Payable')).toBeInTheDocument();
    expect(screen.getByText('Accrued Expenses')).toBeInTheDocument();
    expect(screen.getByText('Other Liabilities')).toBeInTheDocument();
  });

  it('displays equity accounts', () => {
    render(<Accounting {...defaultProps} />);
    expect(screen.getByText("Owner's Equity")).toBeInTheDocument();
    expect(screen.getByText('Retained Earnings')).toBeInTheDocument();
    expect(screen.getByText('Current Year Profit')).toBeInTheDocument();
  });

  it('displays revenue accounts', () => {
    render(<Accounting {...defaultProps} />);
    expect(screen.getByText('Sales Revenue')).toBeInTheDocument();
    expect(screen.getByText('Service Revenue')).toBeInTheDocument();
    expect(screen.getByText('Other Revenue')).toBeInTheDocument();
  });

  it('displays expense accounts', () => {
    render(<Accounting {...defaultProps} />);
    expect(screen.getByText('Cost of Goods Sold')).toBeInTheDocument();
    expect(screen.getByText('Operating Expenses')).toBeInTheDocument();
    expect(screen.getByText('Salaries & Wages')).toBeInTheDocument();
    expect(screen.getByText('Depreciation')).toBeInTheDocument();
  });

  it('displays account balances', () => {
    render(<Accounting {...defaultProps} />);
    expect(screen.getByText('2,456,789')).toBeInTheDocument();
    expect(screen.getByText('1,876,543')).toBeInTheDocument();
    expect(screen.getByText('3,234,567')).toBeInTheDocument();
  });

  it('displays change percentages', () => {
    render(<Accounting {...defaultProps} />);
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
    expect(screen.getByText('+8.3%')).toBeInTheDocument();
    expect(screen.getByText('+15.2%')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Accounting {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search accounts...');
    fireEvent.change(searchInput, { target: { value: 'Cash' } });
    expect(searchInput).toHaveValue('Cash');
  });

  it('handles period selection', () => {
    render(<Accounting {...defaultProps} />);
    const periodSelect = screen.getByText('This Month');
    expect(periodSelect).toBeInTheDocument();
  });

  it('has export button', () => {
    render(<Accounting {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Accounting {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('会计管理')).toBeInTheDocument();
    expect(screen.getByText('资产')).toBeInTheDocument();
    expect(screen.getByText('负债')).toBeInTheDocument();
    expect(screen.getByText('权益')).toBeInTheDocument();
    expect(screen.getByText('收入')).toBeInTheDocument();
    expect(screen.getByText('费用')).toBeInTheDocument();
  });

  it('displays account icons', () => {
    render(<Accounting {...defaultProps} />);
    const icons = screen.getAllByRole('img');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('displays trend indicators', () => {
    render(<Accounting {...defaultProps} />);
    const trendIndicators = screen.getAllByText('+');
    expect(trendIndicators.length).toBeGreaterThan(0);
  });

  it('has filter button', () => {
    render(<Accounting {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('displays account category colors', () => {
    render(<Accounting {...defaultProps} />);
    const categoryCards = screen.getAllByText(/Assets|Liabilities|Equity|Revenue|Expenses/);
    expect(categoryCards.length).toBeGreaterThan(0);
  });
});
