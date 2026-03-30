import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Employees } from './Employees';

describe('Employees', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Employees {...defaultProps} />);
    expect(screen.getByText('Employee Management')).toBeInTheDocument();
  });

  it('displays stats overview', () => {
    render(<Employees {...defaultProps} />);
    expect(screen.getByText('Total Employees')).toBeInTheDocument();
    expect(screen.getByText('156')).toBeInTheDocument();
    expect(screen.getByText('Total Payroll')).toBeInTheDocument();
    expect(screen.getByText('1.2M ﷼')).toBeInTheDocument();
  });

  it('displays employee table', () => {
    render(<Employees {...defaultProps} />);
    expect(screen.getByText('Ahmed Al-Fahad')).toBeInTheDocument();
    expect(screen.getByText('Operations Manager')).toBeInTheDocument();
    expect(screen.getByText('EMP-001')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Employees {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search employees...');
    fireEvent.change(searchInput, { target: { value: 'Ahmed' } });
    expect(searchInput).toHaveValue('Ahmed');
  });

  it('displays employee status badges', () => {
    render(<Employees {...defaultProps} />);
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('On Leave')).toBeInTheDocument();
  });

  it('displays performance metrics', () => {
    render(<Employees {...defaultProps} />);
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('88%')).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(<Employees {...defaultProps} />);
    expect(screen.getByText('ahmed.fahad@amanatalkalima.sa')).toBeInTheDocument();
    expect(screen.getByText('+966 50 123 4567')).toBeInTheDocument();
  });

  it('displays salary information', () => {
    render(<Employees {...defaultProps} />);
    expect(screen.getByText('18,500 ﷼')).toBeInTheDocument();
  });

  it('displays location information', () => {
    render(<Employees {...defaultProps} />);
    expect(screen.getByText('Riyadh')).toBeInTheDocument();
    expect(screen.getByText('Jeddah')).toBeInTheDocument();
  });

  it('displays safety certification', () => {
    render(<Employees {...defaultProps} />);
    expect(screen.getByText('Level 3 Manager')).toBeInTheDocument();
    expect(screen.getByText('Heavy Machinery')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Employees {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('员工管理')).toBeInTheDocument();
    expect(screen.getByText('总员工数')).toBeInTheDocument();
    expect(screen.getByText('艾哈迈德·法哈德')).toBeInTheDocument();
  });

  it('handles department filter', () => {
    render(<Employees {...defaultProps} />);
    const select = screen.getByText('All Departments');
    expect(select).toBeInTheDocument();
  });

  it('displays iqama expiry dates', () => {
    render(<Employees {...defaultProps} />);
    expect(screen.getByText('2025-12-01')).toBeInTheDocument();
    expect(screen.getByText('2025-08-15')).toBeInTheDocument();
  });

  it('has add employee button', () => {
    render(<Employees {...defaultProps} />);
    expect(screen.getByText('Add Employee')).toBeInTheDocument();
  });

  it('displays filter and export buttons', () => {
    render(<Employees {...defaultProps} />);
    expect(screen.getByText('Filter')).toBeInTheDocument();
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('handles navigation context', () => {
    const onNavigate = vi.fn();
    render(
      <Employees
        {...defaultProps}
        navigationContext={{ source: 'performance', employeeId: 'EMP-001' }}
        onNavigate={onNavigate}
      />
    );
    expect(onNavigate).toBeDefined();
  });

  it('displays department information', () => {
    render(<Employees {...defaultProps} />);
    expect(screen.getByText('Operations')).toBeInTheDocument();
    expect(screen.getByText('Sales')).toBeInTheDocument();
    expect(screen.getByText('Quality Control')).toBeInTheDocument();
  });

  it('displays position information', () => {
    render(<Employees {...defaultProps} />);
    expect(screen.getByText('Operations Manager')).toBeInTheDocument();
    expect(screen.getByText('Yard Supervisor')).toBeInTheDocument();
    expect(screen.getByText('Sales Executive')).toBeInTheDocument();
  });
});
