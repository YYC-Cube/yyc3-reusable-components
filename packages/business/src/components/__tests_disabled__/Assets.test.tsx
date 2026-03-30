import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Assets } from './Assets';

describe('Assets', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Assets {...defaultProps} />);
    expect(screen.getByText('Asset Management')).toBeInTheDocument();
  });

  it('displays asset list', () => {
    render(<Assets {...defaultProps} />);
    expect(screen.getByText('Liebherr Mobile Crane')).toBeInTheDocument();
    expect(screen.getByText('CAT Excavator 320')).toBeInTheDocument();
    expect(screen.getByText('Toyota Industrial Forklift')).toBeInTheDocument();
  });

  it('displays asset types', () => {
    render(<Assets {...defaultProps} />);
    expect(screen.getByText('Heavy Machinery')).toBeInTheDocument();
    expect(screen.getByText('Logistics')).toBeInTheDocument();
    expect(screen.getByText('Processing')).toBeInTheDocument();
  });

  it('displays asset locations', () => {
    render(<Assets {...defaultProps} />);
    expect(screen.getByText('Zone A')).toBeInTheDocument();
    expect(screen.getByText('Zone B')).toBeInTheDocument();
    expect(screen.getByText('Warehouse 1')).toBeInTheDocument();
  });

  it('displays purchase dates', () => {
    render(<Assets {...defaultProps} />);
    expect(screen.getByText('2022-03-15')).toBeInTheDocument();
    expect(screen.getByText('2021-08-10')).toBeInTheDocument();
    expect(screen.getByText('2023-01-20')).toBeInTheDocument();
  });

  it('displays purchase prices', () => {
    render(<Assets {...defaultProps} />);
    expect(screen.getByText('850,000')).toBeInTheDocument();
    expect(screen.getByText('450,000')).toBeInTheDocument();
    expect(screen.getByText('120,000')).toBeInTheDocument();
  });

  it('displays current values', () => {
    render(<Assets {...defaultProps} />);
    expect(screen.getByText('620,000')).toBeInTheDocument();
    expect(screen.getByText('280,000')).toBeInTheDocument();
    expect(screen.getByText('95,000')).toBeInTheDocument();
  });

  it('displays asset status', () => {
    render(<Assets {...defaultProps} />);
    expect(screen.getByText('Operational')).toBeInTheDocument();
    expect(screen.getByText('Maintenance')).toBeInTheDocument();
  });

  it('displays next maintenance dates', () => {
    render(<Assets {...defaultProps} />);
    expect(screen.getByText('2025-03-01')).toBeInTheDocument();
    expect(screen.getByText('2025-02-15')).toBeInTheDocument();
    expect(screen.getByText('2025-04-10')).toBeInTheDocument();
  });

  it('displays asset IDs', () => {
    render(<Assets {...defaultProps} />);
    expect(screen.getByText('AST-001')).toBeInTheDocument();
    expect(screen.getByText('AST-002')).toBeInTheDocument();
    expect(screen.getByText('AST-003')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Assets {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search assets...');
    fireEvent.change(searchInput, { target: { value: 'Crane' } });
    expect(searchInput).toHaveValue('Crane');
  });

  it('has add asset button', () => {
    render(<Assets {...defaultProps} />);
    expect(screen.getByText('Add Asset')).toBeInTheDocument();
  });

  it('has export button', () => {
    render(<Assets {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders in Chinese language', () => {
    render(<Assets {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('资产管理')).toBeInTheDocument();
    expect(screen.getByText('利勃海尔移动式起重机')).toBeInTheDocument();
    expect(screen.getByText('卡特彼勒挖掘机 320')).toBeInTheDocument();
  });

  it('displays depreciation chart', () => {
    render(<Assets {...defaultProps} />);
    expect(screen.getByText('Asset Depreciation')).toBeInTheDocument();
  });

  it('displays total asset value', () => {
    render(<Assets {...defaultProps} />);
    expect(screen.getByText('Total Asset Value')).toBeInTheDocument();
  });

  it('has filter button', () => {
    render(<Assets {...defaultProps} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('displays asset images', () => {
    render(<Assets {...defaultProps} />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('displays maintenance alerts', () => {
    render(<Assets {...defaultProps} />);
    expect(screen.getByText('Maintenance Due')).toBeInTheDocument();
  });
});
