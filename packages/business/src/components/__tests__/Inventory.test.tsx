import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Inventory } from './Inventory';

describe('Inventory', () => {
  beforeEach(() => {
    vi.mock('../context/AppContext', () => ({
      useAppContext: () => ({
        stockLevels: {
          'Copper Wire': 15000,
          'Steel Scrap': 25000,
          'Aluminum Scrap': 8000,
          'Brass Scrap': 5000,
          'Stainless Steel': 12000,
        },
      }),
    }));
  });

  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Inventory {...defaultProps} />);
    expect(screen.getByText('Smart Inventory')).toBeInTheDocument();
  });

  it('displays overview cards', () => {
    render(<Inventory {...defaultProps} />);
    expect(screen.getByText('Total Weight')).toBeInTheDocument();
    expect(screen.getByText('Estimated Value')).toBeInTheDocument();
    expect(screen.getByText('Incoming from Procurement')).toBeInTheDocument();
    expect(screen.getByText('Low Stock Alerts')).toBeInTheDocument();
  });

  it('displays inventory items', () => {
    render(<Inventory {...defaultProps} />);
    expect(screen.getByText('Copper Scrap Grade A')).toBeInTheDocument();
    expect(screen.getByText('Steel HMS 1')).toBeInTheDocument();
    expect(screen.getByText('Aluminum Tense')).toBeInTheDocument();
    expect(screen.getByText('Brass Honey')).toBeInTheDocument();
    expect(screen.getByText('Stainless Steel 304')).toBeInTheDocument();
  });

  it('displays stock levels', () => {
    render(<Inventory {...defaultProps} />);
    expect(screen.getByText(/15,000 kg/)).toBeInTheDocument();
    expect(screen.getByText(/25,000 kg/)).toBeInTheDocument();
    expect(screen.getByText(/8,000 kg/)).toBeInTheDocument();
  });

  it('displays estimated values', () => {
    render(<Inventory {...defaultProps} />);
    expect(screen.getByText(/¥ 1,020,000/)).toBeInTheDocument();
    expect(screen.getByText(/¥ 80,000/)).toBeInTheDocument();
  });

  it('displays material types', () => {
    render(<Inventory {...defaultProps} />);
    expect(screen.getByText('Copper')).toBeInTheDocument();
    expect(screen.getByText('Steel')).toBeInTheDocument();
    expect(screen.getByText('Aluminum')).toBeInTheDocument();
    expect(screen.getByText('Brass')).toBeInTheDocument();
  });

  it('displays trend indicators', () => {
    render(<Inventory {...defaultProps} />);
    expect(screen.getByText('+2.5%')).toBeInTheDocument();
    expect(screen.getByText('-1.2%')).toBeInTheDocument();
    expect(screen.getByText('+0.8%')).toBeInTheDocument();
  });

  it('displays status badges', () => {
    render(<Inventory {...defaultProps} />);
    expect(screen.getByText('high')).toBeInTheDocument();
    expect(screen.getByText('normal')).toBeInTheDocument();
    expect(screen.getByText('low')).toBeInTheDocument();
  });

  it('displays item IDs', () => {
    render(<Inventory {...defaultProps} />);
    expect(screen.getByText('MTL-001')).toBeInTheDocument();
    expect(screen.getByText('MTL-002')).toBeInTheDocument();
    expect(screen.getByText('MTL-003')).toBeInTheDocument();
  });

  it('has manual adjust button', () => {
    render(<Inventory {...defaultProps} />);
    expect(screen.getByText('Manual Adjust')).toBeInTheDocument();
  });

  it('has add new item button', () => {
    render(<Inventory {...defaultProps} />);
    expect(screen.getByText('Add New Item')).toBeInTheDocument();
  });

  it('displays details buttons', () => {
    render(<Inventory {...defaultProps} />);
    const detailsButtons = screen.getAllByText(/Details/);
    expect(detailsButtons.length).toBeGreaterThan(0);
  });

  it('renders in Chinese language', () => {
    render(<Inventory {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('智能库存')).toBeInTheDocument();
    expect(screen.getByText('总重量')).toBeInTheDocument();
    expect(screen.getByText('估算价值')).toBeInTheDocument();
    expect(screen.getByText('A级废铜')).toBeInTheDocument();
    expect(screen.getByText('1号重废钢')).toBeInTheDocument();
  });

  it('displays procurement incoming stock', () => {
    render(<Inventory {...defaultProps} />);
    expect(screen.getByText('45,000 kg')).toBeInTheDocument();
    expect(screen.getByText('PO-2025-089')).toBeInTheDocument();
  });

  it('displays low stock alert', () => {
    render(<Inventory {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Brass Scrap below threshold')).toBeInTheDocument();
  });

  it('displays trend comparisons', () => {
    render(<Inventory {...defaultProps} />);
    expect(screen.getByText('vs last month')).toBeInTheDocument();
    expect(screen.getByText('market dip')).toBeInTheDocument();
  });

  it('displays value rates', () => {
    render(<Inventory {...defaultProps} />);
    expect(screen.getByText(/68/)).toBeInTheDocument();
    expect(screen.getByText(/3.2/)).toBeInTheDocument();
    expect(screen.getByText(/18.5/)).toBeInTheDocument();
  });
});
