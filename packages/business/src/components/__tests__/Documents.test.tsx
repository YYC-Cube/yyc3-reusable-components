import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Documents } from './Documents';

describe('Documents', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Documents {...defaultProps} />);
    expect(screen.getByText('Document Management')).toBeInTheDocument();
  });

  it('displays folder list', () => {
    render(<Documents {...defaultProps} />);
    expect(screen.getByText('Contracts')).toBeInTheDocument();
    expect(screen.getByText('Policies')).toBeInTheDocument();
    expect(screen.getByText('Financial Reports')).toBeInTheDocument();
    expect(screen.getByText('Employee Records')).toBeInTheDocument();
  });

  it('displays file counts', () => {
    render(<Documents {...defaultProps} />);
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('156')).toBeInTheDocument();
  });

  it('displays recent files', () => {
    render(<Documents {...defaultProps} />);
    expect(screen.getByText('Q1_Financial_Report.pdf')).toBeInTheDocument();
    expect(screen.getByText('Safety_Protocol_v2.docx')).toBeInTheDocument();
    expect(screen.getByText('Site_Inspection_Photos.zip')).toBeInTheDocument();
  });

  it('displays file types', () => {
    render(<Documents {...defaultProps} />);
    expect(screen.getByText('pdf')).toBeInTheDocument();
    expect(screen.getByText('doc')).toBeInTheDocument();
    expect(screen.getByText('zip')).toBeInTheDocument();
    expect(screen.getByText('xls')).toBeInTheDocument();
  });

  it('displays file sizes', () => {
    render(<Documents {...defaultProps} />);
    expect(screen.getByText('2.4 MB')).toBeInTheDocument();
    expect(screen.getByText('1.1 MB')).toBeInTheDocument();
    expect(screen.getByText('15.6 MB')).toBeInTheDocument();
  });

  it('displays file dates', () => {
    render(<Documents {...defaultProps} />);
    expect(screen.getByText('2 hrs ago')).toBeInTheDocument();
    expect(screen.getByText('5 hrs ago')).toBeInTheDocument();
    expect(screen.getByText('Yesterday')).toBeInTheDocument();
  });

  it('displays file authors', () => {
    render(<Documents {...defaultProps} />);
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Ahmed Al-Fahad')).toBeInTheDocument();
    expect(screen.getByText('Mohammed Q.')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(<Documents {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search documents...');
    fireEvent.change(searchInput, { target: { value: 'Report' } });
    expect(searchInput).toHaveValue('Report');
  });

  it('has upload button', () => {
    render(<Documents {...defaultProps} />);
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  it('has create folder button', () => {
    render(<Documents {...defaultProps} />);
    expect(screen.getByText('New Folder')).toBeInTheDocument();
  });

  it('has view mode toggle', () => {
    render(<Documents {...defaultProps} />);
    const viewButtons = screen.getAllByRole('button');
    expect(viewButtons.length).toBeGreaterThan(0);
  });

  it('renders in Chinese language', () => {
    render(<Documents {...defaultProps} currentLanguage="zh" />);
    expect(screen.getByText('文档管理')).toBeInTheDocument();
  });

  it('displays storage information', () => {
    render(<Documents {...defaultProps} />);
    expect(screen.getByText(/Storage/)).toBeInTheDocument();
  });

  it('displays file icons', () => {
    render(<Documents {...defaultProps} />);
    const fileIcons = screen.getAllByRole('img');
    expect(fileIcons.length).toBeGreaterThan(0);
  });

  it('has download button', () => {
    render(<Documents {...defaultProps} />);
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('has share button', () => {
    render(<Documents {...defaultProps} />);
    expect(screen.getByText('Share')).toBeInTheDocument();
  });

  it('displays folder icons', () => {
    render(<Documents {...defaultProps} />);
    const folderIcons = screen.getAllByRole('img');
    expect(folderIcons.length).toBeGreaterThan(0);
  });
});
