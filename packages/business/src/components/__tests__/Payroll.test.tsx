import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Payroll } from './Payroll';

describe('Payroll', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Payroll {...defaultProps} />);
    expect(screen.getByText('Payroll Management')).toBeInTheDocument();
  });

  it('displays payroll statistics', () => {
    render(<Payroll {...defaultProps} />);
    expect(screen.getByText('Total Payroll')).toBeInTheDocument();
    expect(screen.getByText('¥ 1,320,000')).toBeInTheDocument();
    expect(screen.getByText('Total Employees')).toBeInTheDocument();
    expect(screen.getByText('156')).toBeInTheDocument();
  });

  it('displays payslip list', () => {
    render(<Payroll {...defaultProps} />);
    expect(screen.getByText('PY-2025-001')).toBeInTheDocument();
    expect(screen.getByText('PY-2025-002')).toBeInTheDocument();
    expect(screen.getByText('PY-2025-003')).toBeInTheDocument();
  });

  it('displays employee names', () => {
    render(<Payroll {...defaultProps} />);
    expect(screen.getByText('Ahmed Al-Fahad')).toBeInTheDocument();
    expect(screen.getByText('Mohammed Al-Qahtani')).toBeInTheDocument();
    expect(screen.getByText('Khalid Hassan')).toBeInTheDocument();
  });

  it('displays employee IDs', () => {
    render(<Payroll {...defaultProps} />);
    expect(screen.getByText('1012345678')).toBeInTheDocument();
    expect(screen.getByText('1023456789')).toBeInTheDocument();
    expect(screen.getByText('1034567890')).toBeInTheDocument();
  });

  it('displays salary breakdown', () => {
    render(<Payroll {...defaultProps} />);
    expect(screen.getByText('12,000')).toBeInTheDocument();
    expect(screen.getByText('8,000')).toBeInTheDocument();
    expect(screen.getByText('10,000')).toBeInTheDocument();
  });

  it('displays net salary', () => {
    render(<Payroll {...defaultProps} />);
    expect(screen.getByText('17,500')).toBeInTheDocument();
    expect(screen.getByText('11,300')).toBeInTheDocument();
    expect(screen.getByText('14,700')).toBeInTheDocument();
  });

  it('displays payslip status', () => {
    render(<Payroll {...defaultProps} />);
    expect(screen.getByText('Paid')).toBeInTheDocument();
    expect(screen.getByText('Processing')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('displays WPS status', () => {
    render(<Payroll {...defaultProps} />);
    expect(screen.getByText('Compliant')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Rejected')).toBeInTheDocument();
  });

  it('displays payslip dates', () => {
    render(<Payroll {...defaultProps} />);
    expect(screen.getByText('2025-02-28')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Payroll {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search payslips...');
    fireEvent.change(searchInput, { target: { value: 'Ahmed' } });
    expect(searchInput).toHaveValue('Ahmed');
  });

  it('has process payroll button', () => {
    render(<Payroll {...defaultProps} />);
    expect(screen.getByText('Process Payroll')).toBeInTheDocument();
  });

  it('has export button', () => {
    render(<Payroll {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Payroll {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('薪资管理')).toBeInTheDocument();
    expect(screen.getByText('艾哈迈德·法哈德')).toBeInTheDocument();
    expect(screen.getByText('穆罕默德·卡赫塔尼')).toBeInTheDocument();
  });

  it('displays salary components', () => {
    render(<Payroll {...defaultProps} />);
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Housing')).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
    expect(screen.getByText('Deductions')).toBeInTheDocument();
  });

  it('displays trend indicators', () => {
    render(<Payroll {...defaultProps} />);
    const trendIndicators = screen.getAllByText('+');
    expect(trendIndicators.length).toBeGreaterThan(0);
  });

  it('displays compliance rate', () => {
    render(<Payroll {...defaultProps} />);
    expect(screen.getByText('WPS Compliance')).toBeInTheDocument();
    expect(screen.getByText('98.7%')).toBeInTheDocument();
  });

  it('has more action buttons', () => {
    render(<Payroll {...defaultProps} />);
    const moreButtons = screen.getAllByRole('button');
    expect(moreButtons.length).toBeGreaterThan(0);
  });
});
