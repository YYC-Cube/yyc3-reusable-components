import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Suppliers } from './Suppliers';

describe('Suppliers', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Suppliers {...defaultProps} />);
    expect(screen.getByText('Supplier Management')).toBeInTheDocument();
  });

  it('displays supplier list', () => {
    render(<Suppliers {...defaultProps} />);
    expect(screen.getByText('SUP-001')).toBeInTheDocument();
    expect(screen.getByText('SUP-002')).toBeInTheDocument();
    expect(screen.getByText('SUP-003')).toBeInTheDocument();
  });

  it('displays supplier names', () => {
    render(<Suppliers {...defaultProps} />);
    expect(screen.getByText('Gulf Metal Suppliers')).toBeInTheDocument();
    expect(screen.getByText('Arabian Scrap Traders')).toBeInTheDocument();
    expect(screen.getByText('Eastern Province Metals')).toBeInTheDocument();
  });

  it('displays contact persons', () => {
    render(<Suppliers {...defaultProps} />);
    expect(screen.getByText('Nasser Al-Fahad')).toBeInTheDocument();
    expect(screen.getByText('Omar bin Rashid')).toBeInTheDocument();
    expect(screen.getByText('Fahad Al-Qahtani')).toBeInTheDocument();
  });

  it('displays phone numbers', () => {
    render(<Suppliers {...defaultProps} />);
    expect(screen.getByText('+966 50 987 6543')).toBeInTheDocument();
    expect(screen.getByText('+966 50 876 5432')).toBeInTheDocument();
  });

  it('displays email addresses', () => {
    render(<Suppliers {...defaultProps} />);
    expect(screen.getByText('nasser@gulfmetal.sa')).toBeInTheDocument();
    expect(screen.getByText('omar@arabianscrap.sa')).toBeInTheDocument();
  });

  it('displays locations', () => {
    render(<Suppliers {...defaultProps} />);
    expect(screen.getByText('Riyadh')).toBeInTheDocument();
    expect(screen.getByText('Jeddah')).toBeInTheDocument();
  });

  it('displays categories', () => {
    render(<Suppliers {...defaultProps} />);
    expect(screen.getByText('Steel & Iron')).toBeInTheDocument();
    expect(screen.getByText('Mixed Metals')).toBeInTheDocument();
  });

  it('displays total supplied amounts', () => {
    render(<Suppliers {...defaultProps} />);
    expect(screen.getByText('3,456,789')).toBeInTheDocument();
    expect(screen.getByText('2,345,678')).toBeInTheDocument();
  });

  it('displays order counts', () => {
    render(<Suppliers {...defaultProps} />);
    expect(screen.getByText('234')).toBeInTheDocument();
    expect(screen.getByText('189')).toBeInTheDocument();
  });

  it('displays ratings', () => {
    render(<Suppliers {...defaultProps} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('displays reliability scores', () => {
    render(<Suppliers {...defaultProps} />);
    expect(screen.getByText('98%')).toBeInTheDocument();
    expect(screen.getByText('96%')).toBeInTheDocument();
  });

  it('displays supplier status', () => {
    render(<Suppliers {...defaultProps} />);
    expect(screen.getByText('Verified')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Suppliers {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search suppliers...');
    fireEvent.change(searchInput, { target: { value: 'Gulf' } });
    expect(searchInput).toHaveValue('Gulf');
  });

  it('has add supplier button', () => {
    render(<Suppliers {...defaultProps} />);
    expect(screen.getByText('Add Supplier')).toBeInTheDocument();
  });

  it('has export button', () => {
    render(<Suppliers {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Suppliers {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('供应商管理')).toBeInTheDocument();
    expect(screen.getByText('海湾金属供应商')).toBeInTheDocument();
    expect(screen.getByText('阿拉伯废料贸易商')).toBeInTheDocument();
  });

  it('displays supplier statistics', () => {
    render(<Suppliers {...defaultProps} />);
    expect(screen.getByText('Total Suppliers')).toBeInTheDocument();
    expect(screen.getByText('Active Suppliers')).toBeInTheDocument();
  });

  it('has filter button', () => {
    render(<Suppliers {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('displays status icons', () => {
    render(<Suppliers {...defaultProps} />);
    const statusIcons = screen.getAllByRole('img');
    expect(statusIcons.length).toBeGreaterThan(0);
  });
});
