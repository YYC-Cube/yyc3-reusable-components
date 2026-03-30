import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Attendance } from './Attendance';

describe('Attendance', () => {
  const defaultProps = {
    currentLanguage: 'en',
  };

  it('renders correctly', () => {
    render(<Attendance {...defaultProps} />);
    expect(screen.getByText('Attendance Management')).toBeInTheDocument();
  });

  it('displays attendance records', () => {
    render(<Attendance {...defaultProps} />);
    expect(screen.getByText('张伟')).toBeInTheDocument();
    expect(screen.getByText('李娜')).toBeInTheDocument();
    expect(screen.getByText('王强')).toBeInTheDocument();
  });

  it('displays employee departments', () => {
    render(<Attendance {...defaultProps} />);
    expect(screen.getByText('销售部')).toBeInTheDocument();
    expect(screen.getByText('采购部')).toBeInTheDocument();
    expect(screen.getByText('生产部')).toBeInTheDocument();
  });

  it('displays clock in/out times', () => {
    render(<Attendance {...defaultProps} />);
    expect(screen.getByText('08:55')).toBeInTheDocument();
    expect(screen.getByText('18:32')).toBeInTheDocument();
    expect(screen.getByText('09:12')).toBeInTheDocument();
  });

  it('displays attendance status', () => {
    render(<Attendance {...defaultProps} />);
    expect(screen.getByText('正常')).toBeInTheDocument();
    expect(screen.getByText('迟到')).toBeInTheDocument();
    expect(screen.getByText('早退')).toBeInTheDocument();
    expect(screen.getByText('加班')).toBeInTheDocument();
    expect(screen.getByText('请假')).toBeInTheDocument();
    expect(screen.getByText('缺勤')).toBeInTheDocument();
  });

  it('displays work hours', () => {
    render(<Attendance {...defaultProps} />);
    expect(screen.getByText('9.6')).toBeInTheDocument();
    expect(screen.getByText('9.9')).toBeInTheDocument();
    expect(screen.getByText('10.2')).toBeInTheDocument();
  });

  it('displays attendance dates', () => {
    render(<Attendance {...defaultProps} />);
    expect(screen.getByText('2026-03-13')).toBeInTheDocument();
  });

  it('displays clock locations', () => {
    render(<Attendance {...defaultProps} />);
    expect(screen.getByText('总部打卡')).toBeInTheDocument();
    expect(screen.getByText('工厂打卡')).toBeInTheDocument();
    expect(screen.getByText('外勤GPS')).toBeInTheDocument();
  });

  it('displays leave requests', () => {
    render(<Attendance {...defaultProps} />);
    expect(screen.getByText('请假申请')).toBeInTheDocument();
  });

  it('displays statistics', () => {
    render(<Attendance {...defaultProps} />);
    expect(screen.getByText('统计')).toBeInTheDocument();
  });

  it('has calendar view', () => {
    render(<Attendance {...defaultProps} />);
    expect(screen.getByText('日历')).toBeInTheDocument();
  });

  it('has records view', () => {
    render(<Attendance {...defaultProps} />);
    expect(screen.getByText('记录')).toBeInTheDocument();
  });

  it('has leave view', () => {
    render(<Attendance {...defaultProps} />);
    expect(screen.getByText('请假')).toBeInTheDocument();
  });

  it('handles tab switching', () => {
    render(<Attendance {...defaultProps} />);
    const calendarTab = screen.getByText('日历');
    const recordsTab = screen.getByText('记录');
    expect(calendarTab).toBeInTheDocument();
    expect(recordsTab).toBeInTheDocument();
  });

  it('has export button', () => {
    render(<Attendance {...defaultProps} />);
    expect(screen.getByText('导出')).toBeInTheDocument();
  });

  it('has filter button', () => {
    render(<Attendance {...defaultProps} />);
    const filterButton = screen.getByText('筛选');
    expect(filterButton).toBeInTheDocument();
  });

  it('displays status icons', () => {
    render(<Attendance {...defaultProps} />);
    const statusIcons = screen.getAllByRole('img');
    expect(statusIcons.length).toBeGreaterThan(0);
  });

  it('displays attendance statistics', () => {
    render(<Attendance {...defaultProps} />);
    expect(screen.getByText('出勤率')).toBeInTheDocument();
    expect(screen.getByText('迟到率')).toBeInTheDocument();
    expect(screen.getByText('加班时长')).toBeInTheDocument();
  });

  it('has navigation buttons', () => {
    render(<Attendance {...defaultProps} />);
    const navButtons = screen.getAllByRole('button');
    expect(navButtons.length).toBeGreaterThan(0);
  });
});
